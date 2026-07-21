import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { normalizeRole } from "@/lib/auth/role";

export type AppRole = "super_admin" | "admin";

export interface AuthUser {
  id: string | number;
  name: string;
  email: string;
  image?: string;
  avatarUrl?: string | null;
  phone?: string | null;
  branchId?: number | null;
  branchName?: string | null;
  createdAt?: string;
}

interface AuthState {
  user: AuthUser | null;
  role: AppRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  setUser: (user: any, role: string) => void;
  clearAuth: () => void;
  setLoading: (loading: boolean) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isAuthenticated: false,
      isLoading: false,
      setUser: (user, role) => {
        const normalizedRole = normalizeRole(role);

        const normalizedUser: AuthUser = {
          id: user.id,
          name: user.fullName || user.name || "",
          email: user.email || "",
          image: user.avatarUrl || user.image || "",
          avatarUrl: user.avatarUrl || null,
          phone: user.phone || null,
          branchId: user.branchId || null,
          branchName: user.branchName || null,
          createdAt: user.createdAt,
        };

        set({
          user: normalizedUser,
          role: normalizedRole,
          isAuthenticated: true,
          isLoading: false,
        });
      },
      clearAuth: () =>
        set({ user: null, role: null, isAuthenticated: false, isLoading: false }),
      setLoading: (loading: boolean) => set({ isLoading: loading }),
    }),
    {
      name: "hsse_auth",
      storage: createJSONStorage(() => localStorage),
      // SSR paytida hydration mismatch oldini olish
      skipHydration: true,
    },
  ),
);
