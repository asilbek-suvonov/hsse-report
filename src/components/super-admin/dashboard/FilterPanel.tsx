"use client";

import { FILTER_OPTIONS } from "@/data/dashboard";
import { useClickOutside } from "@/hooks/use-click-outside";
import { cn } from "@/lib/utils";
import { useCallback, useState } from "react";

export interface DashboardFilters {
  reportType: string[];
  reportCategory: string[];
  riskCategory: string[];
  severity: string[];
  department: string[];
  dateFrom: string;
  dateTo: string;
}

export const EMPTY_FILTERS: DashboardFilters = {
  reportType:[],reportCategory:[],riskCategory:[],
  severity:[],department:[],dateFrom:"",dateTo:"",
};

function MultiSelect({
  label, options, selected, onChange, icon,
}:{
  label:string;
  options:{value:string;label:string}[];
  selected:string[];
  onChange:(v:string[])=>void;
  icon:React.ReactNode;
}) {
  const [open,setOpen]=useState(false);
  const ref=useClickOutside<HTMLDivElement>(useCallback(()=>setOpen(false),[]));
  const toggle=(v:string)=>onChange(selected.includes(v)?selected.filter(x=>x!==v):[...selected,v]);
  const display=selected.length===0?label:selected.length===1?(options.find(o=>o.value===selected[0])?.label??label):`${selected.length} ta tanlandi`;

  return(
    <div ref={ref} className="relative min-w-[170px]">
      <button
        type="button"
        onClick={()=>setOpen(p=>!p)}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg border bg-white px-3.5 py-2.5 text-sm transition dark:bg-gray-dark",
          open?"border-primary dark:border-primary":"border-stroke hover:border-primary/60 dark:border-dark-3",
          selected.length>0?"font-medium text-dark dark:text-white":"text-gray-400 dark:text-dark-6",
        )}
      >
        <span className="shrink-0 text-gray-400">{icon}</span>
        <span className="flex-1 truncate text-left">{display}</span>
        {selected.length>0&&(
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-primary px-1 text-[10px] font-bold text-white">
            {selected.length}
          </span>
        )}
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
          className={cn("shrink-0 text-gray-400 transition-transform",open&&"rotate-180")}>
          <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
        </svg>
      </button>

      {open&&(
        <div className="absolute left-0 top-full z-50 mt-1.5 w-56 overflow-hidden rounded-xl border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
          <div className="px-2 py-1.5">
            {options.map(opt=>{
              const checked=selected.includes(opt.value);
              return(
                <label key={opt.value} className="flex cursor-pointer items-center gap-3 rounded-lg px-2.5 py-2 transition hover:bg-gray-50 dark:hover:bg-dark-2">
                  <div className={cn("flex h-4 w-4 shrink-0 items-center justify-center rounded border-[1.5px] transition",
                    checked?"border-primary bg-primary":"border-stroke dark:border-dark-4")}>
                    {checked&&<svg width="9" height="7" viewBox="0 0 9 7" fill="none"><path d="M1 3.5l2.5 2.5 4.5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>}
                  </div>
                  <input type="checkbox" className="sr-only" checked={checked} onChange={()=>toggle(opt.value)}/>
                  <span className="text-sm text-dark dark:text-white">{opt.label}</span>
                </label>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

interface Props {
  filters: DashboardFilters;
  onChange: (f:DashboardFilters)=>void;
  onSearch: ()=>void;
  onReset: ()=>void;
}

export function FilterPanel({filters,onChange,onSearch,onReset}:Props){
  const set=<K extends keyof DashboardFilters>(k:K,v:DashboardFilters[K])=>onChange({...filters,[k]:v});
  const hasFilters=Object.values(filters).some(v=>Array.isArray(v)?v.length>0:Boolean(v));

  const iconProps={stroke:"currentColor",strokeWidth:"1.5",fill:"none"};

  return(
    <div className="rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-gray-dark">
      <div className="flex flex-wrap items-end gap-3">
        <MultiSelect label="Report turi" options={FILTER_OPTIONS.reportType} selected={filters.reportType}
          onChange={v=>set("reportType",v)}
          icon={<svg width="14" height="14" viewBox="0 0 24 24" {...iconProps}><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6z" strokeLinejoin="round"/><polyline points="14 2 14 8 20 8" strokeLinejoin="round"/></svg>}
        />
        <MultiSelect label="Hisobot turi" options={FILTER_OPTIONS.reportCategory} selected={filters.reportCategory}
          onChange={v=>set("reportCategory",v)}
          icon={<svg width="14" height="14" viewBox="0 0 24 24" {...iconProps}><path d="M4 6h16M4 12h16M4 18h7" strokeLinecap="round"/></svg>}
        />
        <MultiSelect label="Xavf toifalari" options={FILTER_OPTIONS.riskCategory} selected={filters.riskCategory}
          onChange={v=>set("riskCategory",v)}
          icon={<svg width="14" height="14" viewBox="0 0 24 24" {...iconProps}><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" strokeLinejoin="round"/><line x1="12" y1="9" x2="12" y2="13" strokeLinecap="round"/><line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round"/></svg>}
        />
        <MultiSelect label="Muhimlik" options={FILTER_OPTIONS.severity} selected={filters.severity}
          onChange={v=>set("severity",v)}
          icon={<svg width="14" height="14" viewBox="0 0 24 24" {...iconProps}><polyline points="22 12 18 12 15 21 9 3 6 12 2 12" strokeLinecap="round" strokeLinejoin="round"/></svg>}
        />
        <MultiSelect label="Ishchi bo'lim" options={FILTER_OPTIONS.department} selected={filters.department}
          onChange={v=>set("department",v)}
          icon={<svg width="14" height="14" viewBox="0 0 24 24" {...iconProps}><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinejoin="round"/></svg>}
        />

        {/* Date range */}
        <div className="flex items-center gap-2">
          <input type="date" value={filters.dateFrom} onChange={e=>set("dateFrom",e.target.value)}
            className="h-10 rounded-lg border border-stroke bg-white px-3 text-sm text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"/>
          <span className="text-gray-400">—</span>
          <input type="date" value={filters.dateTo} onChange={e=>set("dateTo",e.target.value)}
            className="h-10 rounded-lg border border-stroke bg-white px-3 text-sm text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white"/>
        </div>

        <div className="hidden h-10 w-px bg-stroke dark:bg-dark-3 sm:block"/>

        <div className="flex items-center gap-2">
          {hasFilters&&(
            <button onClick={onReset}
              className="flex items-center gap-1.5 rounded-lg border border-stroke px-4 py-2.5 text-sm font-medium text-dark transition hover:bg-gray-50 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none"><path d="M3 6h18M8 6V4h8v2M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              Tozalash
            </button>
          )}
          <button onClick={onSearch}
            className="flex items-center gap-1.5 rounded-lg bg-primary px-5 py-2.5 text-sm font-medium text-white transition hover:bg-opacity-90">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
            Qidirish
          </button>
        </div>
      </div>
    </div>
  );
}
