"use client";

import { useEffect, useState } from "react";

interface PreviewData {
  url: string;
  title: string;
  description: string | null;
  image: string | null;
  siteName: string;
}

const previewCache = new Map<string, PreviewData>();

export function LinkPreviewCard({ url }: { url: string }) {
  const normalizedUrl = url.startsWith("http") ? url : `https://${url}`;
  const [data, setData] = useState<PreviewData | null>(() => previewCache.get(normalizedUrl) ?? null);
  const [isLoading, setIsLoading] = useState(!previewCache.has(normalizedUrl));
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    if (previewCache.has(normalizedUrl)) {
      setData(previewCache.get(normalizedUrl)!);
      setIsLoading(false);
      return;
    }

    let cancelled = false;
    setIsLoading(true);
    setImgError(false);

    fetch(`/api/link-preview?url=${encodeURIComponent(normalizedUrl)}`)
      .then((res) => (res.ok ? res.json() : null))
      .then((json: PreviewData | null) => {
        if (cancelled) return;
        if (json) {
          previewCache.set(normalizedUrl, json);
          setData(json);
        } else {
          let hostname = normalizedUrl;
          try {
            hostname = new URL(normalizedUrl).hostname.replace(/^www\./, "");
          } catch {
            // keep normalizedUrl
          }
          setData({
            url: normalizedUrl,
            title: hostname,
            description: null,
            image: null,
            siteName: hostname,
          });
        }
        setIsLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        let hostname = normalizedUrl;
        try {
          hostname = new URL(normalizedUrl).hostname.replace(/^www\./, "");
        } catch {
          // keep normalizedUrl
        }
        setData({
          url: normalizedUrl,
          title: hostname,
          description: null,
          image: null,
          siteName: hostname,
        });
        setIsLoading(false);
      });

    return () => {
      cancelled = true;
    };
  }, [normalizedUrl]);

  if (isLoading) {
    return (
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex flex-col sm:flex-row overflow-hidden rounded-xl border border-line-gray bg-paper-cream/40 animate-pulse"
      >
        <div className="flex-1 p-4 space-y-2.5">
          <div className="h-3 w-24 rounded bg-line-gray/70" />
          <div className="h-4 w-3/4 rounded bg-line-gray/80" />
          <div className="h-3 w-full rounded bg-line-gray/60" />
          <div className="h-3 w-2/3 rounded bg-line-gray/60" />
        </div>
        <div className="h-36 sm:h-auto sm:w-40 bg-line-gray/60 shrink-0" />
      </div>
    );
  }

  if (!data) return null;

  let displayHost = data.siteName;
  try {
    displayHost = new URL(data.url).hostname.replace(/^www\./, "");
  } catch {
    // keep siteName
  }

  return (
    <a
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className="group/link flex flex-col-reverse sm:flex-row overflow-hidden rounded-xl border border-line-gray bg-white hover:border-deep-navy/40 hover:shadow-md transition-all duration-200 text-left no-underline"
    >
      <div className="flex-1 min-w-0 p-4 flex flex-col justify-between gap-2">
        <div>
          <div className="flex items-center gap-1.5 text-[12px] font-semibold text-terracotta mb-1">
            <span className="truncate">{data.siteName}</span>
            <span className="shrink-0">↗</span>
          </div>
          <h4 className="font-bold text-[15px] text-deep-navy group-hover/link:text-terracotta transition-colors line-clamp-2 leading-snug break-keep">
            {data.title}
          </h4>
          {data.description && (
            <p className="mt-1.5 text-[13px] text-ink-2 line-clamp-2 leading-relaxed break-keep">
              {data.description}
            </p>
          )}
        </div>
        <div className="text-[12px] text-ink-2/70 truncate pt-1">
          {displayHost}
        </div>
      </div>

      {data.image && !imgError && (
        <div className="w-full h-44 sm:w-44 sm:h-auto shrink-0 bg-warm-sand/30 border-b sm:border-b-0 sm:border-l border-line-gray/60 overflow-hidden">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={data.image}
            alt={data.title}
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover/link:scale-105 transition-transform duration-300"
          />
        </div>
      )}
    </a>
  );
}
