"use client";

import { ALL_PERMISSIONS } from "@/data/employees";
import { cn } from "@/lib/utils";
import { Employee } from "@/types/employee";
import Image from "next/image";
import { useEffect } from "react";

interface Props { employee: Employee | null; onClose: () => void; onEdit: (e: Employee) => void; }


const ROLE_LABELS: Record<string, string> = {
  super_admin: "Super Admin", admin: "Admin", manager: "Manager", employee: "Employee",
};

const EMP_TYPE_LABELS: Record<string, string> = {
  full_time: "Full Time", part_time: "Part Time", contract: "Contract",
};

function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between border-b border-stroke py-2.5 last:border-0 dark:border-dark-3">
      <span className="text-xs text-gray-400 dark:text-dark-6">{label}</span>
      <span className="text-right text-xs font-medium text-dark dark:text-white">{value}</span>
    </div>
  );
}

export function EmployeeDetailDrawer({ employee, onClose, onEdit }: Props) {
  const open = Boolean(employee);
  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  return (
    <>
      <div onClick={onClose}
        className={cn("fixed inset-0 z-9600 bg-black/40 backdrop-blur-[2px] transition-all duration-300", open ? "opacity-100" : "pointer-events-none opacity-0")}
        aria-hidden="true" />

      <aside role="dialog" aria-modal="true"
        className={cn("fixed right-0 top-0 z-9700 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-gray-dark sm:max-w-[480px]",
          open ? "translate-x-0" : "translate-x-full")}>

        <div className="flex items-center justify-between border-b border-stroke px-6 py-4 dark:border-dark-3">
          <h2 className="text-base font-bold text-dark dark:text-white">Xodim ma'lumotlari</h2>
          <button onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-dark dark:hover:bg-dark-2 dark:hover:text-white">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
          </button>
        </div>

        {employee && (
          <div className="flex flex-1 flex-col overflow-y-auto hide-scrollbar">
            {/* Profile hero */}
            <div className="flex flex-col items-center bg-linear-to-b from-primary/5 to-transparent px-6 py-6">
              <div className="relative mb-3">
                <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-white shadow-lg dark:ring-gray-dark">
                  <Image src={employee.avatar} alt={employee.firstName} fill sizes="80px" className="object-cover" />
                </div>
               
              </div>
              <h3 className="text-base font-bold text-dark dark:text-white">{employee.firstName} {employee.lastName}</h3>
              <p className="text-xs text-gray-400 dark:text-dark-6">{employee.position} · {employee.department}</p>
              <div className="mt-2 flex items-center gap-1.5">
                <span className={cn("h-2 w-2 rounded-full", employee.status === "active" ? "bg-green-500" : "bg-gray-400")} />
                <span className="text-xs font-medium text-dark dark:text-white">
                  {employee.status === "active" ? "Faol" : "Nofaol"}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-4 px-6 pb-6">
              {/* Info */}
              <div>
                <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-dark-6">Asosiy ma'lumotlar</h4>
                <div className="rounded-xl border border-stroke bg-gray-50/60 px-4 dark:border-dark-3 dark:bg-dark-2/60">
                  <Row label="Employee ID"  value={employee.employeeId} />
                  <Row label="Username"     value={employee.username} />
                  <Row label="Ish turi"     value={EMP_TYPE_LABELS[employee.employmentType]} />
                  <Row label="Filial"       value={employee.branch} />
                  <Row label="Yaratilgan"   value={new Date(employee.createdAt).toLocaleDateString("uz-UZ")} />
                  <Row label="So'nggi kirish" value={employee.lastLogin} />
                </div>
              </div>

              {/* Contact */}
              <div>
                <h4 className="mb-2 text-[11px] font-bold uppercase tracking-wider text-gray-400 dark:text-dark-6">Aloqa ma'lumotlari</h4>
                <div className="rounded-xl border border-stroke bg-gray-50/60 px-4 dark:border-dark-3 dark:bg-dark-2/60">
                  <Row label="Email"  value={employee.email} />
                  <Row label="Telefon" value={employee.phone} />
                </div>
              </div>

   
            </div>

            {/* Footer */}
            <div className="mt-auto border-t border-stroke px-6 py-4 dark:border-dark-3">
              <button onClick={() => { onClose(); onEdit(employee); }}
                className="w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-opacity-90">
                Tahrirlash
              </button>
            </div>
          </div>
        )}
      </aside>
    </>
  );
}
