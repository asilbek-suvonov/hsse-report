import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";
import { useAuthStore } from "@/store/useAuthStore";
import { tokenStore } from "@/api/client";
import { LoginRequest, ChangePasswordRequest, UserResponse } from "@/types/auth";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const SESSION_KEY = "hsse_mock_session";

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}

export function saveSessionData(user: UserResponse, accessToken: string, refreshToken: string) {
  if (typeof window === "undefined") return;

  // Save JWT tokens in localStorage/tokenStore
  tokenStore.setAccess(accessToken);
  tokenStore.setRefresh(refreshToken);

  // Normalize role
  const normalizedRole = user.role.toLowerCase().replace("-", "_");

  // Create session user object compatible with middleware & UserInfo
  const sessionUser = {
    id: String(user.id),
    name: user.fullName || "",
    email: user.email || "",
    image: user.avatarUrl || "",
    role: normalizedRole,
  };

  // Write to sessionStorage and Cookies for middleware routing
  sessionStorage.setItem(SESSION_KEY, JSON.stringify(sessionUser));
  document.cookie = `${SESSION_KEY}=${encodeURIComponent(JSON.stringify(sessionUser))};path=/;max-age=${60 * 60 * 24};samesite=lax`;

  // Set Zustand store
  useAuthStore.getState().setUser(user, user.role);
}

export function clearSessionData() {
  if (typeof window === "undefined") return;

  // Clear tokens
  tokenStore.clear();

  // Clear sessionStorage and Cookies
  sessionStorage.removeItem(SESSION_KEY);
  document.cookie = `${SESSION_KEY}=;path=/;max-age=0;samesite=lax`;

  // Clear Zustand store
  useAuthStore.getState().clearAuth();
}

export function useLogin() {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: LoginRequest) => authService.login(data),
    onSuccess: (response) => {
      if (response.success && response.data) {
        const { user, accessToken, refreshToken } = response.data;
        saveSessionData(user, accessToken, refreshToken);

        const normalizedRole = (user.role || "").toLowerCase().replace("-", "_");
        const dashboard =
          normalizedRole === "super_admin"
            ? "/super-admin/dashboard"
            : "/admin/dashboard";

        toast.success("Muvaffaqiyatli kirdingiz!");
        router.replace(dashboard);
      } else {
        toast.error(response.message || "Tizimga kirishda xatolik yuz berdi");
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Email yoki parol noto'g'ri"));
    },
  });
}

export function useLogout() {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => authService.logout(),
    onSettled: () => {
      clearSessionData();
      queryClient.clear();
      toast.success("Chiqish muvaffaqiyatli amalga oshdi");
      router.replace("/auth/sign-in");
    },
  });
}

export function useMe() {
  return useQuery({
    queryKey: ["auth", "me"],
    queryFn: async () => {
      const response = await authService.me();
      if (response.success && response.data) {
        const user = response.data;
        const accessToken = tokenStore.getAccess() || "";
        const refreshToken = tokenStore.getRefresh() || "";
        if (accessToken) {
          saveSessionData(user, accessToken, refreshToken);
        }
        return user;
      }
      throw new Error("Profilni olish muvaffaqiyatsiz tugadi");
    },
    enabled: typeof window !== "undefined" && !!tokenStore.getAccess(),
    retry: false,
  });
}

export function useChangePassword() {
  return useMutation({
    mutationFn: (data: ChangePasswordRequest) => authService.changePassword(data),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Parol muvaffaqiyatli o'zgartirildi!");
      } else {
        toast.error(response.message || "Parolni o'zgartirishda xatolik");
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error, "Xatolik yuz berdi"));
    },
  });
}
