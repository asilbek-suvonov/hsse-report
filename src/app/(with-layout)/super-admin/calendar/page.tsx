"use client";

import { CalendarFilterBar, EMPTY_CAL_FILTERS } from "@/components/super-admin/calendar/CalendarFilters";
import { CalendarGrid }     from "@/components/super-admin/calendar/CalendarGrid";
import { CalendarKpiCards } from "@/components/super-admin/calendar/CalendarKpiCards";
import { DayDetailDrawer }  from "@/components/super-admin/calendar/DayDetailDrawer";
import { useCalendarEvents } from "@/hooks/useCalendar";
import { mapCalendarEventsToDays } from "@/lib/calendar-adapters";
import { cn } from "@/lib/utils";
import { CalendarFilters, DayData } from "@/types/calendar";
import Link from "next/link";
import { useMemo, useState } from "react";

const MONTHS=["Yanvar","Fevral","Mart","Aprel","May","Iyun","Iyul","Avgust","Sentabr","Oktabr","Noyabr","Dekabr"];

export default function SuperAdminCalendarPage(){
  const today=new Date();
  const [year,setYear]=useState(today.getFullYear());
  const [month,setMonth]=useState(today.getMonth());
  const [filters,setFilters]=useState<CalendarFilters>(EMPTY_CAL_FILTERS);
  const [selectedDay,setSelectedDay]=useState<DayData|null>(null);
  const [dateFrom,setDateFrom]=useState("");
  const [dateTo,setDateTo]=useState("");
  const { data: events = [], isLoading, isFetching, refetch } = useCalendarEvents({ year, month: month + 1 });
  const rawData = useMemo(() => mapCalendarEventsToDays(events, year, month), [events, year, month]);

  const prevMonth=()=>{ if(month===0){setYear(y=>y-1);setMonth(11);}else setMonth(m=>m-1); };
  const nextMonth=()=>{ if(month===11){setYear(y=>y+1);setMonth(0);}else setMonth(m=>m+1); };
  const goToday  =()=>{ setYear(today.getFullYear()); setMonth(today.getMonth()); };

  const filteredData=useMemo(()=>{
    if(!filters.reportType.length&&!filters.severity.length&&!filters.status.length&&!filters.department.length) return rawData;
    return rawData.map(d=>{
      const reports=d.reports.filter(r=>
        (filters.reportType.length===0||filters.reportType.includes(r.type))&&
        (filters.severity.length===0||filters.severity.includes(r.severity))&&
        (filters.status.length===0||filters.status.includes(r.status))&&
        (filters.department.length===0||filters.department.some(dep=>r.department.toLowerCase().includes(dep)))
      );
      return{...d,
        nearmiss:   reports.filter(r=>r.type==="nearmiss").length,
        observation:reports.filter(r=>r.type==="observation").length,
        accident:   reports.filter(r=>r.type==="accident").length,
        incident:   reports.filter(r=>r.type==="incident").length,
        reports,
      };
    });
  },[rawData,filters]);

  return(
    <>
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <nav className="mb-1 flex items-center gap-1.5 text-xs text-gray-400 dark:text-dark-6">
              <Link href="/super-admin/dashboard" className="transition hover:text-primary">Dashboard</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="font-medium text-dark dark:text-white">Kalendar</span>
            </nav>
            <h1 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">Calendar Dashboard</h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-dark-6">Hodisalarni kunlar kesimida kuzatish</p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1.5">
              <input type="date" value={dateFrom} onChange={e=>setDateFrom(e.target.value)}
                className="h-9 w-36 rounded-lg border border-stroke bg-white px-2 text-xs text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white sm:px-3 sm:text-sm sm:w-auto"/>
              <span className="text-gray-400">—</span>
              <input type="date" value={dateTo} onChange={e=>setDateTo(e.target.value)}
                className="h-9 w-36 rounded-lg border border-stroke bg-white px-2 text-xs text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-gray-dark dark:text-white sm:px-3 sm:text-sm sm:w-auto"/>
            </div>
            {[
              {title:"Export",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>},
              {title:"Yangilash",icon:<svg width="15" height="15" viewBox="0 0 24 24" fill="none" className={isFetching ? "animate-spin" : ""}><polyline points="23 4 23 10 17 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M20.49 15a9 9 0 11-2.12-9.36L23 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>,onClick:()=>void refetch()},
            ].map(btn=>(
              <button key={btn.title} onClick={btn.onClick} title={btn.title} aria-label={btn.title}
                className="flex h-9 w-9 items-center justify-center rounded-lg border border-stroke bg-white text-gray-500 transition hover:border-primary/60 hover:text-primary dark:border-dark-3 dark:bg-gray-dark dark:text-dark-6">
                {btn.icon}
              </button>
            ))}
          </div>
        </div>

        {/* KPI */}
        <CalendarKpiCards loading={isLoading} data={filteredData}/>

        {/* Filters + month nav */}
        <div className="flex flex-col gap-3 rounded-xl border border-stroke bg-white p-4 shadow-sm dark:border-dark-3 dark:bg-gray-dark sm:flex-row sm:items-center sm:justify-between">
          <CalendarFilterBar filters={filters} onChange={setFilters} onReset={()=>setFilters(EMPTY_CAL_FILTERS)}/>

          <div className="flex shrink-0 items-center gap-2">
            <button onClick={prevMonth} className="flex h-8 w-8 items-center justify-center rounded-lg border border-stroke bg-white transition hover:bg-gray-50 dark:border-dark-3 dark:bg-gray-dark dark:hover:bg-dark-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <div className="flex items-baseline gap-1.5">
              <span className="min-w-[90px] text-center text-sm font-bold text-dark dark:text-white">{MONTHS[month]}</span>
              <span className="text-sm text-gray-400 dark:text-dark-6">{year}</span>
            </div>
            <button onClick={nextMonth} className="flex h-8 w-8 items-center justify-center rounded-lg border border-stroke bg-white transition hover:bg-gray-50 dark:border-dark-3 dark:bg-gray-dark dark:hover:bg-dark-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
            </button>
            <button onClick={goToday}
              className={cn("ml-1 h-8 rounded-lg border px-3 text-xs font-medium transition",
                year===today.getFullYear()&&month===today.getMonth()
                  ?"border-primary bg-primary text-white"
                  :"border-stroke bg-white text-dark hover:bg-gray-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white dark:hover:bg-dark-2")}>
              Bugun
            </button>
          </div>
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-4 text-xs text-gray-500 dark:text-dark-6">
          {[
            {dot:"bg-gray-200 dark:bg-dark-3",label:"Empty — ma'lumot yo'q"},
            {dot:"bg-green-400",              label:"Normal"},
            {dot:"bg-amber-400",              label:"Warning — diqqat talab qiladi"},
            {dot:"bg-red-500",                label:"Critical — muhim xavf"},
          ].map(({dot,label})=>(
            <div key={label} className="flex items-center gap-1.5">
              <span className={cn("h-2.5 w-2.5 rounded-full",dot)}/>
              {label}
            </div>
          ))}
        </div>

        {/* Grid */}
        <CalendarGrid year={year} month={month} data={filteredData} loading={isLoading} onDayClick={setSelectedDay}/>
      </div>

      <DayDetailDrawer day={selectedDay} onClose={()=>setSelectedDay(null)}/>
    </>
  );
}
