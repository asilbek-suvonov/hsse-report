import type { AppRole } from "@/types/auth";

export function normalizeRole(role?: string | null): AppRole {
  const normalized = String(role || "")
    .trim()
    .replace(/^ROLE[_\s-]?/i, "")
    .replace(/[\s-]+/g, "_")
    .toLowerCase();

  return normalized === "super_admin" ? "super_admin" : "admin";
}

export function getDashboardByRole(role?: string | null) {
  return normalizeRole(role) === "super_admin" ? "/super-admin/dashboard" : "/admin/dashboard";
}

export function getSettingsByRole(role?: string | null) {
  return normalizeRole(role) === "super_admin" ? "/super-admin/settings" : "/admin/settings";
}
