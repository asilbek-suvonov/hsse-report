"use client";

import { DISTRIBUTION_DATA } from "@/data/admin-dashboard";
import { cn } from "@/lib/utils";
import { useState } from "react";

export function AdminDistribution() {
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const total = DISTRIBUTION_DATA.reduce((s, d) => s + d.total, 0);

  return (
    <div className="rounded-xl border border-stroke bg-white p-5 shadow-sm dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-4">
        <h2 className="text-base font-bold text-dark dark:text-white">Hisobotlar taqsimoti</h2>
        <p className="mt-0.5 text-xs text-gray-500 dark:text-dark-6">
          Kategoriya va status bo'yicha taqsimot
        </p>
      </div>

    
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {DISTRIBUTION_DATA.map(d => {
          const pct = Math.round((d.total / total) * 100);
          const isHovered = hoveredType === d.type;
          return (
            <div
              key={d.type}
              onMouseEnter={() => setHoveredType(d.type)}
              onMouseLeave={() => setHoveredType(null)}
              className={cn(
                "rounded-xl border-l-4 border border-stroke bg-gray-50/60 p-4 transition-all duration-200",
                "hover:-translate-y-0.5 hover:shadow-md dark:border-dark-3 dark:bg-dark-2/60",
                isHovered && "border-stroke shadow-md",
              )}
              style={{ borderLeftColor: d.color }}
            >
              {/* Header */}
              <div className="mb-3 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                  <span className="text-sm font-semibold text-dark dark:text-white">{d.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-lg font-bold text-dark dark:text-white">{d.total}</span>
                  <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500 dark:bg-dark-3 dark:text-dark-6">
                    {pct}%
                  </span>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mb-3 h-1.5 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-dark-3">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{ width: `${pct}%`, backgroundColor: d.color }}
                />
              </div>

              {/* Status breakdown */}
              <div className="flex flex-col gap-1">
                {d.statuses.map(s => (
                  <div key={s.label} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: s.color }} />
                      <span className="text-gray-500 dark:text-dark-6">{s.label}</span>
                    </div>
                    <span className="font-semibold text-dark dark:text-white">{s.count}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
