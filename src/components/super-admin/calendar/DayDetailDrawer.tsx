"use client";

import { cn } from "@/lib/utils";
import { DayData, DayReport } from "@/types/calendar";
import Image from "next/image";
import { useEffect } from "react";

const TYPE_CFG={
  nearmiss:    {label:"Near Miss",  color:"text-orange-700 dark:text-orange-400",bg:"bg-orange-50 dark:bg-orange-900/20"},
  observation: {label:"Observation",color:"text-sky-700 dark:text-sky-400",      bg:"bg-sky-50 dark:bg-sky-900/20"},
  accident:    {label:"Accident",   color:"text-red-700 dark:text-red-400",       bg:"bg-red-50 dark:bg-red-900/20"},
  incident:    {label:"Incident",   color:"text-violet-700 dark:text-violet-400", bg:"bg-violet-50 dark:bg-violet-900/20"},
};
const STATUS_CFG={
  new:           {label:"Yangi",          color:"text-blue-700 dark:text-blue-400",   bg:"bg-blue-50 dark:bg-blue-900/20"},
  accepted:      {label:"Qabul qilingan", color:"text-violet-700 dark:text-violet-400",bg:"bg-violet-50 dark:bg-violet-900/20"},
  "in-progress": {label:"Jarayonda",      color:"text-amber-700 dark:text-amber-400", bg:"bg-amber-50 dark:bg-amber-900/20"},
  cancelled:     {label:"Bekor qilingan", color:"text-red-700 dark:text-red-400",     bg:"bg-red-50 dark:bg-red-900/20"},
  completed:     {label:"Yakunlangan",    color:"text-green-700 dark:text-green-400", bg:"bg-green-50 dark:bg-green-900/20"},
};
const SEV_CFG={
  high:  {label:"High",  color:"text-red-700 dark:text-red-400",    bg:"bg-red-50 dark:bg-red-900/20"},
  medium:{label:"Medium",color:"text-amber-700 dark:text-amber-400",bg:"bg-amber-50 dark:bg-amber-900/20"},
  low:   {label:"Low",   color:"text-green-700 dark:text-green-400",bg:"bg-green-50 dark:bg-green-900/20"},
};

function ReportItem({r}:{r:DayReport}){
  const type=TYPE_CFG[r.type],status=STATUS_CFG[r.status],sev=SEV_CFG[r.severity];
  return(
    <div className="rounded-xl border border-stroke bg-gray-50/60 p-4 dark:border-dark-3 dark:bg-dark-2/60">
      <div className="mb-2 flex flex-wrap gap-1.5">
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold",type.bg,type.color)}>{type.label}</span>
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold",status.bg,status.color)}>{status.label}</span>
        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold",sev.bg,sev.color)}>{sev.label}</span>
      </div>
      <p className="mb-1 text-sm font-semibold text-dark dark:text-white">{r.title}</p>
      <p className="mb-3 line-clamp-2 text-xs text-gray-500 dark:text-dark-6">{r.description}</p>
      <div className="flex flex-wrap items-center gap-3 text-xs text-gray-400 dark:text-dark-6">
        <div className="flex items-center gap-1.5">
          <div className="relative h-5 w-5 overflow-hidden rounded-full bg-gray-200">
            <Image src={r.createdBy.avatar} alt={r.createdBy.name} fill sizes="20px" className="object-cover"/>
          </div>
          <span>{r.createdBy.name}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
          <span>{r.department}</span>
        </div>
        <div className="flex items-center gap-1">
          <svg width="11" height="11" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><polyline points="12 6 12 12 16 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
          <span>{r.time}</span>
        </div>
      </div>
    </div>
  );
}

export function DayDetailDrawer({day,onClose}:{day:DayData|null;onClose:()=>void}){
  const open=Boolean(day);
  useEffect(()=>{
    const h=(e:KeyboardEvent)=>{if(e.key==="Escape")onClose();};
    document.addEventListener("keydown",h);
    return()=>document.removeEventListener("keydown",h);
  },[onClose]);

  const dateStr=day?new Date(day.date).toLocaleDateString("uz-UZ",{weekday:"long",year:"numeric",month:"long",day:"numeric"}):"";

  return(
    <>
      <div onClick={onClose} className={cn("fixed inset-0 z-40 bg-black/40 backdrop-blur-[2px] transition-all duration-300",open?"opacity-100":"pointer-events-none opacity-0")} aria-hidden="true"/>
      <aside role="dialog" aria-modal="true"
        className={cn("fixed right-0 top-0 z-50 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-gray-dark sm:max-w-[520px]",open?"translate-x-0":"translate-x-full")}>
        <div className="flex items-start justify-between border-b border-stroke px-6 py-5 dark:border-dark-3">
          <div>
            <h2 className="text-base font-bold capitalize text-dark dark:text-white">{dateStr}</h2>
            {day&&(
              <div className="mt-1.5 flex items-center gap-3 text-xs text-gray-500 dark:text-dark-6">
                <span className="flex items-center gap-1 text-orange-500"><span className="h-2 w-2 rounded-full bg-orange-400"/>{day.nearmiss} NM</span>
                <span className="flex items-center gap-1 text-sky-500"><span className="h-2 w-2 rounded-full bg-sky-400"/>{day.observation} OB</span>
                <span className="flex items-center gap-1 text-red-500"><span className="h-2 w-2 rounded-full bg-red-500"/>{day.accident} AC</span>
                <span className="flex items-center gap-1 text-violet-500"><span className="h-2 w-2 rounded-full bg-violet-500"/>{day.incident} IN</span>
              </div>
            )}
          </div>
          <button onClick={onClose} className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-dark dark:hover:bg-dark-2 dark:hover:text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>
        <div className="flex-1 overflow-y-auto hide-scrollbar px-6 py-5">
          {day&&day.reports.length>0?(
            <div className="flex flex-col gap-3">
              <p className="text-xs font-medium text-gray-400 dark:text-dark-6">Jami {day.reports.length} ta hisobot</p>
              {day.reports.map(r=><ReportItem key={r.id} r={r}/>)}
            </div>
          ):(
            <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-400">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="opacity-30"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>
              <p className="text-sm">Bu kunda hisobot mavjud emas</p>
            </div>
          )}
        </div>
      </aside>
    </>
  );
}
