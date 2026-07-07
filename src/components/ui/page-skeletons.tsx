import { Skeleton } from "./skeleton";

/* ── Reusable pieces ─────────────────────────────────────────────────────── */

function SkeletonCard({ className = "" }: { className?: string }) {
  return (
    <div className={`rounded-xl border border-stroke bg-white p-5 shadow-sm dark:border-dark-3 dark:bg-gray-dark ${className}`}>
      <div className="mb-3 flex items-start justify-between">
        <Skeleton className="h-4 w-24" />
        <Skeleton className="h-10 w-10 rounded-lg" />
      </div>
      <Skeleton className="h-8 w-20 mb-1.5" />
      <Skeleton className="h-3 w-32" />
    </div>
  );
}

function SkeletonHeader() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <Skeleton className="mb-2 h-3 w-32" />
        <Skeleton className="h-7 w-56 mb-2" />
        <Skeleton className="h-4 w-72" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-9 w-24 rounded-lg" />
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>
    </div>
  );
}

function SkeletonKpiRow({ count = 4 }: { count?: number }) {
  return (
    <div className={`grid grid-cols-2 gap-3 sm:grid-cols-${Math.min(count, 4)} xl:grid-cols-${count}`}>
      {Array.from({ length: count }).map((_, i) => <SkeletonCard key={i} />)}
    </div>
  );
}

function SkeletonChart({ height = 320 }: { height?: number }) {
  return (
    <div className="rounded-xl border border-stroke bg-white p-5 shadow-sm dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <Skeleton className="h-5 w-40 mb-2" />
          <Skeleton className="h-3 w-56" />
        </div>
        <Skeleton className="h-8 w-40 rounded-lg" />
      </div>
      <Skeleton className="w-full rounded-xl" style={{ height }} />
    </div>
  );
}

/* ── Dashboard Skeleton ──────────────────────────────────────────────────── */
export function DashboardSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <SkeletonHeader />
      {/* Filter panel */}
      <div className="rounded-xl border border-stroke bg-white p-4 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex flex-wrap gap-3">
          {[160, 140, 150, 130, 145].map((w, i) => (
            <Skeleton key={i} className="h-9 rounded-lg" style={{ width: w }} />
          ))}
        </div>
      </div>
      {/* KPI cards */}
      <SkeletonKpiRow count={4} />
      {/* Charts */}
      <SkeletonChart height={320} />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <div className="xl:col-span-3"><SkeletonChart height={300} /></div>
        <div className="xl:col-span-2"><SkeletonChart height={300} /></div>
      </div>
    </div>
  );
}

