/**
 * Markaziy Axios instance
 *
 * ⚠️  CORS OGOHLANTIRISH:
 *   http://185.187.8.92 — HTTP server. Brauzer CORS policy sababli
 *   frontend http://localhost:3000 → http://185.187.8.92 so'rovlari
 *   backend da Access-Control-Allow-Origin header bo'lmasa bloklanadi.
 *   Bu backend tomonida sozlanishi kerak bo'lgan masala.
 */

import axios, {
  AxiosError,
  AxiosRequestConfig,
  InternalAxiosRequestConfig,
} from "axios";
import { useAuthStore } from "@/store/useAuthStore";

// ─── Base URL ─────────────────────────────────────────────────────────────
const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://185.182.9.93:8084";
const VERSION  = process.env.NEXT_PUBLIC_API_VERSION  ?? "";

export const API_ROOT = VERSION ? `${BASE_URL}/api/${VERSION}` : `${BASE_URL}/api`;

// ─── Axios instance ────────────────────────────────────────────────────────
export const apiClient = axios.create({
  baseURL: API_ROOT,
  timeout: 15_000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: false, // true qilsangiz backend CORS credentials ham ruxsat etishi kerak
});

// ─── Token store (localStorage) ───────────────────────────────────────────
const TOKEN_KEY   = "hsse_access_token";
const REFRESH_KEY = "hsse_refresh_token";

export const tokenStore = {
  getAccess:  ()      => (typeof window !== "undefined" ? localStorage.getItem(TOKEN_KEY)   : null),
  getRefresh: ()      => (typeof window !== "undefined" ? localStorage.getItem(REFRESH_KEY) : null),
  setAccess:  (t: string) => localStorage.setItem(TOKEN_KEY,   t),
  setRefresh: (t: string) => localStorage.setItem(REFRESH_KEY, t),
  clear:      ()      => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
  },
};

// ─── Request interceptor — JWT qo'shish ────────────────────────────────────
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = tokenStore.getAccess();
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

// ─── Refresh state (loop oldini olish) ────────────────────────────────────
let isRefreshing  = false;
let failedQueue: Array<{
  resolve: (token: string) => void;
  reject:  (err: unknown)  => void;
}> = [];

function processQueue(error: unknown, token: string | null = null) {
  failedQueue.forEach((p) => {
    if (error) p.reject(error);
    else       p.resolve(token!);
  });
  failedQueue = [];
}

// ─── Response interceptor — 401 refresh + logout ──────────────────────────
apiClient.interceptors.response.use(
  (response) => response,
  async (error: AxiosError<ApiError>) => {
    const original = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

    // 401 va dastlabki so'rov uchun refresh urunish
    if (error.response?.status === 401 && !original._retry) {
      const refreshToken = tokenStore.getRefresh();

      if (!refreshToken) {
        // Refresh token yo'q — logout
        return handleLogout(error);
      }

      if (isRefreshing) {
        // Refresh jarayonida boshqa so'rovlar navbatga qo'shiladi
        return new Promise<string>((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            if (original.headers) original.headers.Authorization = `Bearer ${token}`;
            return apiClient(original);
          })
          .catch(Promise.reject.bind(Promise));
      }

      original._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post<{ accessToken: string; refreshToken?: string }>(
          `${API_ROOT}/auth/refresh`,
          { refreshToken },
        );

        const newAccess = data.accessToken;
        tokenStore.setAccess(newAccess);
        if (data.refreshToken) tokenStore.setRefresh(data.refreshToken);

        processQueue(null, newAccess);
        if (original.headers) original.headers.Authorization = `Bearer ${newAccess}`;
        return apiClient(original);
      } catch (refreshError) {
        processQueue(refreshError);
        return handleLogout(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    // Standart xato formati
    return Promise.reject(normalizeError(error));
  },
);

// ─── Logout helper ─────────────────────────────────────────────────────────
function handleLogout(error: unknown) {
  tokenStore.clear();
  useAuthStore.getState().clearAuth();
  if (typeof window !== "undefined") {
    window.location.href = "/auth/sign-in";
  }
  return Promise.reject(error);
}

// ─── Standart xato formati ─────────────────────────────────────────────────
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

function normalizeError(error: AxiosError<ApiError>): ApiError {
  const res = error.response;
  if (res?.data) {
    return {
      message:    res.data.message    ?? error.message,
      statusCode: res.data.statusCode ?? res.status,
      errors:     res.data.errors,
    };
  }
  return {
    message:    error.message ?? "Kutilmagan xato",
    statusCode: res?.status   ?? 0,
  };
}

// ─── Generic request helper'lar ────────────────────────────────────────────
export async function get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await apiClient.get<T>(url, config);
  return data;
}

export async function post<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await apiClient.post<T>(url, body, config);
  return data;
}

export async function put<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await apiClient.put<T>(url, body, config);
  return data;
}

export async function patch<T>(url: string, body?: unknown, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await apiClient.patch<T>(url, body, config);
  return data;
}

export async function del<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
  const { data } = await apiClient.delete<T>(url, config);
  return data;
}
