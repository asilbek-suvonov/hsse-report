import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

export type AppRole = "super_admin" | "admin";

interface AuthState {
  user: { id: string; name: string; email: string; image?: string } | null;
  role: AppRole | null;
  isAuthenticated: boolean;
  setUser: (user: any, role: string) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      role: null,
      isAuthenticated: false,
      setUser: (user, role) =>
        set({ user, role: role as AppRole, isAuthenticated: true }),
      clearAuth: () =>
        set({ user: null, role: null, isAuthenticated: false }),
    }),
    {
      name: "hsse_auth",
      storage: createJSONStorage(() => localStorage),
      // SSR paytida hydration mismatch oldini olish
      skipHydration: true,
    },
  ),
);
