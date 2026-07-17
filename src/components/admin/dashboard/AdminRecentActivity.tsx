"use client";

import { cn } from "@/lib/utils";
import type { AdminDashboardResponse } from "@/types/dashboard";

const ACTIVITY_ICONS: Record<string, React.ReactNode> = {
  created:   <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/></svg>,
  accepted:  <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
  completed: <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, // Agar bir xil bo'lsa
  progress:  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,
};

interface Props {
  stats?: AdminDashboardResponse;
}

function buildRecentActivity(stats?: AdminDashboardResponse) {
  return (stats?.recentIncidents || []).slice(0, 6).map((incident) => ({
    id: String(incident.id),
    type: incident.status === "RESOLVED" || incident.status === "CLOSED" ? "completed" : incident.status === "INVESTIGATING" ? "progress" : "created",
    user: incident.reportedBy?.fullName || incident.branchName || "Admin",
    action: incident.title,
    reportId: `INC-${incident.id}`,
    time: incident.createdAt ? new Date(incident.createdAt).toLocaleDateString("uz-UZ") : "",
    dotColor: incident.status === "RESOLVED" || incident.status === "CLOSED" ? "#22C55E" : incident.status === "INVESTIGATING" ? "#F59E0B" : "#3B82F6",
  }));
}

export function AdminRecentActivity({ stats }: Props) {
  const RECENT_ACTIVITY = buildRecentActivity(stats);
  return (
    <div className="rounded-2xl border border-stroke bg-white p-6 shadow-sm dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h2 className="text-base font-bold text-dark dark:text-white">So'nggi faoliyat</h2>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-dark-6">Oxirgi amallar</p>
        </div>
        <button className="text-xs font-semibold text-primary transition-all hover:opacity-80">
          Barchasini ko'rish
        </button>
      </div>

      {/* Timeline Wrapper */}
      <div className="relative flex flex-col pl-8">
        
        {/* Mukammal joylashgan markaziy chiziq */}
        <div className="absolute bottom-3 left-[11px] top-3 w-[2px] rounded-full bg-slate-200 dark:bg-dark-3" />

        {RECENT_ACTIVITY.length === 0 ? (
          <div className="text-sm text-gray-500 dark:text-dark-6">Hozircha faoliyat yo'q</div>
        ) : RECENT_ACTIVITY.map((item, i) => (
          <div
            key={item.id}
            className={cn(
              "relative mb-5 flex items-start gap-4",
              i === RECENT_ACTIVITY.length - 1 && "mb-0",
            )}
          >
            {/* Rasmdagidek effektga ega rangli doirachalar */}
            <span
              className="absolute -left-8 mt-0.5 flex h-[24px] w-[24px] items-center justify-center rounded-full text-white shadow-md ring-4 ring-white transition-all duration-200 dark:ring-gray-dark"
              style={{ 
                backgroundColor: item.dotColor,
                // Rasmdagi yumshoq ichki/tashqi soya effekti uchun:
                boxShadow: `0 4px 12px -2px ${item.dotColor}50, inset 0 -2px 4px rgba(0,0,0,0.15)`
              }}
            >
              {ACTIVITY_ICONS[item.type]}
            </span>

            {/* Kontent qismi */}
            <div className="flex-1 pt-0.5">
              <p className="text-sm font-medium leading-tight text-dark dark:text-white">
                {item.action}
              </p>
              <div className="mt-1 flex flex-wrap items-center gap-1.5 text-xs text-gray-400 dark:text-dark-6">
                <span className="font-medium text-gray-600 dark:text-gray-300">{item.user}</span>
                <span className="text-gray-300 dark:text-dark-4">•</span>
                <span className="font-mono bg-slate-100 dark:bg-dark-3 px-1.5 py-0.5 rounded text-[10px]">
                  {item.reportId}
                </span>
                <span className="text-gray-300 dark:text-dark-4">•</span>
                <span>{item.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
