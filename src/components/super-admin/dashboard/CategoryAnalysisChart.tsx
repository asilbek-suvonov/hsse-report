"use client";

import { CATEGORY_ANALYSIS_DATA } from "@/data/dashboard";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(()=>import("react-apexcharts"),{ssr:false});

export function CategoryAnalysisChart(){
  const options:ApexOptions={
    chart:{type:"bar",height:300,toolbar:{show:false},fontFamily:"inherit",animations:{enabled:true,speed:500}},
    colors:["#F97316","#0EA5E9","#EF4444","#8B5CF6"],
    plotOptions:{bar:{horizontal:false,columnWidth:"55%",borderRadius:3,borderRadiusApplication:"end"}},
    dataLabels:{enabled:false},
    stroke:{show:false},
    grid:{strokeDashArray:5,borderColor:"rgba(0,0,0,0.06)",yaxis:{lines:{show:true}},xaxis:{lines:{show:false}}},
    xaxis:{categories:CATEGORY_ANALYSIS_DATA.map(d=>d.status),axisBorder:{show:false},axisTicks:{show:false},labels:{style:{fontSize:"11px",fontFamily:"inherit",colors:"#9ca3af"}}},
    yaxis:{labels:{style:{fontSize:"11px",fontFamily:"inherit",colors:"#9ca3af"},formatter:v=>String(Math.round(v))}},
    legend:{show:true,position:"top",horizontalAlign:"right",fontSize:"12px",fontFamily:"inherit",fontWeight:500,markers:{size:7},itemMargin:{horizontal:10}},
    tooltip:{shared:false,intersect:true,y:{formatter:v=>`${v} ta`},style:{fontSize:"12px",fontFamily:"inherit"}},
    fill:{opacity:0.9},
    responsive:[{breakpoint:640,options:{chart:{height:260},legend:{position:"bottom",horizontalAlign:"center"}}}],
  };

  return(
    <div className="rounded-xl border border-stroke bg-white p-6 shadow-sm dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-1">
        <h2 className="text-lg font-bold text-dark dark:text-white">Kategoriya tahlili</h2>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-dark-6">Har bir kategoriya bo'yicha holat statistikasi</p>
      </div>
      <div className="-mx-2">
        <Chart
          options={options}
          series={[
            {name:"Near Miss",   data:CATEGORY_ANALYSIS_DATA.map(d=>d.nearmiss)},
            {name:"Observation", data:CATEGORY_ANALYSIS_DATA.map(d=>d.observation)},
            {name:"Accident",    data:CATEGORY_ANALYSIS_DATA.map(d=>d.accident)},
            {name:"Incident",    data:CATEGORY_ANALYSIS_DATA.map(d=>d.incident)},
          ]}
          type="bar" height={300}
        />
      </div>
    </div>
  );
}
