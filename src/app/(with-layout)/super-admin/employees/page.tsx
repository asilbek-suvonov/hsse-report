"use client";

import { EmployeeDetailDrawer } from "@/components/super-admin/employees/EmployeeDetailDrawer";
import { EmployeeSheet }        from "@/components/super-admin/employees/EmployeeSheet";
import { MOCK_EMPLOYEES }        from "@/data/employees";
import { cn } from "@/lib/utils";
import { Employee } from "@/types/employee";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState, useRef, useEffect } from "react";

/* ── helpers ─────────────────────────────────────────────────────────────── */
const ROLE_LABELS:Record<string,string> = { super_admin:"Super Admin", admin:"Admin", manager:"Manager", employee:"Employee" };
const ROLE_COLORS:Record<string,string> = {
  super_admin:"text-primary bg-primary/10",
  admin:      "text-violet-700 bg-violet-50 dark:text-violet-400 dark:bg-violet-900/20",
  manager:    "text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-900/20",
  employee:   "text-green-700 bg-green-50 dark:text-green-400 dark:bg-green-900/20",
};

function SortIcon({ dir }: { dir: "asc" | "desc" | null }) {
  if (!dir) return <svg width="10" height="10" viewBox="0 0 24 24" fill="none" className="opacity-30"><path d="M12 5l-7 7h14L12 5zM12 19l7-7H5l7 7z" fill="currentColor"/></svg>;
  return dir === "asc"
    ? <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 5l-7 7h14L12 5z" fill="currentColor"/></svg>
    : <svg width="10" height="10" viewBox="0 0 24 24" fill="none"><path d="M12 19l7-7H5l7 7z" fill="currentColor"/></svg>;
}

/* 3 nuqta dropdown */
function RowActions({ emp, onView, onEdit, onDelete }: {
  emp: Employee;
  onView: () => void;
  onEdit: () => void;
  onDelete: () => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div ref={ref} className="relative flex justify-end">
      <button
        onClick={() => setOpen(p => !p)}
        className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-dark dark:hover:bg-dark-2 dark:hover:text-white"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <circle cx="12" cy="5"  r="1.5"/>
          <circle cx="12" cy="12" r="1.5"/>
          <circle cx="12" cy="19" r="1.5"/>
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 top-full z-9999 mt-1 w-40 overflow-hidden rounded-xl border border-stroke bg-white shadow-xl dark:border-dark-3 dark:bg-gray-dark">
          <button onClick={() => { setOpen(false); onView(); }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-dark transition hover:bg-gray-50 dark:text-white dark:hover:bg-dark-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5"/><circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/></svg>
            Ko'rish
          </button>
          <button onClick={() => { setOpen(false); onEdit(); }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-dark transition hover:bg-gray-50 dark:text-white dark:hover:bg-dark-2">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
            Tahrirlash
          </button>
          <button onClick={() => { setOpen(false); onDelete(); }}
            className="flex w-full items-center gap-2.5 px-3.5 py-2.5 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-900/20">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><path d="M10 11v6M14 11v6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
            O'chirish
          </button>
        </div>
      )}
    </div>
  );
}

function ConfirmDialog({ name, onConfirm, onCancel }: { name: string; onConfirm: () => void; onCancel: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 shadow-2xl dark:bg-gray-dark">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none"><polyline points="3 6 5 6 21 6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6M10 11v6M14 11v6" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round"/></svg>
        </div>
        <h3 className="mb-1 text-base font-bold text-dark dark:text-white">Xodimni o'chirishni tasdiqlang</h3>
        <p className="mb-5 text-sm text-gray-500 dark:text-dark-6">
          <span className="font-semibold text-dark dark:text-white">{name}</span> ni o'chirishni xohlaysizmi? Bu amalni ortga qaytarib bo'lmaydi.
        </p>
        <div className="flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-lg border border-stroke px-4 py-2 text-sm font-medium text-dark hover:bg-gray-50 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2">Bekor qilish</button>
          <button onClick={onConfirm} className="flex-1 rounded-lg bg-red-500 px-4 py-2 text-sm font-medium text-white hover:bg-red-600">O'chirish</button>
        </div>
      </div>
    </div>
  );
}

