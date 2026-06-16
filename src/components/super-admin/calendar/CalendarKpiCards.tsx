"use client";

import { CALENDAR_KPI } from "@/data/calendar";
import { cn } from "@/lib/utils";

const ICONS:Record<string,React.ReactNode>={
  nearmiss:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  observation:<svg width="20" height="20" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>,
  accident:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>,
  incident:   <svg width="20" height="20" viewBox="0 0 24 24" fill="none"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
};

function Skeleton(){
  return(
    <div className="animate-pulse rounded-2xl border border-stroke bg-white p-5 dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-3 flex justify-between"><div className="h-4 w-20 rounded-lg bg-gray-200 dark:bg-dark-3"/><div className="h-10 w-10 rounded-xl bg-gray-200 dark:bg-dark-3"/></div>
      <div className="h-8 w-16 rounded-lg bg-gray-200 dark:bg-dark-3"/>
      <div className="mt-2 h-3 w-28 rounded bg-gray-200 dark:bg-dark-3"/>
    </div>
  );
}

export function CalendarKpiCards({loading=false}:{loading?:boolean}){
  if(loading) return(
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {[1,2,3,4].map(i=><Skeleton key={i}/>)}
    </div>
  );

  return(
    <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
      {CALENDAR_KPI.map(kpi=>{
        const diff=kpi.count-kpi.prev;
        const pct=Math.abs(Math.round((diff/kpi.prev)*100));
        const up=diff>=0;
        const bad=kpi.key==="accident"||kpi.key==="incident";
        const good=bad?!up:up;
        return(
          <div key={kpi.key}
            className={cn("group relative overflow-hidden rounded-2xl border-l-4 border border-stroke bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg dark:border-dark-3 dark:bg-gray-dark",kpi.border)}>
            <div className={cn("absolute -right-6 -top-6 h-24 w-24 rounded-full opacity-10 blur-xl",kpi.iconBg)}/>
            <div className="mb-3 flex items-start justify-between">
              <span className="text-sm font-medium text-gray-500 dark:text-dark-6">{kpi.label}</span>
              <div className={cn("flex h-10 w-10 items-center justify-center rounded-xl",kpi.iconBg,kpi.color)}>{ICONS[kpi.key]}</div>
            </div>
            <div className="text-3xl font-bold text-dark dark:text-white">{kpi.count.toLocaleString()}</div>
            <div className={cn("mt-1.5 flex items-center gap-1 text-xs font-semibold",good?"text-green-600 dark:text-green-400":"text-red-500 dark:text-red-400")}>
              {up
                ?<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><polyline points="23 6 13.5 15.5 8.5 10.5 1 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="17 6 23 6 23 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                :<svg width="12" height="12" viewBox="0 0 24 24" fill="none"><polyline points="23 18 13.5 8.5 8.5 13.5 1 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/><polyline points="17 18 23 18 23 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              }
              <span>{up?"+":"-"}{pct}%</span>
              <span className="font-normal text-gray-400 dark:text-dark-6">o'tgan oyga</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
