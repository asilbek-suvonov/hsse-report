"use client";

import { cn } from "@/lib/utils";
import type { AdminDashboardResponse } from "@/types/dashboard";

const TYPE_ICONS: Record<string, React.ReactNode> = {
  nearmiss:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  observation:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>,
  accident:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  incident:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
};

const STATUS_ICONS: Record<string, React.ReactNode> = {
  new:          <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  accepted:     <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  "in-progress":<svg width="17" height="17" viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  cancelled:    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><line x1="15" y1="9" x2="9" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="9" y1="9" x2="15" y2="15" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  completed:    <svg width="17" height="17" viewBox="0 0 24 24" fill="none"><path d="M9 11l3 3L22 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

function TrendUp() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}
function TrendDown() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="17 18 23 18 23 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>;
}

function SkeletonCard() {
  return (
    <div className="animate-pulse rounded-xl border border-stroke bg-white p-5 dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-3 flex justify-between"><div className="h-4 w-20 rounded bg-gray-200 dark:bg-dark-3"/><div className="h-9 w-9 rounded-lg bg-gray-200 dark:bg-dark-3"/></div>
      <div className="h-7 w-16 rounded bg-gray-200 dark:bg-dark-3"/>
      <div className="mt-2 h-3 w-24 rounded bg-gray-200 dark:bg-dark-3"/>
    </div>
  );
}

interface Props { loading?: boolean; stats?: AdminDashboardResponse; }