/* ── Reports Skeleton ────────────────────────────────────────────────────── */
export function ReportsSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <SkeletonHeader />
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-stroke bg-white p-3.5 dark:border-dark-3 dark:bg-gray-dark">
            <Skeleton className="h-9 w-9 rounded-lg shrink-0" />
            <div>
              <Skeleton className="h-6 w-10 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
      {/* Filter bar */}
      <div className="rounded-xl border border-stroke bg-white p-3 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex flex-wrap gap-2">
          {[120, 100, 110, 100].map((w, i) => <Skeleton key={i} className="h-8 rounded-lg" style={{ width: w }} />)}
        </div>
      </div>
      {/* Kanban columns */}
      <div className="flex gap-4 overflow-hidden">
        {Array.from({ length: 5 }).map((_, ci) => (
          <div key={ci} className="w-64 sm:w-72 shrink-0 rounded-2xl border border-stroke bg-gray-50 dark:border-dark-3 dark:bg-dark-2/40 p-3">
            <div className="mb-3 flex items-center justify-between px-1">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-5 w-6 rounded-full" />
            </div>
            <div className="flex flex-col gap-2.5">
              {Array.from({ length: ci % 2 === 0 ? 2 : 1 }).map((_, ri) => (
                <div key={ri} className="rounded-2xl border border-stroke bg-white p-4 dark:border-dark-3 dark:bg-gray-dark">
                  <Skeleton className="mb-2 h-4 w-20 rounded-full" />
                  <Skeleton className="mb-1.5 h-3 w-16" />
                  <Skeleton className="mb-1 h-4 w-full" />
                  <Skeleton className="mb-3 h-4 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                  <Skeleton className="mt-1 h-3 w-1/2" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ── Employees Skeleton ──────────────────────────────────────────────────── */
export function EmployeesSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <SkeletonHeader />
      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-2.5 rounded-xl border border-stroke bg-white p-3.5 dark:border-dark-3 dark:bg-gray-dark">
            <Skeleton className="h-9 w-9 rounded-xl shrink-0" />
            <div>
              <Skeleton className="h-6 w-8 mb-1" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
      {/* Table */}
      <div className="rounded-2xl border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-center gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
          <Skeleton className="h-9 w-56 rounded-lg" />
          <Skeleton className="ml-auto h-4 w-20" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-stroke dark:border-dark-3">
                {[200, 110, 160, 120, 140, 90, 80, 100, 60].map((w, i) => (
                  <th key={i} className="px-4 py-3">
                    <Skeleton className="h-3 rounded" style={{ width: w }} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {Array.from({ length: 6 }).map((_, ri) => (
                <tr key={ri} className="border-b border-stroke dark:border-dark-3">
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Skeleton className="h-9 w-9 rounded-full shrink-0" />
                      <div>
                        <Skeleton className="mb-1 h-3.5 w-28" />
                        <Skeleton className="h-3 w-16" />
                      </div>
                    </div>
                  </td>
                  {[100, 140, 90, 120, 70, 50, 80, 24].map((w, ci) => (
                    <td key={ci} className="px-4 py-3">
                      <Skeleton className="h-3 rounded" style={{ width: w }} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

/* ── Calendar Skeleton ───────────────────────────────────────────────────── */
export function CalendarSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <SkeletonHeader />
      {/* KPI */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => <SkeletonCard key={i} />)}
      </div>
      {/* Filter + nav */}
      <div className="rounded-xl border border-stroke bg-white p-4 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {[100, 110, 120, 100, 90].map((w, i) => <Skeleton key={i} className="h-9 rounded-lg" style={{ width: w }} />)}
          </div>
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-lg" />
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
        </div>
      </div>
      {/* Calendar grid */}
      <div className="rounded-2xl border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
        <div className="grid grid-cols-7 border-b border-stroke dark:border-dark-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="px-3 py-3">
              <Skeleton className="mx-auto h-3 w-8" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 p-2">
          {Array.from({ length: 35 }).map((_, i) => (
            <Skeleton key={i} className="min-h-[60px] rounded-lg sm:min-h-[110px] sm:rounded-xl" />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Messages Skeleton ───────────────────────────────────────────────────── */
export function MessagesSkeleton() {
  return (
    <div className="flex flex-col gap-4">
      {/* KPI */}
      <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-stroke bg-white p-3.5 dark:border-dark-3 dark:bg-gray-dark">
            <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
            <div>
              <Skeleton className="h-6 w-8 mb-1" />
              <Skeleton className="h-3 w-20" />
            </div>
          </div>
        ))}
      </div>
      {/* Chat layout */}
      <div className="flex overflow-hidden rounded-2xl border border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark" style={{ height: "calc(100vh - 200px)", minHeight: 500 }}>
        {/* Sidebar */}
        <div className="w-72 shrink-0 border-r border-stroke dark:border-dark-3 p-4">
          <div className="mb-4 flex items-center justify-between">
            <Skeleton className="h-5 w-24" />
            <Skeleton className="h-8 w-8 rounded-lg" />
          </div>
          <Skeleton className="mb-3 h-10 w-full rounded-xl" />
          <div className="mb-3 flex gap-1">
            {[70, 90, 80, 65, 75].map((w, i) => <Skeleton key={i} className="h-7 rounded-lg" style={{ width: w }} />)}
          </div>
          <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="flex items-center gap-3 rounded-xl p-2">
                <Skeleton className="h-11 w-11 rounded-full shrink-0" />
                <div className="flex-1 min-w-0">
                  <Skeleton className="mb-1.5 h-3.5 w-3/4" />
                  <Skeleton className="h-3 w-full" />
                </div>
              </div>
            ))}
          </div>
        </div>
        {/* Empty state */}
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col items-center gap-3">
            <Skeleton className="h-20 w-20 rounded-full" />
            <Skeleton className="h-5 w-40" />
            <Skeleton className="h-4 w-56" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Settings Skeleton ───────────────────────────────────────────────────── */
export function SettingsSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <SkeletonHeader />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-3">
        <div className="xl:col-span-2 flex flex-col gap-5">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="rounded-xl border border-stroke bg-white p-6 dark:border-dark-3 dark:bg-gray-dark">
              <Skeleton className="mb-4 h-5 w-40" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {Array.from({ length: 4 }).map((_, j) => (
                  <div key={j}>
                    <Skeleton className="mb-2 h-3.5 w-24" />
                    <Skeleton className="h-11 w-full rounded-lg" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-5">
          <div className="rounded-xl border border-stroke bg-white p-6 dark:border-dark-3 dark:bg-gray-dark">
            <Skeleton className="mb-4 h-5 w-32" />
            <Skeleton className="mx-auto mb-4 h-24 w-24 rounded-full" />
            <Skeleton className="mx-auto mb-2 h-4 w-32" />
            <Skeleton className="mx-auto h-3 w-40" />
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Admin Dashboard Skeleton ────────────────────────────────────────────── */
export function AdminDashboardSkeleton() {
  return (
    <div className="flex flex-col gap-5">
      <SkeletonHeader />
      {/* Quick actions */}
      <div className="flex flex-wrap gap-2">
        {[140, 110, 120, 110].map((w, i) => <Skeleton key={i} className="h-9 rounded-lg" style={{ width: w }} />)}
      </div>
      {/* KPI row 1 */}
      <SkeletonKpiRow count={4} />
      {/* KPI row 2 */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="flex items-center gap-3 rounded-xl border border-stroke bg-white p-3.5 dark:border-dark-3 dark:bg-gray-dark">
            <Skeleton className="h-10 w-10 rounded-xl shrink-0" />
            <div>
              <Skeleton className="h-6 w-8 mb-1" />
              <Skeleton className="h-3 w-16" />
            </div>
          </div>
        ))}
      </div>
      {/* Chart */}
      <SkeletonChart height={300} />
      {/* Bottom */}
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-5">
        <div className="xl:col-span-3"><SkeletonChart height={260} /></div>
        <div className="xl:col-span-2">
          <div className="rounded-xl border border-stroke bg-white p-5 dark:border-dark-3 dark:bg-gray-dark">
            <Skeleton className="mb-4 h-5 w-40" />
            <div className="flex flex-col gap-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <div key={i} className="flex items-start gap-3 pl-5 relative">
                  <div className="absolute left-1 top-1 h-5 w-5 rounded-full">
                    <Skeleton className="h-full w-full rounded-full" />
                  </div>
                  <div className="flex-1">
                    <Skeleton className="mb-1.5 h-3.5 w-48" />
                    <Skeleton className="h-3 w-36" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

