"use client";

import { AdminAnalyticsChart } from "@/components/admin/dashboard/AdminAnalyticsChart";
import { AdminDistribution }   from "@/components/admin/dashboard/AdminDistribution";
import { AdminKpiCards }       from "@/components/admin/dashboard/AdminKpiCards";
import { AdminRecentActivity } from "@/components/admin/dashboard/AdminRecentActivity";
import { QUICK_ACTION_ITEMS }  from "@/data/admin-dashboard";
import { useAdminDashboard }   from "@/hooks/useDashboard";
import { useAuthStore }        from "@/store/useAuthStore";
import Link from "next/link";
import { useState } from "react";

/* ── Icons ─────────────────────────────────────────────────────────────── */
const ACTION_ICONS: Record<string, React.ReactNode> = {
  plus: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
    </svg>
  ),
  calendar: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
      <path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
    </svg>
  ),
  file: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
      <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
  message: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
      <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    </svg>
  ),
};

/* ── Greeting ───────────────────────────────────────────────────────────── */
function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Xayrli tong";
  if (h < 17) return "Xayrli kun";
  return "Xayrli kech";
}

/* ── Date Range Picker ──────────────────────────────────────────────────── */
function DateRangePicker() {
  const [from, setFrom] = useState("");
  const [to,   setTo]   = useState("");
  return (
    <div className="flex items-center gap-1">
      <input
        type="date" value={from} onChange={e => setFrom(e.target.value)}
        aria-label="Boshlanish sanasi"
        className="h-9 w-32 rounded-lg border border-stroke bg-white px-2 text-xs text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white sm:w-auto sm:px-3"
      />
      <span className="text-gray-400 text-xs">—</span>
      <input
        type="date" value={to} onChange={e => setTo(e.target.value)}
        aria-label="Tugash sanasi"
        className="h-9 w-32 rounded-lg border border-stroke bg-white px-2 text-xs text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white sm:w-auto sm:px-3"
      />
    </div>
  );
}

/* ── Page ───────────────────────────────────────────────────────────────── */
export default function AdminDashboardPage() {
  const user    = useAuthStore(s => s.user);
  const { data: stats, isLoading, isFetching, refetch } = useAdminDashboard();

  const handleRefresh = () => { void refetch(); };

  return (
    <div className="flex flex-col gap-5">

      {/* ── Header ── */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <p className="text-sm text-gray-500 dark:text-dark-6">
            {getGreeting()}, {user?.name ?? "Admin"}
          </p>
          <h1 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">Dashboard</h1>
          <p className="mt-0.5 text-sm text-gray-500 dark:text-dark-6">
            Hisobotlar va hodisalar umumiy ko'rinishi
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <DateRangePicker />

          {/* Export — icon-only on mobile */}
          <button
            aria-label="Eksport qilish"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-stroke bg-white text-dark transition hover:bg-gray-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hidden text-sm font-medium sm:inline">Export</span>
          </button>

          {/* Refresh — icon-only on mobile */}
          <button
            onClick={handleRefresh}
            aria-label="Yangilash"
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-stroke bg-white text-dark transition hover:bg-gray-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-2"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={isFetching ? "animate-spin" : ""}>
              <polyline points="23 4 23 10 17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <span className="hidden text-sm font-medium sm:inline">Yangilash</span>
          </button>
        </div>
      </div>

      {/* ── Quick Actions ── */}
      <div className="flex flex-wrap gap-2" role="navigation" aria-label="Tezkor amallar">
        {QUICK_ACTION_ITEMS.map(a => (
          <Link
            key={a.label}
            href={a.href}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition hover:-translate-y-0.5 sm:px-4 ${a.colorClass}`}
          >
            {ACTION_ICONS[a.iconKey]}
            <span className="hidden xs:inline">{a.label}</span>
            {/* mobile: icon only, accessible via aria */}
            <span className="xs:hidden sr-only">{a.label}</span>
          </Link>
        ))}
      </div>

      {/* ── KPI Cards ── */}
      <AdminKpiCards loading={isLoading} stats={stats} />

      {/* ── Analytics Chart ── */}
      <AdminAnalyticsChart stats={stats} />

      {/* ── Bottom grid ── */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <div className="xl:col-span-3"><AdminDistribution stats={stats} /></div>
        <div className="xl:col-span-2"><AdminRecentActivity stats={stats} /></div>
      </div>
    </div>
  );
}
