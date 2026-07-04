"use client";

import { getDayState } from "@/data/calendar";
import { cn } from "@/lib/utils";
import { DayData } from "@/types/calendar";

interface Props { day: DayData | null; isToday?: boolean; onClick?: (d: DayData) => void; }

const INDICATORS = [
  { key: "nearmiss"    as const, label: "NM", bar: "bg-orange-400", text: "text-orange-600 dark:text-orange-400" },
  { key: "observation" as const, label: "OB", bar: "bg-sky-400",    text: "text-sky-600 dark:text-sky-400"       },
  { key: "accident"    as const, label: "AC", bar: "bg-red-500",    text: "text-red-600 dark:text-red-400"       },
  { key: "incident"    as const, label: "IN", bar: "bg-violet-500", text: "text-violet-600 dark:text-violet-400" },
];

const STATE = {
  empty:    "bg-gray-50/60 dark:bg-dark-2/30 border-stroke dark:border-dark-3",
  normal:   "bg-white dark:bg-gray-dark border-stroke dark:border-dark-3 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5",
  warning:  "bg-amber-50/80 dark:bg-amber-900/10 border-amber-200 dark:border-amber-800 hover:shadow-md hover:-translate-y-0.5",
  critical: "bg-red-50/80 dark:bg-red-900/10 border-red-200 dark:border-red-800 ring-1 ring-red-300 dark:ring-red-800 hover:shadow-md hover:-translate-y-0.5",
};
const BADGE = {
  warning:  "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400",
  critical: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400",
};

export function DayCell({ day, isToday, onClick }: Props) {
  if (!day) return <div className="min-h-[60px] rounded-lg sm:min-h-[110px] sm:rounded-xl" />;

  const state  = getDayState(day);
  const dayNum = parseInt(day.date.split("-")[2]);
  const total  = day.nearmiss + day.observation + day.accident + day.incident;
  const maxVal = Math.max(day.nearmiss, day.observation, day.accident, day.incident, 1);

  return (
    <button
      onClick={() => state !== "empty" && onClick?.(day)}
      aria-label={`${day.date}: ${total} ta hodisa`}
      aria-pressed={false}
      className={cn(
        "group relative flex min-h-[60px] w-full cursor-pointer flex-col rounded-lg border p-1.5 text-left transition-all duration-200",
        "sm:min-h-[110px] sm:rounded-xl sm:p-3",
        STATE[state],
        state === "empty" && "cursor-default",
      )}
    >
      {/* Date number + badge */}
      <div className="mb-1 flex items-start justify-between sm:mb-2">
        <div className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-semibold sm:h-7 sm:w-7 sm:text-sm",
          isToday ? "bg-primary text-white shadow-sm" : "text-dark dark:text-white",
        )}>
          {dayNum}
        </div>

        <div className="flex items-center gap-0.5 sm:gap-1">
          {(state === "critical" || state === "warning") && (
            <span className={cn(
              "hidden rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase sm:inline-block sm:px-2 sm:text-[10px]",
              BADGE[state as "critical" | "warning"],
            )}>
              {state === "critical" ? "!" : "⚠"}
            </span>
          )}
          {/* Mobile: just show dot color for state */}
          {(state === "critical") && (
            <span className="h-1.5 w-1.5 rounded-full bg-red-500 sm:hidden" />
          )}
          {(state === "warning") && (
            <span className="h-1.5 w-1.5 rounded-full bg-amber-400 sm:hidden" />
          )}
          {total > 0 && (
            <span className="text-[9px] font-medium text-gray-400 dark:text-dark-6 sm:text-[10px]">
              {total}
            </span>
          )}
        </div>
      </div>

      {/* Indicators — hidden on xs, visible sm+ */}
      {state === "empty" ? (
        <div className="hidden flex-1 items-center justify-center sm:flex">
          <span className="text-xs text-gray-300 dark:text-dark-6">—</span>
        </div>
      ) : (
        <div className="hidden flex-col gap-1 sm:flex">
          {INDICATORS.map(({ key, label, bar, text }) => {
            const val = day[key];
            if (val === 0) return null;
            return (
              <div key={key} className="flex items-center gap-1.5">
                <span className={cn("w-5 shrink-0 text-[10px] font-bold", text)}>{label}</span>
                <div className="relative flex-1 overflow-hidden rounded-full bg-gray-100 dark:bg-dark-3" style={{ height: 4 }}>
                  <div
                    className={cn("absolute left-0 top-0 h-full rounded-full transition-all duration-500", bar)}
                    style={{ width: `${Math.round((val / maxVal) * 100)}%` }}
                  />
                </div>
                <span className="w-5 shrink-0 text-right text-[10px] font-semibold text-dark dark:text-white">{val}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* Mobile: colored dots for each type */}
      {state !== "empty" && (
        <div className="flex flex-wrap gap-0.5 sm:hidden">
          {INDICATORS.map(({ key, bar }) => {
            if (day[key] === 0) return null;
            return <span key={key} className={cn("h-1.5 w-1.5 rounded-full", bar)} />;
          })}
        </div>
      )}
    </button>
  );
}

export function DayCellSkeleton() {
  return (
    <div className="min-h-[60px] animate-pulse rounded-lg bg-gray-100 dark:bg-dark-2 sm:min-h-[110px] sm:rounded-xl" />
  );
}
