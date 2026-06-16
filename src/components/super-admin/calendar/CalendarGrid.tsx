"use client";

import { cn } from "@/lib/utils";
import { DayData } from "@/types/calendar";
import { DayCell, DayCellSkeleton } from "./DayCell";

const WEEK_DAYS=["Dush","Sesh","Chor","Pay","Juma","Shan","Yak"];

interface Props{year:number;month:number;data:DayData[];loading:boolean;onDayClick:(d:DayData)=>void;}

export function CalendarGrid({year,month,data,loading,onDayClick}:Props){
  const firstDow=(new Date(year,month,1).getDay()+6)%7;
  const todayStr=new Date().toISOString().slice(0,10);
  const cells:(DayData|null)[]=[...Array(firstDow).fill(null),...data];
  while(cells.length%7!==0)cells.push(null);

  return(
    <div className="rounded-2xl border border-stroke bg-white shadow-sm dark:border-dark-3 dark:bg-gray-dark">
      <div className="grid grid-cols-7 border-b border-stroke dark:border-dark-3">
        {WEEK_DAYS.map((d,i)=>(
          <div key={d} className={cn("px-3 py-3 text-center text-xs font-semibold uppercase tracking-wide",
            i>=5?"text-red-400 dark:text-red-500":"text-gray-500 dark:text-dark-6")}>
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1.5 p-2">
        {loading
          ?Array(35).fill(null).map((_,i)=><DayCellSkeleton key={i}/>)
          :cells.map((cell,i)=><DayCell key={i} day={cell} isToday={cell?.date===todayStr} onClick={onDayClick}/>)
        }
      </div>
    </div>
  );
}
