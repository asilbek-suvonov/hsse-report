"use client";

import { useAuthStore } from "@/store/useAuthStore";
import { authService } from "@/services/auth.service";
import { saveSessionData, clearSessionData } from "@/hooks/useAuth";
import { normalizeRole } from "@/lib/auth/role";

export type AppRole = "super_admin" | "admin";

// ─── signIn ──────────────────────────────────────────────────────────────────
export const signIn = {
  email: async ({
    email,
    password,
  }: {
    email: string;
    password?: string;
  }) => {
    try {
      const response = await authService.login({ email, password });
      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;
        saveSessionData(user, accessToken, refreshToken);

        // Map API role to AppRole
        const normalizedRole = normalizeRole(user.role) as AppRole;
        const mappedUser = {
          id: String(user.id),
          name: user.fullName || "",
          email: user.email || "",
          image: user.avatarUrl || "",
          role: normalizedRole,
        };

        return {
          data: { user: mappedUser, session: { token: accessToken } },
          error: null,
        };
      }
      return {
        data: null,
        error: { message: response.message || "Email yoki parol noto'g'ri" },
      };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err?.message || "Kirish amalga oshmadi" },
      };
    }
  },
};

// ─── signUp ──────────────────────────────────────────────────────────────────
export const signUp = {
  email: async () => ({
    data: null,
    error: { message: "Ro'yxatdan o'tish bu versiyada mavjud emas" },
  }),
};

// ─── signOut ─────────────────────────────────────────────────────────────────
export const signOut = async () => {
  try {
    await authService.logout();
  } catch (e) {
    // Ignore server error on logout to clean client anyway
  } finally {
    clearSessionData();
  }
  return { data: true, error: null };
};

// ─── useSession ──────────────────────────────────────────────────────────────
export function useSession() {
  const { user, isAuthenticated, isLoading } = useAuthStore();

  if (isLoading) {
    return {
      data: null,
      isPending: true,
      error: null,
    };
  }

  if (!isAuthenticated || !user) {
    return {
      data: null,
      isPending: false,
      error: null,
    };
  }

  return {
    data: {
      user,
      session: {
        id: "session-active",
        userId: String(user.id),
        expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
        token: "session-token",
      },
    },
    isPending: false,
    error: null,
  };
}

// ─── getSession ──────────────────────────────────────────────────────────────
export const getSession = async () => {
  const user = useAuthStore.getState().user;
  if (!user) return { data: null, error: null };
  return { data: { user }, error: null };
};

export const authClient = { signIn, signUp, signOut, useSession, getSession };
