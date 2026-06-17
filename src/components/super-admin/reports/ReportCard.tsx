"use client";

import { PRIORITY_CONFIG, STATUS_CONFIG, TYPE_CONFIG } from "@/data/reports";
import { cn } from "@/lib/utils";
import { Report } from "@/types/report";
import Image from "next/image";
import { useRef } from "react";

interface Props {
  report: Report;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onClick: (r: Report) => void;
}

function LikeIcon()       { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>; }
function CommentIcon()    { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>; }
function AttachIcon()     { return <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>; }
function CalendarIcon()   { return <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/><path d="M16 2v4M8 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>; }

export function ReportCard({ report, onDragStart, onClick }: Props) {
  const cardRef = useRef<HTMLDivElement>(null);
  const type     = TYPE_CONFIG[report.type];
  const priority = PRIORITY_CONFIG[report.priority];

  return (
    <div
      ref={cardRef}
      draggable
      onDragStart={(e) => {
        onDragStart(e, report.id);
        setTimeout(() => { if (cardRef.current) cardRef.current.style.opacity = "0.4"; }, 0);
      }}
      onDragEnd={() => { if (cardRef.current) cardRef.current.style.opacity = "1"; }}
      onClick={() => onClick(report)}
      className={cn(
        "group relative cursor-pointer rounded-2xl border border-stroke bg-white p-4 shadow-sm",
        "transition-all duration-200  hover:shadow-md",
        "dark:border-dark-3 dark:bg-gray-dark",
        "border-t-4", type.border,
      )}
    >
      {/* Priority badge — top right */}
      <span className={cn("absolute right-3 top-3 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", priority.bg, priority.color)}>
        {priority.label}
      </span>

      {/* Header */}
      <div className="mb-2 flex items-start gap-2 pr-16">
        <span className={cn("shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold", type.bg, type.color)}>
          {type.label}
        </span>
      </div>

      {/* Report ID + Title */}
      <p className="mb-0.5 text-[11px] font-mono text-gray-400 dark:text-dark-6">{report.reportId}</p>
      <h3 className="mb-1.5 line-clamp-2 text-sm font-semibold leading-snug text-dark dark:text-white">
        {report.title}
      </h3>

      {/* Description */}
      <p className="mb-3 line-clamp-2 text-xs leading-relaxed text-gray-500 dark:text-dark-6">
        {report.description}
      </p>

      {/* Footer */}
      <div className="flex items-center justify-between gap-2">
        {/* Author */}
        <div className="flex items-center gap-1.5">
          <div className="relative h-6 w-6 overflow-hidden rounded-full bg-gray-100 dark:bg-dark-3">
            <Image src={report.author.avatar} alt={report.author.name} fill sizes="24px" className="object-cover" />
          </div>
          <span className="max-w-[80px] truncate text-[11px] font-medium text-dark dark:text-white">
            {report.author.name.split(" ")[0]}
          </span>
        </div>

        {/* Meta counts */}
        <div className="flex items-center gap-2.5 text-gray-400 dark:text-dark-6">
          <span className="flex items-center gap-1 text-[11px]"><CommentIcon />{report.comments}</span>
          <span className="flex items-center gap-1 text-[11px]"><AttachIcon />{report.attachments}</span>
        </div>
      </div>

      {/* Date */}
      <div className="mt-2.5 flex items-center gap-1 border-t border-stroke pt-2 text-[11px] text-gray-400 dark:border-dark-3 dark:text-dark-6">
        <CalendarIcon />
        {new Date(report.createdAt).toLocaleDateString("uz-UZ", { day: "2-digit", month: "short", year: "numeric" })}
      </div>
    </div>
  );
}

/* Skeleton */
export function ReportCardSkeleton() {
  return (
    <div className="animate-pulse rounded-2xl border border-stroke bg-white p-4 dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-2 h-4 w-16 rounded-full bg-gray-200 dark:bg-dark-3" />
      <div className="mb-1 h-3 w-20 rounded bg-gray-200 dark:bg-dark-3" />
      <div className="mb-1 h-4 w-full rounded bg-gray-200 dark:bg-dark-3" />
      <div className="mb-3 h-4 w-3/4 rounded bg-gray-200 dark:bg-dark-3" />
      <div className="h-3 w-full rounded bg-gray-200 dark:bg-dark-3" />
      <div className="mt-1 h-3 w-2/3 rounded bg-gray-200 dark:bg-dark-3" />
    </div>
  );
}
