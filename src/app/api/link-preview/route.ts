import { NextRequest, NextResponse } from "next/server";

function decodeHtmlEntities(str: string): string {
  return str
    .replace(/&amp;/gi, "&")
    .replace(/&quot;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&nbsp;/gi, " ")
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(Number(dec)))
    .replace(/&#x([0-9a-f]+);/gi, (_, hex) => String.fromCharCode(parseInt(hex, 16)))
    .trim();
}

function isBlockedHost(hostname: string): boolean {
  const lower = hostname.toLowerCase();
  if (
    lower === "localhost" ||
    lower === "127.0.0.1" ||
    lower === "::1" ||
    lower === "0.0.0.0" ||
    lower.endsWith(".local") ||
    lower.startsWith("10.") ||
    lower.startsWith("192.168.") ||
    /^172\.(1[6-9]|2\d|3[0-1])\./.test(lower) ||
    lower.startsWith("169.254.")
  ) {
    return true;
  }
  return false;
}

function extractMeta(html: string, keys: string[]): string | null {
  const metaTagRegex = /<meta\s+[^>]*>/gi;
  const tags = html.match(metaTagRegex) || [];

  for (const key of keys) {
    const keyLower = key.toLowerCase();
    for (const tag of tags) {
      const propMatch = tag.match(/(?:property|name)\s*=\s*["']([^"']+)["']/i);
      if (propMatch && propMatch[1].toLowerCase() === keyLower) {
        const contentMatch = tag.match(/content\s*=\s*(?:"([^"]*)"|'([^']*)')/i);
        const value = contentMatch ? (contentMatch[1] ?? contentMatch[2]) : null;
        if (value && value.trim()) {
          return decodeHtmlEntities(value);
        }
      }
    }
  }
  return null;
}

function extractTitle(html: string): string | null {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i);
  if (match && match[1]) {
    return decodeHtmlEntities(match[1].replace(/\s+/g, " "));
  }
  return null;
}

export async function GET(request: NextRequest) {
  const rawUrl = request.nextUrl.searchParams.get("url");
  if (!rawUrl) {
    return NextResponse.json({ error: "Missing url parameter" }, { status: 400 });
  }

  let parsedUrl: URL;
  try {
    parsedUrl = new URL(rawUrl.startsWith("http") ? rawUrl : `https://${rawUrl}`);
  } catch {
    return NextResponse.json({ error: "Invalid url" }, { status: 400 });
  }

  if (parsedUrl.protocol !== "http:" && parsedUrl.protocol !== "https:") {
    return NextResponse.json({ error: "Unsupported protocol" }, { status: 400 });
  }

  if (isBlockedHost(parsedUrl.hostname)) {
    return NextResponse.json({ error: "Blocked host" }, { status: 403 });
  }

  const fallbackSiteName = parsedUrl.hostname.replace(/^www\./, "");

  try {
    const res = await fetch(parsedUrl.toString(), {
      headers: {
        "User-Agent":
          "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36",
        Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
        "Accept-Language": "ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7",
      },
      redirect: "follow",
      signal: AbortSignal.timeout(6000),
    });

    if (!res.ok) {
      return NextResponse.json({
        url: parsedUrl.toString(),
        title: fallbackSiteName,
        description: null,
        image: null,
        siteName: fallbackSiteName,
      });
    }

    const contentType = res.headers.get("content-type") || "";
    const buffer = await res.arrayBuffer();

    let charset = "utf-8";
    const headerCharsetMatch = contentType.match(/charset=([^\s;]+)/i);
    if (headerCharsetMatch) {
      charset = headerCharsetMatch[1].toLowerCase();
    } else {
      const asciiPreview = new TextDecoder("ascii").decode(buffer.slice(0, 2048));
      const metaCharsetMatch = asciiPreview.match(/charset=["']?([a-zA-Z0-9\-_]+)/i);
      if (metaCharsetMatch) {
        charset = metaCharsetMatch[1].toLowerCase();
      }
    }

    let html: string;
    try {
      const normalizedCharset =
        charset === "ks_c_5601-1987" || charset === "cp949" || charset === "ms949"
          ? "euc-kr"
          : charset;
      html = new TextDecoder(normalizedCharset).decode(buffer);
    } catch {
      html = new TextDecoder("utf-8").decode(buffer);
    }

    // <head> 영역 우선 파싱 (불필요한 본문 파싱 최소화)
    const headMatch = html.match(/<head[\s\S]*?<\/head>/i);
    const headHtml = headMatch ? headMatch[0] : html.slice(0, 30000);

    const title =
      extractMeta(headHtml, ["og:title", "twitter:title"]) ||
      extractTitle(headHtml) ||
      fallbackSiteName;

    const description = extractMeta(headHtml, [
      "og:description",
      "twitter:description",
      "description",
    ]);

    const rawImage = extractMeta(headHtml, ["og:image", "twitter:image"]);
    let image: string | null = null;
    if (rawImage) {
      try {
        image = new URL(rawImage, res.url || parsedUrl.toString()).toString();
      } catch {
        image = null;
      }
    }

    const siteName =
      extractMeta(headHtml, ["og:site_name"]) || fallbackSiteName;

    return NextResponse.json(
      {
        url: parsedUrl.toString(),
        title,
        description,
        image,
        siteName,
      },
      {
        headers: {
          "Cache-Control": "public, s-maxage=86400, stale-while-revalidate=604800",
        },
      }
    );
  } catch {
    return NextResponse.json({
      url: parsedUrl.toString(),
      title: fallbackSiteName,
      description: null,
      image: null,
      siteName: fallbackSiteName,
    });
  }
}
