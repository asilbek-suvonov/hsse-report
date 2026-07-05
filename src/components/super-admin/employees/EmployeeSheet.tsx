"use client";

import { BRANCHES, DEPARTMENTS, POSITIONS } from "@/data/employees";
import { cn } from "@/lib/utils";
import {
  Employee,
  EmployeeRole,
  EmployeeStatus,
  EmploymentType,
} from "@/types/employee";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type FormData = Omit<
  Employee,
  "id" | "employeeId" | "createdAt" | "lastLogin" | "permissions"
>;

const EMPTY: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  avatar: "",
  birthDate: "",
  gender: "male",
  branch: "",
  department: "",
  position: "",
  employmentType: "full_time",
  role: "employee",
  status: "active",
  username: "",
};

const ROLES: { value: EmployeeRole; label: string }[] = [
  { value: "super_admin", label: "Super Admin" },
  { value: "admin", label: "Admin" },
  { value: "manager", label: "Manager" },
  { value: "employee", label: "Employee" },
];

const EMP_TYPES: { value: EmploymentType; label: string }[] = [
  { value: "full_time", label: "Full Time" },
  { value: "part_time", label: "Part Time" },
  { value: "contract", label: "Contract" },
];

function Label({
  children,
  required,
}: {
  children: React.ReactNode;
  required?: boolean;
}) {
  return (
    <label className="mb-1.5 block text-xs font-semibold text-dark dark:text-white">
      {children}
      {required && <span className="ml-1 text-red-500">*</span>}
    </label>
  );
}

function Input({
  value,
  onChange,
  placeholder,
  type = "text",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
}) {
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className="w-full rounded-lg border border-stroke bg-transparent px-3.5 py-2.5 text-sm text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
    />
  );
}

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full appearance-none rounded-lg border border-stroke bg-transparent px-3.5 py-2.5 text-sm text-dark outline-none transition focus:border-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
      >
        {children}
      </select>
      <svg
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M6 9l6 6 6-6"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h3 className="mb-3 mt-1 text-xs font-bold uppercase tracking-wider text-gray-400 dark:text-dark-6">
      {children}
    </h3>
  );
}

