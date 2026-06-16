"use client";

import { STAFF_DATA } from "@/data/dashboard";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";

const Chart = dynamic(()=>import("react-apexcharts"),{ssr:false});

export function StaffDonutChart(){
  const total=STAFF_DATA.reduce((s,d)=>s+d.amount,0);

  const options:ApexOptions={
    chart:{type:"donut",fontFamily:"inherit",animations:{enabled:true,speed:600}},
    colors:["#5750F1","#22C55E"],
    labels:STAFF_DATA.map(d=>d.name),
    legend:{show:true,position:"bottom",horizontalAlign:"center",fontSize:"13px",fontFamily:"inherit",fontWeight:500,itemMargin:{horizontal:12,vertical:6},
      formatter:(name,opts)=>{
        const pct=(opts.w.globals.seriesPercent[opts.seriesIndex][0] as number).toFixed(1);
        return `${name} (${pct}%)`;
      }},
    plotOptions:{pie:{donut:{size:"78%",background:"transparent",labels:{show:true,
      name:{show:true,fontSize:"14px",fontFamily:"inherit",color:"#9ca3af",offsetY:-4},
      value:{show:true,fontSize:"32px",fontFamily:"inherit",fontWeight:"700",offsetY:8,formatter:v=>v},
      total:{show:true,showAlways:true,label:"Total Users",fontSize:"13px",fontFamily:"inherit",fontWeight:400,color:"#9ca3af",formatter:()=>String(total)},
    }}}},
    dataLabels:{enabled:false},
    stroke:{width:3,colors:["transparent"]},
    tooltip:{style:{fontSize:"13px",fontFamily:"inherit"},y:{formatter:(v,opts)=>{
      const pct=(opts.w.globals.seriesPercent[opts.seriesIndex][0] as number).toFixed(1);
      return `${v} kishi (${pct}%)`;
    }}},
    responsive:[{breakpoint:480,options:{chart:{width:"100%"}}}],
  };

  return(
    <div className="rounded-xl border border-stroke bg-white p-6 shadow-sm dark:border-dark-3 dark:bg-gray-dark">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-dark dark:text-white">Hodimlar statistikasi</h2>
        <p className="mt-0.5 text-sm text-gray-500 dark:text-dark-6">Ishchilar va adminlar nisbati</p>
      </div>
      <div className="mb-4 flex items-center justify-center gap-4">
        {STAFF_DATA.map((d,i)=>(
          <div key={d.name} className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-2 dark:bg-dark-2">
            <span className="h-3 w-3 rounded-full" style={{backgroundColor:i===0?"#5750F1":"#22C55E"}}/>
            <span className="text-xs text-gray-500 dark:text-dark-6">{d.name}</span>
            <span className="text-sm font-bold text-dark dark:text-white">{d.amount}</span>
          </div>
        ))}
      </div>
      <div className="flex justify-center">
        <Chart options={options} series={STAFF_DATA.map(d=>d.amount)} type="donut" width={320}/>
      </div>
    </div>
  );
}