export function AdminKpiCards({ loading = false, stats }: Props) {
  const ADMIN_TYPE_KPI = [
    { key: "nearmiss",    label: "Jami xodimlar",   count: stats?.totalEmployees || 0,  prev: Math.max(1, (stats?.totalEmployees || 0) - 2),  borderColor: "border-l-orange-500", iconBg: "bg-orange-100 dark:bg-orange-900/30", color: "text-orange-600 dark:text-orange-400" },
    { key: "observation", label: "Faol xodimlar",   count: stats?.activeEmployees || 0, prev: Math.max(1, (stats?.activeEmployees || 0) - 1),  borderColor: "border-l-sky-500",    iconBg: "bg-sky-100 dark:bg-sky-900/30",       color: "text-sky-600 dark:text-sky-400"       },
    { key: "accident",    label: "Faol vazifalar",   count: stats?.activeTasks || 0,     prev: Math.max(1, (stats?.activeTasks || 0) - 3),      borderColor: "border-l-red-500",    iconBg: "bg-red-100 dark:bg-red-900/30",       color: "text-red-600 dark:text-red-400"       },
    { key: "incident",    label: "Ochiq hodisalar",  count: stats?.openIncidents || 0,   prev: Math.max(1, (stats?.openIncidents || 0) - 2),    borderColor: "border-l-violet-500", iconBg: "bg-violet-100 dark:bg-violet-900/30", color: "text-violet-600 dark:text-violet-400" },
  ];

  const ADMIN_STATUS_KPI = [
    { key: "new",          label: "Yangi (Todo)",    count: stats?.tasksByStatus?.TODO || 0,        prev: Math.max(1, (stats?.tasksByStatus?.TODO || 0) - 1),        dot: "bg-blue-500",   iconBg: "bg-blue-50 dark:bg-blue-900/20",     color: "text-blue-600 dark:text-blue-400"     },
    { key: "in-progress",  label: "Jarayonda",       count: stats?.tasksByStatus?.IN_PROGRESS || 0, prev: Math.max(1, (stats?.tasksByStatus?.IN_PROGRESS || 0) - 2), dot: "bg-amber-500",  iconBg: "bg-amber-50 dark:bg-amber-900/20",   color: "text-amber-600 dark:text-amber-400"   },
    { key: "accepted",     label: "Tekshiruvda",     count: stats?.tasksByStatus?.REVIEW || 0,      prev: Math.max(1, (stats?.tasksByStatus?.REVIEW || 0) - 1),      dot: "bg-violet-500", iconBg: "bg-violet-50 dark:bg-violet-900/20", color: "text-violet-600 dark:text-violet-400" },
    { key: "completed",    label: "Yakunlangan",     count: stats?.tasksByStatus?.DONE || 0,        prev: Math.max(1, (stats?.tasksByStatus?.DONE || 0) - 3),        dot: "bg-green-500",  iconBg: "bg-green-50 dark:bg-green-900/20",   color: "text-green-600 dark:text-green-400"   },
    { key: "cancelled",    label: "Mening loyihalarim",count: stats?.myProjects || 0,               prev: Math.max(1, (stats?.myProjects || 0) - 1),                 dot: "bg-red-500",    iconBg: "bg-red-50 dark:bg-red-900/20",       color: "text-red-600 dark:text-red-400"       },
  ];

  if (loading) return (
    <div className="flex flex-col gap-3">
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">{[1,2,3,4].map(i=><SkeletonCard key={i}/>)}</div>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">{[1,2,3,4,5].map(i=><SkeletonCard key={i}/>)}</div>
    </div>
  );

  return (
    <div className="flex flex-col gap-3">
      {/* Row 1 — Report types */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {ADMIN_TYPE_KPI.map(kpi => {
          const diff = kpi.count - kpi.prev;
          const pct  = Math.abs(Math.round((diff / kpi.prev) * 100));
          const up   = diff >= 0;
          const bad  = kpi.key === "accident" || kpi.key === "incident";
          const good = bad ? !up : up;
          return (
            <div key={kpi.key}
              className={cn("relative overflow-hidden rounded-xl border-l-4 border border-stroke bg-white p-4 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-dark-3 dark:bg-gray-dark", kpi.borderColor)}>
              <div className="absolute -right-3 -top-3 h-16 w-16 rounded-full opacity-10 blur-xl" style={{ background: "currentColor" }} />
              <div className="mb-3 flex items-start justify-between">
                <span className="text-xs font-medium text-gray-500 dark:text-dark-6">{kpi.label}</span>
                <div className={cn("flex h-9 w-9 items-center justify-center rounded-lg", kpi.iconBg, kpi.color)}>
                  {TYPE_ICONS[kpi.key]}
                </div>
              </div>
              <p className="text-2xl font-bold text-dark dark:text-white">{kpi.count}</p>
              <div className={cn("mt-1 flex items-center gap-1 text-[11px] font-semibold", good ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400")}>
                {up ? <TrendUp /> : <TrendDown />}
                <span>{up ? "+" : "-"}{pct}%</span>
                <span className="font-normal text-gray-400 dark:text-dark-6">o'tgan davr</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Row 2 — Status */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {ADMIN_STATUS_KPI.map(kpi => {
          const diff = kpi.count - kpi.prev;
          const pct  = Math.abs(Math.round((diff / kpi.prev) * 100));
          const up   = diff >= 0;
          const bad  = kpi.key === "cancelled";
          const good = bad ? !up : up;
          return (
            <div key={kpi.key}
              className="group flex items-center gap-3 rounded-xl border border-stroke bg-white p-3.5 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md dark:border-dark-3 dark:bg-gray-dark">
              <div className={cn("flex h-10 w-10 shrink-0 items-center justify-center rounded-xl", kpi.iconBg, kpi.color)}>
                {STATUS_ICONS[kpi.key]}
              </div>
              <div className="min-w-0">
                <p className={cn("text-xl font-bold", kpi.color)}>{kpi.count}</p>
                <p className="truncate text-[11px] text-gray-400 dark:text-dark-6">{kpi.label}</p>
                <div className={cn("flex items-center gap-0.5 text-[10px] font-semibold", good ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400")}>
                  {up ? <TrendUp /> : <TrendDown />}
                  <span>{up ? "+" : "-"}{pct}%</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
