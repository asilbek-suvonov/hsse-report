"use client";

import { PRIORITY_CONFIG, STATUS_CONFIG, TYPE_CONFIG } from "@/data/reports";
import { cn } from "@/lib/utils";
import { Report } from "@/types/report";
import Image from "next/image";
import { useEffect } from "react";

interface Props { report: Report | null; onClose: () => void; }

function InfoRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-start justify-between gap-3 py-2.5 border-b border-stroke last:border-0 dark:border-dark-3">
      <span className="shrink-0 text-xs text-gray-400 dark:text-dark-6">{label}</span>
      <span className="text-right text-xs font-medium text-dark dark:text-white">{value}</span>
    </div>
  );
}

export function ReportDrawer({ report, onClose }: Props) {
  const open = Boolean(report);

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const type     = report ? TYPE_CONFIG[report.type]         : null;
  const status   = report ? STATUS_CONFIG[report.status]     : null;
  const priority = report ? PRIORITY_CONFIG[report.priority] : null;

  return (
    <>
      <div onClick={onClose}
        className={cn("fixed inset-0 z-9998 bg-black/40 backdrop-blur-[2px] transition-all duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0")}
        aria-hidden="true"
      />

      <aside
        role="dialog" aria-modal="true"
        className={cn("fixed right-0 top-0 z-9999 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-gray-dark sm:max-w-[540px]",
          open ? "translate-x-0" : "translate-x-full")}
      >
        {/* Header */}
        <div className="flex items-start justify-between border-b border-stroke px-6 py-5 dark:border-dark-3 pt-[20px] ">
          <div>
            {report && (
              <>
                <p className="mb-1 font-mono text-xs text-gray-400 dark:text-dark-6">{report.reportId}</p>
                <h2 className="text-base font-bold text-dark dark:text-white">{report.title}</h2>
                
              </>
            )}
          </div>
          <button onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-dark dark:hover:bg-dark-2 dark:hover:text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto hide-scrollbar px-6 py-5">
          {report && (
            <div className="flex flex-col gap-6">
              {/* Description */}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-dark-6">Tavsif</h3>
                <p className="text-sm leading-relaxed text-dark dark:text-white">{report.description}</p>
              </div>

              {/* Report info */}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-dark-6">Report Ma'lumotlari</h3>
                <div className="rounded-xl border border-stroke bg-gray-50/60 px-4 dark:border-dark-3 dark:bg-dark-2/60">
                  <InfoRow label="ID"          value={report.reportId} />
                  <InfoRow label="Turi"        value={<span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", type?.bg, type?.color)}>{type?.label}</span>} />
                  <InfoRow label="Status"      value={<span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", status?.bg, status?.color)}>{status?.label}</span>} />
                  <InfoRow label="Muhimlik"    value={<span className={cn("rounded-full px-2 py-0.5 text-[11px] font-semibold", priority?.bg, priority?.color)}>{priority?.label}</span>} />
                  <InfoRow label="Bo'lim"      value={report.department} />
                  <InfoRow label="Xavf turi"   value={report.riskCategory} />
                  <InfoRow label="Yaratilgan"  value={new Date(report.createdAt).toLocaleDateString("uz-UZ", { day:"2-digit", month:"long", year:"numeric" })} />
                </div>
              </div>

              {/* Author */}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-dark-6">Muallif</h3>
                <div className="flex items-center gap-3 rounded-xl border border-stroke bg-gray-50/60 px-4 py-3 dark:border-dark-3 dark:bg-dark-2/60">
                  <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-dark-3">
                    <Image src={report.author.avatar} alt={report.author.name} fill sizes="40px" className="object-cover" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-dark dark:text-white">{report.author.name}</p>
                    <p className="text-xs text-gray-400 dark:text-dark-6">Hisobot yaratuvchi</p>
                  </div>
                </div>
              </div>

              {/* Attachments */}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-dark-6">Fayllar ({report.attachments})</h3>
                {report.attachments === 0 ? (
                  <p className="text-xs text-gray-400 dark:text-dark-6">Fayl yuklanmagan</p>
                ) : (
                  <div className="flex flex-col gap-2">
                    {Array.from({ length: report.attachments }).map((_, i) => (
                      <div key={i} className="flex items-center gap-3 rounded-xl border border-stroke bg-gray-50/60 px-3 py-2.5 dark:border-dark-3 dark:bg-dark-2/60">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-gray-400"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
                        <span className="text-xs font-medium text-dark dark:text-white">attachment_{i + 1}.pdf</span>
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="ml-auto text-gray-400 hover:text-primary cursor-pointer"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Activity Timeline */}
              <div>
                <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-dark-6">Faoliyat tarixi</h3>
                <div className="relative flex flex-col gap-0 pl-4">
                  <div className="absolute left-[7px] top-2 bottom-2 w-px bg-stroke dark:bg-dark-3" />
                  {[
                    { label: "Hisobot yaratildi", user: report.author.name, date: report.createdAt, dot: "bg-blue-500" },
                    ...(report.status !== "new" ? [{ label: "Qabul qilindi", user: "Aziza Karimova", date: report.updatedAt, dot: "bg-violet-500" }] : []),
                    ...(report.status === "completed" ? [{ label: "Yakunlandi", user: "Sardor Mirzayev", date: report.updatedAt, dot: "bg-green-500" }] : []),
                  ].map((item, i) => (
                    <div key={i} className="relative mb-4 flex items-start gap-3">
                      <span className={cn("absolute -left-4 mt-1 h-3 w-3 rounded-full border-2 border-white dark:border-gray-dark", item.dot)} />
                      <div className="ml-3">
                        <p className="text-xs font-semibold text-dark dark:text-white">{item.label}</p>
                        <p className="text-[11px] text-gray-400 dark:text-dark-6">{item.user} · {new Date(item.date).toLocaleDateString("uz-UZ")}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stats */}
              <div>
                <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-dark-6">Statistika</h3>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,    label:"Like",  val:report.likes },
                    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>, label:"Izoh",  val:report.comments },
                    { icon: <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>, label:"Fayl",  val:report.attachments },
                  ].map((s) => (
                    <div key={s.label} className="flex flex-col items-center rounded-xl border border-stroke bg-gray-50/60 py-3 dark:border-dark-3 dark:bg-dark-2/60">
                      <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 text-gray-500 dark:bg-dark-3 dark:text-dark-6">{s.icon}</span>
                      <span className="mt-1.5 text-base font-bold text-dark dark:text-white">{s.val}</span>
                      <span className="text-[11px] text-gray-400 dark:text-dark-6">{s.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
