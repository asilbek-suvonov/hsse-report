"use client";

import { CALENDAR_FILTER_OPTIONS } from "@/data/calendar";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { CalendarFilters } from "@/types/calendar";
import { useCallback, useState } from "react";

export const EMPTY_CAL_FILTERS: CalendarFilters = {
  reportType:[],riskCategory:[],department:[],severity:[],status:[],
};

function Chip({label,options,selected,onChange}:{
  label:string;options:{value:string;label:string}[];selected:string[];onChange:(v:string[])=>void;
}){
  const [open,setOpen]=useState(false);
  const ref=useClickOutside<HTMLDivElement>(useCallback(()=>setOpen(false),[]));
  const toggle=(v:string)=>onChange(selected.includes(v)?selected.filter(x=>x!==v):[...selected,v]);

  return(
    <div ref={ref} className="relative">
      <button type="button" onClick={()=>setOpen(p=>!p)}
        className={cn("flex h-9 items-center gap-1.5 rounded-lg border px-3 text-sm font-medium transition-all",
          selected.length>0?"border-primary bg-primary/5 text-primary dark:bg-primary/10":"border-stroke bg-white text-gray-500 hover:border-primary/60 hover:text-dark dark:border-dark-3 dark:bg-gray-dark dark:text-dark-6 dark:hover:text-white")}>
        {label}
        {selected.length>0&&<span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">{selected.length}</span>}
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" className={cn("shrink-0 text-gray-400 transition-transform",open&&"rotate-180")}><path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
      </button>

      {open&&(
        <div className="absolute left-0 top-full z-50 mt-1.5 w-52 overflow-hidden rounded-xl border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
          <div className="px-2 py-1.5">
            {options.map(opt=>{
              const checked=selected.includes(opt.value);
              return(
                <label key={opt.value} className="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 transition hover:bg-gray-50 dark:hover:bg-dark-2">
                  <div className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded border-[1.5px] transition",checked?"border-primary bg-primary":"border-stroke dark:border-dark-4")}>
                    {checked&&<svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <input type="checkbox" className="sr-only" checked={checked} onChange={()=>toggle(opt.value)}/>
                  <span className="text-sm text-dark dark:text-white">{opt.label}</span>
                </label>
              );
            })}
          </div>
          {selected.length>0&&<div className="border-t border-stroke px-3 py-2 dark:border-dark-3"><button onClick={()=>onChange([])} className="text-xs text-gray-400 hover:text-red-500 transition">Tozalash</button></div>}
        </div>
      )}
    </div>
  );
}

interface Props{filters:CalendarFilters;onChange:(f:CalendarFilters)=>void;onReset:()=>void;}

export function CalendarFilterBar({filters,onChange,onReset}:Props){
  const set=<K extends keyof CalendarFilters>(k:K,v:CalendarFilters[K])=>onChange({...filters,[k]:v});
  const hasAny=Object.values(filters).some(v=>v.length>0);

  return(
    <div className="flex flex-wrap items-center gap-2">
      <Chip label="Report turi"  options={CALENDAR_FILTER_OPTIONS.reportType}   selected={filters.reportType}   onChange={v=>set("reportType",v as CalendarFilters["reportType"])}/>
      <Chip label="Xavf toifasi" options={CALENDAR_FILTER_OPTIONS.riskCategory} selected={filters.riskCategory} onChange={v=>set("riskCategory",v)}/>
      <Chip label="Ishchi bo'lim"options={CALENDAR_FILTER_OPTIONS.department}   selected={filters.department}   onChange={v=>set("department",v)}/>
      <Chip label="Muhimlik"     options={CALENDAR_FILTER_OPTIONS.severity}     selected={filters.severity}     onChange={v=>set("severity",v as CalendarFilters["severity"])}/>
      <Chip label="Status"       options={CALENDAR_FILTER_OPTIONS.status}       selected={filters.status}       onChange={v=>set("status",v as CalendarFilters["status"])}/>
      {hasAny&&(
        <button onClick={onReset} className="flex h-9 items-center gap-1.5 rounded-lg px-3 text-sm text-gray-400 transition hover:text-red-500 dark:text-dark-6">
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          Tozalash
        </button>
      )}
    </div>
  );
}
