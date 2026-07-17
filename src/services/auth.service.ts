import { get, post, put } from "@/api/client";
import {
  ApiResponse,
  LoginRequest,
  LoginResponse,
  UserResponse,
  ChangePasswordRequest,
} from "@/types/auth";

export const authService = {
  login: (data: LoginRequest) =>
    post<ApiResponse<LoginResponse>>("/auth/login", data),

  logout: () =>
    post<ApiResponse<object>>("/auth/logout"),

  me: () =>
    get<ApiResponse<UserResponse>>("/auth/me"),

  changePassword: (data: ChangePasswordRequest) =>
    put<ApiResponse<object>>("/auth/change-password", data),
};
