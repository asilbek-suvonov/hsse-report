"use client";

import { STATUS_CONFIG } from "@/data/reports";
import { cn } from "@/lib/utils";
import { Report, ReportStatus } from "@/types/report";
import { ReportCard, ReportCardSkeleton } from "./ReportCard";

interface Props {
  status: ReportStatus;
  reports: Report[];
  loading: boolean;
  dragOverCol: ReportStatus | null;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent, col: ReportStatus) => void;
  onDrop: (e: React.DragEvent, col: ReportStatus) => void;
  onDragLeave: () => void;
  onCardClick: (r: Report) => void;
}

export function KanbanColumn({
  status, reports, loading,
  dragOverCol, onDragStart, onDragOver, onDrop, onDragLeave, onCardClick,
}: Props) {
  const cfg    = STATUS_CONFIG[status];
  const isOver = dragOverCol === status;

  return (
    <div
      onDragOver={(e) => onDragOver(e, status)}
      onDrop={(e) => onDrop(e, status)}
      onDragLeave={onDragLeave}
      className={cn(
        "flex w-64 shrink-0 flex-col rounded-2xl border transition-all duration-200 sm:w-72",
        isOver
          ? "border-primary/50 bg-primary/5 dark:bg-primary/10"
          : "border-stroke bg-gray-50/80 dark:border-dark-3 dark:bg-dark-2/40",
      )}
    >
      {/* Column header */}
      <div className="flex items-center justify-between rounded-t-2xl px-4 py-3.5">
        <div className="flex items-center gap-2">
          <span className={cn("h-2.5 w-2.5 rounded-full", cfg.dot)} />
          <span className="text-sm font-semibold text-dark dark:text-white">{cfg.label}</span>
        </div>
        <span className={cn("flex h-6 min-w-6 items-center justify-center rounded-full px-1.5 text-xs font-bold", cfg.bg, cfg.color)}>
          {reports.length}
        </span>
      </div>

      {/* Top border accent */}
      <div className={cn("h-0.5 w-full", cfg.dot)} />

      {/* Cards */}
      <div className="flex flex-col gap-2.5 overflow-y-auto hide-scrollbar p-3" style={{ maxHeight: "calc(100vh - 300px)", minHeight: 120 }}>
        {loading ? (
          Array(2).fill(null).map((_, i) => <ReportCardSkeleton key={i} />)
        ) : reports.length === 0 ? (
          <div className={cn(
            "flex flex-col items-center justify-center rounded-xl border-2 border-dashed py-10 transition-colors",
            isOver ? "border-primary/50 bg-primary/5" : "border-stroke dark:border-dark-3",
          )}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" className="mb-2 text-gray-300 dark:text-dark-6">
              <rect x="3" y="3" width="18" height="18" rx="3" stroke="currentColor" strokeWidth="1.5" strokeDasharray="4 2" />
              <path d="M12 8v8M8 12h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <p className="text-xs text-gray-400 dark:text-dark-6">
              {isOver ? "Bu yerga tashlang" : "Report yo'q"}
            </p>
          </div>
        ) : (
          reports.map((r) => (
            <ReportCard key={r.id} report={r} onDragStart={onDragStart} onClick={onCardClick} />
          ))
        )}
      </div>
    </div>
  );
}
