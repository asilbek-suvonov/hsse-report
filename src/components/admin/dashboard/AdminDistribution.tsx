"use client";

import { cn } from "@/lib/utils";
import type { AdminDashboardResponse } from "@/types/dashboard";
import { useState } from "react";

interface Props {
  stats?: AdminDashboardResponse;
}

function buildDistributionData(stats?: AdminDashboardResponse) {
  const taskStatuses = stats?.tasksByStatus || {};
  return [
    {
      type: "tasks", label: "Vazifalar", total: stats?.activeTasks || 0, color: "#F97316",
      statuses: [
        { label: "Yangi", count: taskStatuses.TODO || 0, color: "#3B82F6" },
        { label: "Jarayonda", count: taskStatuses.IN_PROGRESS || 0, color: "#F59E0B" },
        { label: "Tekshiruvda", count: taskStatuses.REVIEW || 0, color: "#8B5CF6" },
        { label: "Yakunlangan", count: taskStatuses.DONE || 0, color: "#22C55E" },
      ],
    },
    {
      type: "employees", label: "Xodimlar", total: stats?.totalEmployees || 0, color: "#0EA5E9",
      statuses: [
        { label: "Faol", count: stats?.activeEmployees || 0, color: "#22C55E" },
        { label: "Nofaol", count: Math.max(0, (stats?.totalEmployees || 0) - (stats?.activeEmployees || 0)), color: "#EF4444" },
      ],
    },
    {
      type: "incidents", label: "Hodisalar", total: stats?.openIncidents || 0, color: "#8B5CF6",
      statuses: [
        { label: "Ochiq", count: stats?.openIncidents || 0, color: "#8B5CF6" },
      ],
    },
    {
      type: "projects", label: "Loyihalar", total: stats?.myProjects || 0, color: "#EF4444",
      statuses: [
        { label: "Mening loyihalarim", count: stats?.myProjects || 0, color: "#EF4444" },
      ],
    },
  ];
}

export function AdminDistribution({ stats }: Props) {
  const [hoveredType, setHoveredType] = useState<string | null>(null);
  const DISTRIBUTION_DATA = buildDistributionData(stats);
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
          const pct = total > 0 ? Math.round((d.total / total) * 100) : 0;
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