/* Avatar Upload */
function AvatarUpload({
  value,
  onChange,
}: {
  value: string;
  onChange: (v: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => onChange(ev.target?.result as string);
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-16 w-16 overflow-hidden rounded-full bg-gray-100 dark:bg-dark-3 ring-2 ring-stroke dark:ring-dark-3">
        {value ? (
          <Image
            src={value}
            alt="avatar"
            fill
            sizes="64px"
            className="object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <path
                d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <circle
                cx="12"
                cy="7"
                r="4"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        )}
      </div>
      <div>
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          className="flex items-center gap-2 rounded-lg border border-stroke bg-white px-3 py-2 text-xs font-medium text-dark transition hover:border-primary hover:text-primary dark:border-dark-3 dark:bg-dark-2 dark:text-white"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <path
              d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <polyline
              points="17 8 12 3 7 8"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <line
              x1="12"
              y1="3"
              x2="12"
              y2="15"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          Rasm yuklash
        </button>
        <p className="mt-1 text-[11px] text-gray-400 dark:text-dark-6">
          JPG, PNG, WEBP · Max 2MB
        </p>
        <input
          ref={inputRef}
          type="file"
          accept="image/jpeg,image/png,image/webp"
          className="sr-only"
          onChange={handleFile}
        />
      </div>
      {value && (
        <button
          type="button"
          onClick={() => onChange("")}
          className="flex h-7 w-7 items-center justify-center rounded-lg text-gray-400 hover:bg-red-50 hover:text-red-500 dark:hover:bg-red-900/20"
        >
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
            <path
              d="M18 6L6 18M6 6l12 12"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </button>
      )}
    </div>
  );
}

interface Props {
  open: boolean;
  onClose: () => void;
  onSave: (
    data: Omit<Employee, "id" | "employeeId" | "createdAt" | "lastLogin"> & {
      id?: string;
    },
  ) => void;
  initial?: Employee | null;
}

export function EmployeeSheet({ open, onClose, onSave, initial }: Props) {
  const [form, setForm] = useState<FormData>(EMPTY);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({});

  useEffect(() => {
    if (open) {
      setForm(initial ? { ...initial } : { ...EMPTY });
      setPassword("");
      setErrors({});
    }
  }, [open, initial]);

  useEffect(() => {
    const h = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const set = <K extends keyof FormData>(k: K, v: FormData[K]) => {
    setForm((p) => ({ ...p, [k]: v }));
    setErrors((p) => ({ ...p, [k]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.firstName.trim()) e.firstName = "Ism kiritilishi shart";
    if (!form.lastName.trim()) e.lastName = "Familiya kiritilishi shart";
    if (!form.email.trim()) e.email = "Email kiritilishi shart";
    if (!form.phone.trim()) e.phone = "Telefon kiritilishi shart";
    if (!form.branch) e.branch = "Filial tanlanishi shart";
    if (!form.department) e.department = "Bo'lim tanlanishi shart";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = (ev: React.FormEvent) => {
    ev.preventDefault();
    if (!validate()) return;
    onSave({
      ...form,
      permissions: initial?.permissions ?? [],
      ...(initial ? { id: initial.id } : {}),
    });
  };

  return (
    <>
      {/* Overlay — z-9998 sidebar z-50 dan katta */}
      <div
        onClick={onClose}
        className={cn(
          "fixed inset-0 z-9600 bg-black/40 backdrop-blur-[2px] transition-all duration-300",
          open ? "opacity-100" : "pointer-events-none opacity-0",
        )}
        aria-hidden="true"
      />

      {/* Sheet — z-9999 */}
      <aside
        role="dialog"
        aria-modal="true"
        className={cn(
          "fixed right-0 top-0 z-9700 flex h-full w-full flex-col bg-white shadow-2xl transition-transform duration-300 ease-in-out dark:bg-gray-dark sm:max-w-[560px]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-stroke px-6 py-4 dark:border-dark-3">
          <div>
            <h2 className="text-base font-bold text-dark dark:text-white">
              {initial ? "Xodimni tahrirlash" : "Yangi xodim qo'shish"}
            </h2>
            <p className="mt-0.5 text-xs text-gray-400 dark:text-dark-6">
              {initial
                ? `ID: ${initial.employeeId}`
                : "Barcha kerakli maydonlarni to'ldiring"}
            </p>
          </div>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-dark dark:hover:bg-dark-2 dark:hover:text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-1 flex-col overflow-y-auto hide-scrollbar"
        >
          <div className="flex flex-col gap-4 px-6 py-5">
            {/* Avatar upload */}
            <SectionTitle>Profil rasmi</SectionTitle>
            <AvatarUpload
              value={form.avatar}
              onChange={(v) => set("avatar", v)}
            />

            {/* Personal */}
            <SectionTitle>Shaxsiy ma'lumotlar</SectionTitle>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label required>Ism</Label>
                <Input
                  value={form.firstName}
                  onChange={(v) => set("firstName", v)}
                  placeholder="Aziza"
                />
                {errors.firstName && (
                  <p className="mt-1 text-[11px] text-red-500">
                    {errors.firstName}
                  </p>
                )}
              </div>
              <div>
                <Label required>Familiya</Label>
                <Input
                  value={form.lastName}
                  onChange={(v) => set("lastName", v)}
                  placeholder="Karimova"
                />
                {errors.lastName && (
                  <p className="mt-1 text-[11px] text-red-500">
                    {errors.lastName}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label required>Telefon</Label>
                <Input
                  value={form.phone}
                  onChange={(v) => set("phone", v)}
                  placeholder="+998 90 000 00 00"
                  type="tel"
                />
                {errors.phone && (
                  <p className="mt-1 text-[11px] text-red-500">
                    {errors.phone}
                  </p>
                )}
              </div>
              <div>
                <Label required>Email</Label>
                <Input
                  value={form.email}
                  onChange={(v) => set("email", v)}
                  placeholder="aziza@hsse.uz"
                  type="email"
                />
                {errors.email && (
                  <p className="mt-1 text-[11px] text-red-500">
                    {errors.email}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Tug'ilgan sana</Label>
                <Input
                  value={form.birthDate}
                  onChange={(v) => set("birthDate", v)}
                  type="date"
                />
              </div>
              <div>
                <Label>Jins</Label>
                <Select
                  value={form.gender}
                  onChange={(v) => set("gender", v as "male" | "female")}
                >
                  <option value="male">Erkak</option>
                  <option value="female">Ayol</option>
                </Select>
              </div>
            </div>

            {/* Work */}
            <SectionTitle>Ish ma'lumotlari</SectionTitle>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label required>Filial</Label>
                <Select value={form.branch} onChange={(v) => set("branch", v)}>
                  <option value="">Tanlang</option>
                  {BRANCHES.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </Select>
                {errors.branch && (
                  <p className="mt-1 text-[11px] text-red-500">
                    {errors.branch}
                  </p>
                )}
              </div>
              <div>
                <Label required>Bo'lim</Label>
                <Select
                  value={form.department}
                  onChange={(v) => set("department", v)}
                >
                  <option value="">Tanlang</option>
                  {DEPARTMENTS.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </Select>
                {errors.department && (
                  <p className="mt-1 text-[11px] text-red-500">
                    {errors.department}
                  </p>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Lavozim</Label>
                <Select
                  value={form.position}
                  onChange={(v) => set("position", v)}
                >
                  <option value="">Tanlang</option>
                  {POSITIONS.map((p) => (
                    <option key={p} value={p}>
                      {p}
                    </option>
                  ))}
                </Select>
              </div>
              <div>
                <Label>Ish turi</Label>
                <Select
                  value={form.employmentType}
                  onChange={(v) => set("employmentType", v as EmploymentType)}
                >
                  {EMP_TYPES.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>

            {/* System access */}
            <SectionTitle>Tizimga kirish</SectionTitle>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label>Username</Label>
                <Input
                  value={form.username}
                  onChange={(v) => set("username", v)}
                  placeholder="aziza.karimova"
                />
              </div>
              <div>
                <Label>Rol</Label>
                <Select
                  value={form.role}
                  onChange={(v) => set("role", v as EmployeeRole)}
                >
                  {ROLES.map((r) => (
                    <option key={r.value} value={r.value}>
                      {r.label}
                    </option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-20">
              {!initial && (
                <div>
                  <Label>Parol</Label>
                  <Input
                    value={password}
                    onChange={setPassword}
                    type="password"
                    placeholder="••••••••"
                  />
                </div>
              )}
              <div>
                <Label>Status</Label>
                <Select
                  value={form.status}
                  onChange={(v) => set("status", v as EmployeeStatus)}
                >
                  <option value="active">Faol</option>
                  <option value="inactive">Nofaol</option>
                </Select>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="absolute bottom-0 left-0 right-0 z-10 flex gap-3 border-t border-stroke bg-white px-6 py-4 dark:border-dark-3 dark:bg-gray-dark">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 rounded-lg border border-stroke px-4 py-2.5 text-sm font-medium text-dark transition hover:bg-gray-50 dark:border-dark-3 dark:text-white dark:hover:bg-dark-2"
            >
              Bekor qilish
            </button>
            <button
              type="submit"
              className="flex-1 rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white transition hover:bg-opacity-90"
            >
              {initial ? "Saqlash" : "Qo'shish"}
            </button>
          </div>
        </form>
      </aside>
    </>
  );
}
