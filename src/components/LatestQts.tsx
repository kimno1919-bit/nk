"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/Card";
import { supabasePublic } from "@/utils/supabase/public";

function LoadingSkeleton({ height }: { height: string }) {
  return <div className={`w-full ${height} bg-line-gray/20 animate-pulse rounded-xl`}></div>;
}

export function LatestQts() {
  const [qts, setQts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchQts = async () => {
      const { data } = await supabasePublic
        .from("qts")
        .select("*")
        .eq("is_public", true)
        .order("date", { ascending: false })
        .limit(3);
      if (data) setQts(data);
      setIsLoading(false);
    };
    fetchQts();
  }, []);

  if (isLoading) {
    return <LoadingSkeleton height="h-[180px]" />;
  }

  if (qts.length === 0) {
    return (
      <div className="text-ink-2 text-center py-8 bg-white border border-line-gray rounded-xl shadow-sm">
        등록된 QT 묵상글이 없습니다.
      </div>
    );
  }

  return (
    <>
      {qts.map((qt) => (
        <Link href={`/qt?id=${qt.id}`} key={qt.id} className="block">
          <Card className="hover:border-deep-navy transition-colors cursor-pointer group !p-6">
            <div className="flex justify-between items-center mb-4">
              <span className="px-2.5 py-1 bg-pine-green/10 text-pine-green text-[13px] font-bold rounded">{qt.book} {qt.chapter}</span>
              <span className="text-[13px] text-ink-2">{qt.date}</span>
            </div>
            <h4 className="font-serif font-bold text-xl text-ink group-hover:text-deep-navy transition-colors">
              {qt.title}
            </h4>
            <p className="text-ink-2 text-[15px] mt-3 line-clamp-2 leading-relaxed">
              {qt.content}
            </p>
          </Card>
        </Link>
      ))}
    </>
  );
}
