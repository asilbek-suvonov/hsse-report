export type ApiRole = "SUPER_ADMIN" | "ADMIN" | "CLIENT";
export type AppRole = "super_admin" | "admin";

export interface UserResponse {
  id: number;
  email: string;
  fullName: string;
  role: ApiRole;
  phone?: string | null;
  avatarUrl?: string | null;
  branchId?: number | null;
  branchName?: string | null;
  lastLogin?: string | null;
  createdAt: string;
  active: boolean;
}

export interface LoginRequest {
  email: string;
  password?: string;
}

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: UserResponse;
}

export interface ChangePasswordRequest {
  oldPassword?: string;
  newPassword?: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data: T;
}

export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}
