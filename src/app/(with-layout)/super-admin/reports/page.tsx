"use client";

import { KanbanColumn }  from "@/components/super-admin/reports/KanbanColumn";
import { ReportDrawer }  from "@/components/super-admin/reports/ReportDrawer";
import { KANBAN_COLUMNS, PRIORITY_CONFIG, TYPE_CONFIG } from "@/data/reports";
import { useClickOutside } from "@/hooks/use-click-outside";
import { useReports } from "@/hooks/useReports";
import { mapApiReportToReport } from "@/lib/report-adapters";
import { cn } from "@/lib/utils";
import { Report, ReportStatus } from "@/types/report";
import Link from "next/link";
import { useCallback, useMemo, useRef, useState } from "react";

/* ── tiny multi-select chip ──────────────────────────────────────────────── */
function FilterChip({ label, options, selected, onChange }: {
  label: string;
  options: { value: string; label: string; color?: string }[];
  selected: string[];
  onChange: (v: string[]) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useClickOutside<HTMLDivElement>(useCallback(() => setOpen(false), []));
  const toggle = (v: string) => onChange(selected.includes(v) ? selected.filter(x => x !== v) : [...selected, v]);

  return (
    <div ref={ref} className="relative">
      <button onClick={() => setOpen(p => !p)}
        className={cn("flex h-8 items-center gap-1.5 rounded-lg border px-3 text-xs font-medium transition",
          selected.length > 0 ? "border-primary bg-primary/5 text-primary dark:bg-primary/10" : "border-stroke bg-white text-gray-500 hover:border-primary/60 dark:border-dark-3 dark:bg-gray-dark dark:text-dark-6")}>
        {label}
        {selected.length > 0 && <span className="flex h-4 min-w-4 items-center justify-center rounded-full bg-primary px-1 text-[10px] text-white">{selected.length}</span>}
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none" className={cn("transition-transform text-current opacity-50", open && "rotate-180")}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
      </button>
      {open && (
        <div className="absolute left-0 top-full z-30 mt-1.5 w-48 rounded-xl border border-stroke bg-white py-1.5 shadow-xl dark:border-dark-3 dark:bg-gray-dark">
          {options.map(opt => {
            const checked = selected.includes(opt.value);
            return (
              <label key={opt.value} className="flex cursor-pointer items-center gap-2.5 px-3 py-2 text-xs hover:bg-gray-50 dark:hover:bg-dark-2">
                <div className={cn("flex h-3.5 w-3.5 items-center justify-center rounded border-[1.5px] transition", checked ? "border-primary bg-primary" : "border-stroke dark:border-dark-4")}>
                  {checked && <svg width="8" height="6" viewBox="0 0 8 6" fill="none"><path d="M1 3l2 2 4-4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </div>
                <input type="checkbox" className="sr-only" checked={checked} onChange={() => toggle(opt.value)} />
                <span className="text-dark dark:text-white">{opt.label}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ── Statistics bar ──────────────────────────────────────────────────────── */
const STAT_ICONS = {
  total:    <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><line x1="16" y1="13" x2="8" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="16" y1="17" x2="8" y2="17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><polyline points="10 9 9 9 8 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  new:      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  progress: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  done:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  critical: <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
};

function StatsBar({ reports }: { reports: Report[] }) {
  const total    = reports.length;
  const newR     = reports.filter(r => r.status === "new").length;
  const inProg   = reports.filter(r => r.status === "in-progress").length;
  const done     = reports.filter(r => r.status === "completed").length;
  const critical = reports.filter(r => r.priority === "high").length;

  const items = [
    { label: "Jami",        value: total,    iconKey: "total"    as const, color: "text-primary",   bg: "bg-primary/10 dark:bg-primary/20"      },
    { label: "Yangi",       value: newR,     iconKey: "new"      as const, color: "text-blue-600",  bg: "bg-blue-50 dark:bg-blue-900/20"        },
    { label: "Jarayonda",   value: inProg,   iconKey: "progress" as const, color: "text-amber-600", bg: "bg-amber-50 dark:bg-amber-900/20"      },
    { label: "Yakunlangan", value: done,     iconKey: "done"     as const, color: "text-green-600", bg: "bg-green-50 dark:bg-green-900/20"      },
    { label: "Kritik",      value: critical, iconKey: "critical" as const, color: "text-red-600",   bg: "bg-red-50 dark:bg-red-900/20"          },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
      {items.map(s => (
        <div key={s.label} className="flex items-center gap-3 rounded-xl border border-stroke bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-dark-3 dark:bg-gray-dark">
          <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", s.bg, s.color)}>
            {STAT_ICONS[s.iconKey]}
          </div>
          <div>
            <p className={cn("text-xl font-bold", s.color)}>{s.value}</p>
            <p className="text-[11px] text-gray-400 dark:text-dark-6">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────────────────────────── */
export default function SuperAdminReportsPage() {
  const [selectedReport, setSelectedReport] = useState<Report | null>(null);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string[]>([]);
  const [deptFilter, setDeptFilter] = useState<string[]>([]);
  const [prioFilter, setPrioFilter] = useState<string[]>([]);
  const [dragOverCol, setDragOverCol] = useState<ReportStatus | null>(null);
  const dragId = useRef<string | null>(null);
  const { data, isLoading, refetch, isFetching } = useReports({ page: 0, size: 100, search: search || undefined });
  const reports = useMemo<Report[]>(() => (data?.content || []).map(mapApiReportToReport), [data]);

  /* drag handlers */
  const handleDragStart = (e: React.DragEvent, id: string) => {
    dragId.current = id;
    e.dataTransfer.effectAllowed = "move";
  };
  const handleDragOver = (e: React.DragEvent, col: ReportStatus) => {
    e.preventDefault(); e.dataTransfer.dropEffect = "move"; setDragOverCol(col);
  };
  const handleDrop = (e: React.DragEvent, col: ReportStatus) => {
    e.preventDefault();
    dragId.current = null;
    setDragOverCol(null);
  };

  /* filter */
  const filtered = reports.filter(r => {
    const q = search.toLowerCase();
    if (q && !r.title.toLowerCase().includes(q) && !r.reportId.toLowerCase().includes(q)) return false;
    if (typeFilter.length   && !typeFilter.includes(r.type))       return false;
    if (statusFilter.length && !statusFilter.includes(r.status))   return false;
    if (deptFilter.length   && !deptFilter.some(d => r.department.toLowerCase().includes(d))) return false;
    if (prioFilter.length   && !prioFilter.includes(r.priority))   return false;
    return true;
  });

  const hasFilters = search || typeFilter.length || statusFilter.length || deptFilter.length || prioFilter.length;

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <nav className="mb-1 flex items-center gap-1.5 text-xs text-gray-400 dark:text-dark-6">
              <Link href="/super-admin/dashboard" className="transition hover:text-primary">Dashboard</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="font-medium text-dark dark:text-white">Reports</span>
            </nav>
            <h1 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">Reports Management</h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-dark-6">Barcha hodisa va kuzatuvlarni boshqarish</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {[
              { label: "Export", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
              { label: "Refresh", icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className={isFetching ? "animate-spin" : ""}><polyline points="23 4 23 10 17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg> },
            ].map(btn => (
              <button key={btn.label} aria-label={btn.label} onClick={btn.label === "Refresh" ? () => void refetch() : undefined}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stroke bg-white text-dark transition hover:bg-gray-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2 sm:w-auto sm:gap-1.5 sm:px-3">
                {btn.icon}
                <span className="hidden sm:inline text-sm font-medium">{btn.label}</span>
              </button>
            ))}
            <button className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition hover:bg-opacity-90 sm:px-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="hidden xs:inline">Create Report</span>
              <span className="xs:hidden">Yaratish</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <StatsBar reports={filtered} />

        {/* Filters — sticky */}
        <div className="sticky top-[73px] z-20 flex flex-wrap items-center gap-2 rounded-xl border border-stroke bg-white/95 p-3 shadow-sm backdrop-blur dark:border-dark-3 dark:bg-gray-dark/95">
          {/* Search */}
          <div className="flex items-center gap-2 rounded-lg border border-stroke bg-gray-50 px-3 py-1.5 transition focus-within:border-primary dark:border-dark-3 dark:bg-dark-2">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gray-400"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Qidirish..."
              className="w-36 bg-transparent text-xs text-dark outline-none placeholder:text-gray-400 dark:text-white" />
            {search && <button onClick={() => setSearch("")} className="text-gray-400 hover:text-dark dark:hover:text-white"><svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>}
          </div>

          <FilterChip label="Report turi" selected={typeFilter} onChange={setTypeFilter}
            options={Object.entries(TYPE_CONFIG).map(([k, v]) => ({ value: k, label: v.label }))} />
          <FilterChip label="Status" selected={statusFilter} onChange={setStatusFilter}
            options={KANBAN_COLUMNS.map(c => ({ value: c.id, label: c.label }))} />
          <FilterChip label="Bo'lim" selected={deptFilter} onChange={setDeptFilter}
            options={["metallurgy","enrichment","mining","hsse"].map((v,i) => ({ value: v, label: ["Metallurgiya","Boyitish","Konchilik","HSSE"][i] }))} />
          <FilterChip label="Muhimlik" selected={prioFilter} onChange={setPrioFilter}
            options={Object.entries(PRIORITY_CONFIG).map(([k, v]) => ({ value: k, label: v.label }))} />

          {hasFilters && (
            <button onClick={() => { setSearch(""); setTypeFilter([]); setStatusFilter([]); setDeptFilter([]); setPrioFilter([]); }}
              className="flex items-center gap-1 text-xs text-gray-400 transition hover:text-red-500 dark:text-dark-6">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              Tozalash
            </button>
          )}

          <span className="ml-auto text-xs text-gray-400 dark:text-dark-6">{filtered.length} ta natija</span>
        </div>

        {/* Kanban Board */}
        <div className="flex gap-4 overflow-x-auto hide-scrollbar pb-4 hide-scrollbar">
          {KANBAN_COLUMNS.map(col => (
            <KanbanColumn
              key={col.id}
              status={col.id}
              reports={filtered.filter(r => r.status === col.id)}
              loading={isLoading}
              dragOverCol={dragOverCol}
              onDragStart={handleDragStart}
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              onDragLeave={() => setDragOverCol(null)}
              onCardClick={setSelectedReport}
            />
          ))}
        </div>
      </div>

      {/* Drawer */}
      <ReportDrawer report={selectedReport} onClose={() => setSelectedReport(null)} />
    </>
  );
}
