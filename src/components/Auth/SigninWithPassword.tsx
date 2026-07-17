"use client";

import { useLogin } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useId, useState } from "react";
import { toast } from "sonner";

/* ── SVG Icons ──────────────────────────────────────────────────────────── */
function EyeIcon({ visible }: { visible: boolean }) {
  return visible ? (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="1.5"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  ) : (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19M1 1l22 22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="1.5"/>
    </svg>
  );
}

/* ── Input Field ─────────────────────────────────────────────────────────── */
function Field({
  id, label, type, value, onChange, placeholder, required = true, autoComplete,
  error, rightAction,
}: {
  id: string; label: string; type: string; value: string;
  onChange: (v: string) => void; placeholder: string;
  required?: boolean; autoComplete?: string; error?: string;
  rightAction?: React.ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
        {label}
        {required && <span className="ml-1 text-red-500" aria-hidden="true">*</span>}
      </label>
      <div className="relative">
        <input
          id={id}
          type={type}
          value={value}
          onChange={e => onChange(e.target.value)}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-required={required}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-error` : undefined}
          className={[
            "w-full rounded-xl border bg-transparent px-4 py-3 text-sm text-dark outline-none transition",
            "placeholder:text-gray-400 dark:bg-dark-2 dark:text-white",
            "focus:border-primary dark:focus:border-primary",
            rightAction ? "pr-11" : "",
            error
              ? "border-red-400 dark:border-red-600"
              : "border-stroke dark:border-dark-3",
          ].join(" ")}
        />
        {rightAction && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            {rightAction}
          </div>
        )}
      </div>
      {error && (
        <p id={`${id}-error`} role="alert" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
          {error}
        </p>
      )}
    </div>
  );
}

/* ── Main Component ──────────────────────────────────────────────────────── */
export default function SigninWithPassword() {
  const router   = useRouter();
  const emailId  = useId();
  const passId   = useId();

  const [email,    setEmail]    = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [remember, setRemember] = useState(false);
  const [error,    setError]    = useState("");
  const [fieldErr, setFieldErr] = useState({ email: "", password: "" });

  const loginMutation = useLogin();

  const validate = () => {
    const errs = { email: "", password: "" };
    if (!email.trim())    errs.email    = "Email kiritilishi shart";
    if (!password.trim()) errs.password = "Parol kiritilishi shart";
    setFieldErr(errs);
    return !errs.email && !errs.password;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!validate()) return;

    loginMutation.mutate(
      { email: email.trim(), password },
      {
        onError: (err: any) => {
          const msg = err?.message || "Email yoki parol noto'g'ri";
          setError(msg);
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} noValidate aria-label="Kirish formasi">
      {/* Global error */}
      {error && (
        <div role="alert"
          className="mb-5 flex items-start gap-2.5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 dark:border-red-800 dark:bg-red-900/20">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="mt-0.5 shrink-0 text-red-500" aria-hidden="true">
            <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
            <line x1="12" y1="8" x2="12" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
            <line x1="12" y1="16" x2="12.01" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
          <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
        </div>
      )}

      <div className="flex flex-col gap-5">
        {/* Email */}
        <Field
          id={emailId}
          label="Email"
          type="email"
          value={email}
          onChange={v => { setEmail(v); setFieldErr(p => ({ ...p, email: "" })); }}
          placeholder="super@hsse.uz"
          autoComplete="email"
          error={fieldErr.email}
        />

        {/* Password */}
        <Field
          id={passId}
          label="Parol"
          type={showPass ? "text" : "password"}
          value={password}
          onChange={v => { setPassword(v); setFieldErr(p => ({ ...p, password: "" })); }}
          placeholder="••••••••"
          autoComplete="current-password"
          error={fieldErr.password}
          rightAction={
            <button
              type="button"
              onClick={() => setShowPass(p => !p)}
              aria-label={showPass ? "Parolni yashirish" : "Parolni ko'rsatish"}
              className="text-gray-400 transition hover:text-primary"
            >
              <EyeIcon visible={showPass} />
            </button>
          }
        />

        {/* Remember + forgot */}
        <div className="flex items-center justify-between gap-3">
          <label className="flex cursor-pointer items-center gap-2.5 select-none">
            <div className="relative">
              <input
                type="checkbox"
                checked={remember}
                onChange={e => setRemember(e.target.checked)}
                className="sr-only"
                aria-label="Meni eslab qolish"
              />
              <div className={[
                "flex h-5 w-5 items-center justify-center rounded border-[1.5px] transition",
                remember ? "border-primary bg-primary" : "border-stroke dark:border-dark-4",
              ].join(" ")}>
                {remember && (
                  <svg width="11" height="9" viewBox="0 0 11 9" fill="none" aria-hidden="true">
                    <path d="M1 4.5l3 3 6-7" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                )}
              </div>
            </div>
            <span className="text-sm text-dark dark:text-dark-6">Eslab qolish</span>
          </label>

          <button
            type="button"
            className="text-sm font-medium text-primary transition hover:opacity-80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
          >
            Parolni unutdingizmi?
          </button>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loginMutation.isPending}
          aria-busy={loginMutation.isPending}
          className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3.5 text-sm font-semibold text-white transition hover:bg-opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60 active:scale-[0.98]"
        >
          {loginMutation.isPending ? (
            <>
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" aria-hidden="true"/>
              Kirish...
            </>
          ) : (
            <>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l5-5-5-5M15 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Tizimga kirish
            </>
          )}
        </button>
      </div>

      {/* Demo credentials */}
      <div className="mt-5 rounded-xl border border-dashed border-stroke bg-gray-50 p-4 dark:border-dark-3 dark:bg-dark-2">
        <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400 dark:text-dark-6">
          Demo kirish ma'lumotlari
        </p>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {[
            { role: "Super Admin", email: "super@hsse.uz", pass: "super123", color: "text-primary" },
            { role: "Admin",       email: "admin@hsse.uz", pass: "admin123", color: "text-violet-600 dark:text-violet-400" },
          ].map(c => (
            <button
              key={c.role}
              type="button"
              onClick={() => { setEmail(c.email); setPassword(c.pass); setError(""); setFieldErr({ email: "", password: "" }); }}
              className="flex flex-col items-start rounded-lg border border-stroke bg-white px-3 py-2.5 text-left transition hover:border-primary dark:border-dark-3 dark:bg-gray-dark"
              aria-label={`${c.role} sifatida kirish: ${c.email}`}
            >
              <span className={`text-[11px] font-bold uppercase tracking-wide ${c.color}`}>{c.role}</span>
              <span className="mt-0.5 font-mono text-xs text-gray-500 dark:text-dark-6">{c.email}</span>
            </button>
          ))}
        </div>
      </div>
    </form>
  );
}
