"use client";

import React, { useState } from "react";
import { useChangePassword } from "@/hooks/useAuth";

export default function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const changePasswordMutation = useChangePassword();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!oldPassword) {
      setError("Eski parol kiritilishi shart");
      return;
    }
    if (!newPassword) {
      setError("Yangi parol kiritilishi shart");
      return;
    }
    if (newPassword.length < 6) {
      setError("Yangi parol kamida 6 ta belgidan iborat bo'lishi kerak");
      return;
    }
    if (newPassword !== confirmPassword) {
      setError("Yangi parollar mos kelmadi");
      return;
    }

    changePasswordMutation.mutate(
      { oldPassword, newPassword },
      {
        onSuccess: (response) => {
          if (response.success) {
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
          }
        },
      },
    );
  };

  return (
    <div className="w-full max-w-lg rounded-xl border border-stroke bg-white p-6 shadow-sm dark:border-dark-3 dark:bg-gray-dark">
      <h2 className="mb-1 text-lg font-semibold text-dark dark:text-white">
        Parolni O'zgartirish
      </h2>
      <p className="mb-6 text-sm text-gray-500 dark:text-dark-6">
        Hisobingiz xavfsizligini ta'minlash uchun parolni muntazam yangilab turing.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {error && (
          <div
            role="alert"
            className="flex items-start gap-2.5 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 dark:border-red-800 dark:bg-red-900/20"
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              className="mt-0.5 shrink-0 text-red-500"
              aria-hidden="true"
            >
              <circle
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="1.5"
              />
              <line
                x1="12"
                y1="8"
                x2="12"
                y2="12"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
              />
              <line
                x1="12"
                y1="16"
                x2="12.01"
                y2="16"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
            <p className="text-xs font-medium text-red-600 dark:text-red-400">
              {error}
            </p>
          </div>
        )}

        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
            Eski parol <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={oldPassword}
            onChange={(e) => {
              setOldPassword(e.target.value);
              setError("");
            }}
            placeholder="••••••••"
            required
            className="w-full rounded-xl border border-stroke bg-transparent px-4 py-2.5 text-sm text-dark outline-none transition placeholder:text-gray-400 dark:border-dark-3 dark:bg-dark-2 dark:text-white focus:border-primary dark:focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
            Yangi parol <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => {
              setNewPassword(e.target.value);
              setError("");
            }}
            placeholder="••••••••"
            required
            className="w-full rounded-xl border border-stroke bg-transparent px-4 py-2.5 text-sm text-dark outline-none transition placeholder:text-gray-400 dark:border-dark-3 dark:bg-dark-2 dark:text-white focus:border-primary dark:focus:border-primary"
          />
        </div>

        <div>
          <label className="mb-1.5 block text-sm font-medium text-dark dark:text-white">
            Yangi parolni tasdiqlang <span className="text-red-500">*</span>
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => {
              setConfirmPassword(e.target.value);
              setError("");
            }}
            placeholder="••••••••"
            required
            className="w-full rounded-xl border border-stroke bg-transparent px-4 py-2.5 text-sm text-dark outline-none transition placeholder:text-gray-400 dark:border-dark-3 dark:bg-dark-2 dark:text-white focus:border-primary dark:focus:border-primary"
          />
        </div>

        <button
          type="submit"
          disabled={changePasswordMutation.isPending}
          className="mt-2 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl bg-primary py-3 text-sm font-semibold text-white transition hover:bg-opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {changePasswordMutation.isPending ? (
            <>
              <span
                className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
                aria-hidden="true"
              />
              Saqlanmoqda...
            </>
          ) : (
            "Parolni saqlash"
          )}
        </button>
      </form>
    </div>
  );
}
