"use client";

import { CHART_PERIODS } from "@/data/admin-dashboard";
import { cn } from "@/lib/utils";
import type { AdminDashboardResponse } from "@/types/dashboard";
import type { ApexOptions } from "apexcharts";
import dynamic from "next/dynamic";
import { useState } from "react";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

interface Props {
  stats?: AdminDashboardResponse;
}

const EMPTY_ANALYTICS_DATA = {
  daily: { categories: ["Du", "Se", "Ch", "Pa", "Ju", "Sh", "Ya"], nearmiss: [0, 0, 0, 0, 0, 0, 0], observation: [0, 0, 0, 0, 0, 0, 0], accident: [0, 0, 0, 0, 0, 0, 0], incident: [0, 0, 0, 0, 0, 0, 0] },
  weekly: { categories: ["1-hafta", "2-hafta", "3-hafta", "4-hafta"], nearmiss: [0, 0, 0, 0], observation: [0, 0, 0, 0], accident: [0, 0, 0, 0], incident: [0, 0, 0, 0] },
  monthly: { categories: ["Todo", "Jarayonda", "Tekshiruvda", "Yakunlangan"], nearmiss: [0, 0, 0, 0], observation: [0, 0, 0, 0], accident: [0, 0, 0, 0], incident: [0, 0, 0, 0] },
  yearly: { categories: ["Joriy yil"], nearmiss: [0], observation: [0], accident: [0], incident: [0] },
};

function buildAnalyticsData(stats?: AdminDashboardResponse): typeof EMPTY_ANALYTICS_DATA {
  if (!stats) return EMPTY_ANALYTICS_DATA;
  const todo = stats.tasksByStatus?.TODO || 0;
  const progress = stats.tasksByStatus?.IN_PROGRESS || 0;
  const review = stats.tasksByStatus?.REVIEW || 0;
  const done = stats.tasksByStatus?.DONE || 0;

  return {
    ...EMPTY_ANALYTICS_DATA,
    monthly: {
      categories: ["Todo", "Jarayonda", "Tekshiruvda", "Yakunlangan"],
      nearmiss: [todo, 0, 0, 0],
      observation: [0, progress, 0, 0],
      accident: [0, 0, review, 0],
      incident: [0, 0, 0, done],
    },
    yearly: {
      categories: ["Xodimlar", "Faol", "Vazifalar", "Hodisalar"],
      nearmiss: [stats.totalEmployees || 0, 0, 0, 0],
      observation: [0, stats.activeEmployees || 0, 0, 0],
      accident: [0, 0, stats.activeTasks || 0, 0],
      incident: [0, 0, 0, stats.openIncidents || 0],
    },
  };
}

export function AdminAnalyticsChart({ stats }: Props) {
  const [period, setPeriod] = useState<keyof typeof EMPTY_ANALYTICS_DATA>("monthly");
  const data = buildAnalyticsData(stats)[period];

  const options: ApexOptions = {
    chart: {
      type: "bar",
      stacked: true,
      height: 300,
      toolbar: { show: false },
      fontFamily: "inherit",
      animations: { enabled: true, speed: 500, dynamicAnimation: { enabled: true, speed: 350 } },
    },
    colors: ["#F97316", "#0EA5E9", "#EF4444", "#8B5CF6"],
    plotOptions: {
      bar: { horizontal: false, columnWidth: "50%", borderRadius: 3, borderRadiusApplication: "end" },
    },
    dataLabels: { enabled: false },
    stroke: { show: false },
    grid: {
      strokeDashArray: 5,
      borderColor: "rgba(0,0,0,0.06)",
      yaxis: { lines: { show: true } },
      xaxis: { lines: { show: false } },
    },
    xaxis: {
      categories: data.categories,
      axisBorder: { show: false },
      axisTicks: { show: false },
      labels: { style: { fontSize: "11px", fontFamily: "inherit", colors: "#9ca3af" } },
    },
    yaxis: {
      labels: {
        style: { fontSize: "11px", fontFamily: "inherit", colors: "#9ca3af" },
        formatter: (v) => String(Math.round(v)),
      },
    },
    legend: {
      show: true,
      position: "top",
      horizontalAlign: "right",
      fontSize: "12px",
      fontFamily: "inherit",
      fontWeight: 500,
      markers: { size: 7 },
      itemMargin: { horizontal: 10 },
    },
    tooltip: {
      shared: true,
      intersect: false,
      y: { formatter: (v) => `${v} ta` },
      style: { fontSize: "12px", fontFamily: "inherit" },
    },
    fill: { opacity: 0.9 },
    responsive: [{ breakpoint: 640, options: { chart: { height: 240 }, plotOptions: { bar: { columnWidth: "65%" } } } }],
  };

  const series = [
    { name: "Near Miss",   data: data.nearmiss    },
    { name: "Observation", data: data.observation },
    { name: "Accident",    data: data.accident    },
    { name: "Incident",    data: data.incident    },
  ];

  return (
    <div className="rounded-xl border border-stroke bg-white p-5 shadow-sm dark:border-dark-3 dark:bg-gray-dark">
      {/* Header */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h2 className="text-base font-bold text-dark dark:text-white">Hisobotlar tahlili</h2>
          <p className="mt-0.5 text-xs text-gray-500 dark:text-dark-6">
            Kategoriyalar bo'yicha dinamika
          </p>
        </div>
        {/* Period switcher */}
        <div className="flex items-center gap-1 rounded-lg border border-stroke bg-gray-50 p-1 dark:border-dark-3 dark:bg-dark-2">
          {CHART_PERIODS.map(p => (
            <button
              key={p.key}
              onClick={() => setPeriod(p.key as keyof typeof EMPTY_ANALYTICS_DATA)}
              className={cn(
                "rounded-md px-3 py-1.5 text-xs font-medium transition",
                period === p.key
                  ? "bg-white text-dark shadow-sm dark:bg-gray-dark dark:text-white"
                  : "text-gray-400 hover:text-dark dark:text-dark-6 dark:hover:text-white",
              )}
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      <div className="-mx-1">
        <Chart options={options} series={series} type="bar" height={300} />
      </div>

      {/* Summary row */}
      <div className="mt-3 grid grid-cols-2 gap-2 border-t border-stroke pt-3 dark:border-dark-3 sm:grid-cols-4">
        {[
          { label: "Near Miss",   val: data.nearmiss.reduce((a, b) => a + b, 0),    color: "text-orange-500", bg: "bg-orange-100 dark:bg-orange-900/20" },
          { label: "Observation", val: data.observation.reduce((a, b) => a + b, 0), color: "text-sky-500",    bg: "bg-sky-100 dark:bg-sky-900/20"       },
          { label: "Accident",    val: data.accident.reduce((a, b) => a + b, 0),    color: "text-red-500",    bg: "bg-red-100 dark:bg-red-900/20"       },
          { label: "Incident",    val: data.incident.reduce((a, b) => a + b, 0),    color: "text-violet-500", bg: "bg-violet-100 dark:bg-violet-900/20" },
        ].map(s => (
          <div key={s.label} className={cn("flex items-center gap-2 rounded-lg px-3 py-2", s.bg)}>
            <span className={cn("text-lg font-bold", s.color)}>{s.val}</span>
            <span className="text-xs text-gray-500 dark:text-dark-6">{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
