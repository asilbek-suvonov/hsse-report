import { get } from "@/api/client";
import { SuperAdminDashboardResponse, AdminDashboardResponse, AuditLogResponse } from "@/types/dashboard";
import { ApiResponse } from "@/types/auth";

export interface AuditLogParams {
  page?: number;
  size?: number;
  sort?: string | string[];
}

export const dashboardService = {
  getSuperAdminStats: () =>
    get<ApiResponse<SuperAdminDashboardResponse>>("/super-admin/dashboard"),

  getAdminStats: () =>
    get<ApiResponse<AdminDashboardResponse>>("/admin/dashboard"),

  getAuditLogs: (params: AuditLogParams) =>
    get<ApiResponse<{ content: AuditLogResponse[]; totalPages: number; totalElements: number }>>(
      "/super-admin/audit-logs",
      { params },
    ),
};