/* ── Stats Cards ─────────────────────────────────────────────────────────── */
const STATS_ICONS = {
  users:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  active:  <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M22 11.08V12a10 10 0 11-5.93-9.14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
  admin:   <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>,
  new:     <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/><line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><line x1="8" y1="12" x2="16" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>,
};

function StatsCards({ employees }: { employees: Employee[] }) {
  const total  = employees.length;
  const active = employees.filter(e => e.status === "active").length;
  const admins = employees.filter(e => e.role === "admin" || e.role === "super_admin").length;
  const recent = employees.filter(e => new Date(e.createdAt) > new Date(Date.now() - 30*24*3600*1000)).length;

  return (
    <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">
      {[
        { label:"Jami xodimlar",          value:total,  iconKey:"users"  as const, color:"text-primary",   bg:"bg-primary/10 dark:bg-primary/20"      },
        { label:"Faol xodimlar",          value:active, iconKey:"active" as const, color:"text-green-600", bg:"bg-green-50 dark:bg-green-900/20"       },
        { label:"Admin foydalanuvchilar", value:admins, iconKey:"admin"  as const, color:"text-violet-600",bg:"bg-violet-50 dark:bg-violet-900/20"     },
        { label:"Yangi (30 kun)",         value:recent, iconKey:"new"    as const, color:"text-amber-600", bg:"bg-amber-50 dark:bg-amber-900/20"       },
      ].map(s => (
        <div key={s.label} className="flex items-center gap-2.5 rounded-xl border border-stroke bg-white p-3.5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-dark-3 dark:bg-gray-dark sm:gap-3 sm:p-4">
          <div className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-xl sm:h-11 sm:w-11", s.bg, s.color)}>
            {STATS_ICONS[s.iconKey]}
          </div>
          <div className="min-w-0">
            <p className={cn("text-xl font-bold sm:text-2xl", s.color)}>{s.value}</p>
            <p className="truncate text-[11px] text-gray-400 dark:text-dark-6 sm:text-xs">{s.label}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Main Page ────────────────────────────────────────────────────────────── */
export default function SuperAdminEmployeesPage() {
  const [employees, setEmployees] = useState<Employee[]>(MOCK_EMPLOYEES);
  const [search,    setSearch]    = useState("");
  const [sheetOpen, setSheetOpen] = useState(false);
  const [editTarget, setEditTarget] = useState<Employee | null>(null);
  const [viewTarget, setViewTarget] = useState<Employee | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Employee | null>(null);
  const [sortCol, setSortCol] = useState<keyof Employee>("createdAt");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("desc");
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 6;

  const openAdd  = () => { setEditTarget(null); setSheetOpen(true); };
  const openEdit = (e: Employee) => { setEditTarget(e); setSheetOpen(true); };

  const handleSave = (data: Omit<Employee,"id"|"employeeId"|"createdAt"|"lastLogin"> & { id?: string }) => {
    if (data.id) {
      setEmployees(prev => prev.map(e => e.id === data.id ? { ...e, ...data } as Employee : e));
    } else {
      const newEmp: Employee = {
        ...data as any,
        id: `emp-${Date.now()}`,
        employeeId: `EMP-${String(employees.length + 1).padStart(3, "0")}`,
        createdAt: new Date().toISOString().slice(0, 10),
        lastLogin: "—",
        avatar: data.avatar || `https://avatar.vercel.sh/${data.firstName}`,
      };
      setEmployees(prev => [newEmp, ...prev]);
    }
    setSheetOpen(false);
    setEditTarget(null);
  };

  const handleDelete = (id: string) => {
    setEmployees(prev => prev.filter(e => e.id !== id));
    setDeleteTarget(null);
  };

  const toggleSort = (col: keyof Employee) => {
    if (sortCol === col) setSortDir(d => d === "asc" ? "desc" : "asc");
    else { setSortCol(col); setSortDir("asc"); }
  };

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return employees
      .filter(e =>
        !q || `${e.firstName} ${e.lastName}`.toLowerCase().includes(q) ||
        e.email.toLowerCase().includes(q) || e.phone.includes(q) || e.employeeId.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const va = String(a[sortCol] ?? "").toLowerCase();
        const vb = String(b[sortCol] ?? "").toLowerCase();
        return sortDir === "asc" ? va.localeCompare(vb) : vb.localeCompare(va);
      });
  }, [employees, search, sortCol, sortDir]);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paged = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const Th = ({ label, col }: { label: string; col?: keyof Employee }) => (
    <th onClick={() => col && toggleSort(col)}
      className={cn("whitespace-nowrap px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-dark-6", col && "cursor-pointer select-none hover:text-primary")}>
      <div className="flex items-center gap-1.5">
        {label}
        {col && <SortIcon dir={sortCol === col ? sortDir : null} />}
      </div>
    </th>
  );

  return (
    <>
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <nav className="mb-1 flex items-center gap-1.5 text-xs text-gray-400 dark:text-dark-6">
              <Link href="/super-admin/dashboard" className="transition hover:text-primary">Dashboard</Link>
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="font-medium text-dark dark:text-white">Xodimlar</span>
            </nav>
            <h1 className="text-xl font-bold text-dark dark:text-white sm:text-2xl">Xodimlar boshqaruvi</h1>
            <p className="mt-0.5 text-sm text-gray-500 dark:text-dark-6">Barcha xodimlarni ko'rish va boshqarish</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              aria-label="Export Excel"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-stroke bg-white text-dark transition hover:bg-gray-50 dark:border-dark-3 dark:bg-gray-dark dark:text-white sm:h-auto sm:w-auto sm:gap-1.5 sm:px-3 sm:py-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
              <span className="hidden text-sm font-medium sm:inline">Export Excel</span>
            </button>
            <button onClick={openAdd}
              className="flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-sm font-medium text-white transition hover:bg-opacity-90 sm:px-4">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <span className="hidden xs:inline">Add Employee</span>
              <span className="xs:hidden">Qo'shish</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <StatsCards employees={employees} />

        {/* Table card */}
        <div className="rounded-2xl border border-stroke bg-white shadow-sm dark:border-dark-3 dark:bg-gray-dark">
          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-3 border-b border-stroke px-5 py-4 dark:border-dark-3">
            <div className="flex items-center gap-2 rounded-lg border border-stroke bg-gray-50 px-3 py-2 transition focus-within:border-primary dark:border-dark-3 dark:bg-dark-2">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gray-400"><circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/><path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
              <input value={search} onChange={e => { setSearch(e.target.value); setPage(1); }} placeholder="Qidirish..."
                className="w-44 bg-transparent text-sm text-dark outline-none placeholder:text-gray-400 dark:text-white" />
              {search && <button onClick={() => setSearch("")} className="text-gray-400 hover:text-dark dark:hover:text-white"><svg width="12" height="12" viewBox="0 0 24 24" fill="none"><path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg></button>}
            </div>
            <span className="ml-auto text-xs text-gray-400 dark:text-dark-6">{filtered.length} ta xodim</span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto hide-scrollbar">
            <table className="w-full text-sm">
              <thead className="border-b border-stroke bg-gray-50/60 dark:border-dark-3 dark:bg-dark-2/40">
                <tr>
                  <Th label="Xodim"   col="firstName" />
                  <Th label="Telefon"   />
                  <Th label="Email"     />
                  <Th label="Filial"  col="branch" />
                  <Th label="Bo'lim"  col="department" />
                  <Th label="Rol"     col="role" />
                  <Th label="Status"  col="status" />
                  <Th label="Qo'shilgan" col="createdAt" />
                  <th className="px-4 py-3 text-right text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-dark-6">Amallar</th>
                </tr>
              </thead>
              <tbody>
                {paged.length === 0 ? (
                  <tr><td colSpan={9} className="py-16 text-center text-gray-400 dark:text-dark-6">
                    <div className="flex flex-col items-center gap-3">
                      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" className="opacity-30"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" strokeWidth="1.5"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/></svg>
                      <p className="text-sm font-medium">Xodim topilmadi</p>
                    </div>
                  </td></tr>
                ) : paged.map(emp => (
                  <tr key={emp.id} className="border-b border-stroke transition hover:bg-gray-50/60 dark:border-dark-3 dark:hover:bg-dark-2/40">
                    {/* Avatar + name */}
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="relative h-9 w-9 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-dark-3">
                          <Image src={emp.avatar} alt={emp.firstName} fill sizes="36px" className="object-cover" />
                        </div>
                        <div>
                          <p className="font-semibold text-dark dark:text-white">{emp.firstName} {emp.lastName}</p>
                          <p className="text-[11px] font-mono text-gray-400 dark:text-dark-6">{emp.employeeId}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-dark dark:text-white">{emp.phone}</td>
                    <td className="px-4 py-3 text-xs text-dark dark:text-white">{emp.email}</td>
                    <td className="px-4 py-3 text-xs text-dark dark:text-white">{emp.branch}</td>
                    <td className="px-4 py-3 text-xs text-dark dark:text-white">{emp.department}</td>
                    <td className="px-4 py-3">
                      <span className={cn("rounded-full px-2.5 py-0.5 text-[11px] font-semibold", ROLE_COLORS[emp.role])}>
                        {ROLE_LABELS[emp.role]}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5">
                        <span className={cn("h-2 w-2 rounded-full", emp.status === "active" ? "bg-green-500" : "bg-gray-400")} />
                        <span className={cn("text-xs font-medium", emp.status === "active" ? "text-green-600 dark:text-green-400" : "text-gray-400 dark:text-dark-6")}>
                          {emp.status === "active" ? "Faol" : "Nofaol"}
                        </span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-xs text-gray-400 dark:text-dark-6">
                      {new Date(emp.createdAt).toLocaleDateString("uz-UZ", { day:"2-digit", month:"short", year:"numeric" })}
                    </td>
                    <td className="px-4 py-3">
                      <RowActions
                        emp={emp}
                        onView={() => setViewTarget(emp)}
                        onEdit={() => openEdit(emp)}
                        onDelete={() => setDeleteTarget(emp)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between border-t border-stroke px-5 py-4 dark:border-dark-3">
              <p className="text-xs text-gray-400 dark:text-dark-6">
                {(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, filtered.length)} / {filtered.length} ta
              </p>
              <div className="flex items-center gap-1">
                <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-stroke text-gray-400 transition hover:border-primary hover:text-primary disabled:opacity-40 dark:border-dark-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                  <button key={n} onClick={() => setPage(n)}
                    className={cn("flex h-8 w-8 items-center justify-center rounded-lg border text-xs font-medium transition",
                      n === page ? "border-primary bg-primary text-white" : "border-stroke text-dark hover:border-primary hover:text-primary dark:border-dark-3 dark:text-white")}>
                    {n}
                  </button>
                ))}
                <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
                  className="flex h-8 w-8 items-center justify-center rounded-lg border border-stroke text-gray-400 transition hover:border-primary hover:text-primary disabled:opacity-40 dark:border-dark-3">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M9 18l6-6-6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Drawers & Dialogs */}
      <EmployeeSheet open={sheetOpen} onClose={() => { setSheetOpen(false); setEditTarget(null); }} onSave={handleSave} initial={editTarget} />
      <EmployeeDetailDrawer employee={viewTarget} onClose={() => setViewTarget(null)} onEdit={openEdit} />
      {deleteTarget && (
        <ConfirmDialog
          name={`${deleteTarget.firstName} ${deleteTarget.lastName}`}
          onConfirm={() => handleDelete(deleteTarget.id)}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </>
  );
}
