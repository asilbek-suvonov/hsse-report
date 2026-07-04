"use client";

import { CategoryAnalysisChart }  from "@/components/super-admin/dashboard/CategoryAnalysisChart";
import { EMPTY_FILTERS, FilterPanel, type DashboardFilters } from "@/components/super-admin/dashboard/FilterPanel";
import { KpiCards }               from "@/components/super-admin/dashboard/KpiCards";
import { ReportsCountChart }      from "@/components/super-admin/dashboard/ReportsCountChart";
import { StaffDonutChart }        from "@/components/super-admin/dashboard/StaffDonutChart";
import { useState } from "react";

export default function SuperAdminDashboardPage(){
  const [filters,setFilters]=useState<DashboardFilters>(EMPTY_FILTERS);
  const [loading,setLoading]=useState(false);

  const handleSearch=()=>{ setLoading(true); setTimeout(()=>setLoading(false),800); };
  const handleReset =()=>{ setFilters(EMPTY_FILTERS); setLoading(true); setTimeout(()=>setLoading(false),400); };

  return(
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">Super Admin Dashboard</h1>
        <p className="mt-1 text-sm text-gray-500 dark:text-dark-6">HSSE hisobot va hodisalar umumiy statistikasi</p>
      </div>

      <FilterPanel filters={filters} onChange={setFilters} onSearch={handleSearch} onReset={handleReset}/>

      <KpiCards loading={loading}/>

      <ReportsCountChart/>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3"><CategoryAnalysisChart/></div>
        <div className="xl:col-span-2"><StaffDonutChart/></div>
      </div>
    </div>
  );
}
