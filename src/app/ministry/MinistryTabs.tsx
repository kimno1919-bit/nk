"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function MinistryTabs() {
  const pathname = usePathname();
  const tabs = [
    { name: "사역 개요", href: "/ministry", exact: true },
    { name: "돌봄 (Care)", href: "/ministry/care", exact: false },
    { name: "양육 (Training)", href: "/ministry/training", exact: false },
    { name: "일꾼 세우기 (Mission)", href: "/ministry/mission", exact: false },
  ];

  return (
    <div className="border-b border-line-gray bg-white sticky top-[72px] z-40">
      <div className="mx-auto max-w-[1200px] flex overflow-x-auto hide-scrollbar">
        {tabs.map((tab) => {
          const isActive = tab.exact ? pathname === tab.href : pathname.startsWith(tab.href);
          return (
            <Link 
              key={tab.href} 
              href={tab.href} 
              className={`px-5 sm:px-6 py-4 font-bold whitespace-nowrap border-b-2 transition-colors ${
                isActive ? 'text-deep-navy border-deep-navy' : 'text-ink-2 border-transparent hover:text-deep-navy hover:border-deep-navy/30'
              }`}
            >
              {tab.name}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
