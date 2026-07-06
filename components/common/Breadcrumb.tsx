"use client";

import React from "react";
import { usePathname } from "next/navigation";

export function Breadcrumb() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean);

  return (
    <nav className="flex mb-4 text-sm font-medium text-gray-500" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        <li className="inline-flex items-center">
          <span className="text-gray-400">Enterprise</span>
        </li>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;
          const displayText = segment.charAt(0).toUpperCase() + segment.slice(1).replace("-", " ");

          return (
            <li key={segment} className="flex items-center">
              <span className="mx-2 text-gray-400">/</span>
              <span className={isLast ? "text-[#111827] font-semibold" : "text-gray-500"}>
                {displayText}
              </span>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}