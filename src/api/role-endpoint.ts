import { useAuthStore, type AppRole } from "@/store/useAuthStore";

export type ApiRolePrefix = "admin" | "super-admin";

export function getCurrentRolePrefix(): ApiRolePrefix {
  const role = useAuthStore.getState().role;
  return role === "super_admin" ? "super-admin" : "admin";
}

export function withRolePrefix(path: string, role?: AppRole | null): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;
  const prefix: ApiRolePrefix =
    role === "super_admin" ? "super-admin" : role === "admin" ? "admin" : getCurrentRolePrefix();

  return `/${prefix}${normalizedPath}`;
}
