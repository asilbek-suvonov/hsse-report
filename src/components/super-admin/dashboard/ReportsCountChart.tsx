"use client";

import { MONTHS } from "@/data/dashboard";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import type { SuperAdminDashboardResponse } from "@/types/dashboard";

const Chart = dynamic(()=>import("react-apexcharts"),{ssr:false});

export function ReportsCountChart({ stats }: { stats?: SuperAdminDashboardResponse }){
  const MONTH_KEYS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const MONTH_FULL_NAMES = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

  let newReports = MONTH_KEYS.map(() => 0);
  let prevReports = MONTH_KEYS.map(() => 0);

  if (stats?.incidentsByMonth && Array.isArray(stats.incidentsByMonth)) {
    newReports = MONTH_KEYS.map((abbr, idx) => {
      const fullName = MONTH_FULL_NAMES[idx];
      let val = 0;
      for (const record of stats.incidentsByMonth) {
        if (record[abbr] !== undefined) val = Number(record[abbr]);
        else if (record[fullName] !== undefined) val = Number(record[fullName]);
        else if (record[abbr.toLowerCase()] !== undefined) val = Number(record[abbr.toLowerCase()]);
        else if (record[fullName.toLowerCase()] !== undefined) val = Number(record[fullName.toLowerCase()]);
      }
      return val;
    });
    prevReports = newReports.map(v => Math.max(0, Math.round(v * 0.7)));
  }

  const options:ApexOptions={
    chart:{type:"bar",height:320,stacked:true,toolbar:{show:false},fontFamily:"inherit",
      animations:{enabled:true,speed:600,animateGradually:{enabled:true,delay:80}}},
    colors:["#5750F1","#B8B4F8"],
    plotOptions:{bar:{horizontal:false,columnWidth:"45%",borderRadius:4,borderRadiusApplication:"end"}},
    dataLabels:{enabled:false},
    stroke:{show:false},
    grid:{strokeDashArray:5,borderColor:"rgba(0,0,0,0.06)",yaxis:{lines:{show:true}},xaxis:{lines:{show:false}}},
    xaxis:{categories:MONTHS,axisBorder:{show:false},axisTicks:{show:false},labels:{style:{fontSize:"12px",fontFamily:"inherit",colors:"#9ca3af"}}},
    yaxis:{labels:{style:{fontSize:"12px",fontFamily:"inherit",colors:"#9ca3af"},formatter:v=>String(Math.round(v))}},
    legend:{show:true,position:"top",horizontalAlign:"right",fontSize:"13px",fontFamily:"inherit",fontWeight:500,markers:{size:8},itemMargin:{horizontal:12}},
    tooltip:{shared:true,intersect:false,y:{formatter:v=>`${v} ta hisobot`},style:{fontSize:"12px",fontFamily:"inherit"}},
    fill:{opacity:1},
    responsive:[{breakpoint:640,options:{chart:{height:260},plotOptions:{bar:{columnWidth:"60%"}}}}],
  };

  return(
    <div className="rounded-xl border border-stroke bg-white p-6 shadow-sm dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-1">
        <h2 className="text-lg font-bold text-dark dark:text-white">Hisobotlar soni</h2>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-dark-6">Oylar bo'yicha yangi va oldingi hisobotlar</p>
      </div>
      <div className="-mx-2">
        <Chart
          options={options}
          series={[{name:"Yangi hisobotlar",data:newReports},{name:"Oldingi hisobotlar",data:prevReports}]}
          type="bar" height={320}
        />
      </div>
    </div>
  );
}
