import { get, post } from "@/api/client";
import { withRolePrefix } from "@/api/role-endpoint";
import { buildPagedQuery } from "@/lib/api-query";
import type { AppRole } from "@/store/useAuthStore";
import type { ApiResponse } from "@/types/auth";
import type { CreateReportRequest, ReportListParams, ReportPageResponse, ReportResponse } from "@/types/report";

export const reportService = {
  list: (params: ReportListParams, role?: AppRole | null) =>
    get<ApiResponse<ReportPageResponse>>(withRolePrefix("/reports", role), {
      params: buildPagedQuery(params),
    }),

  get: (id: number | string, role?: AppRole | null) =>
    get<ApiResponse<ReportResponse>>(withRolePrefix(`/reports/${id}`, role)),

  create: (data: CreateReportRequest, role?: AppRole | null) =>
    post<ApiResponse<ReportResponse>>(withRolePrefix("/reports", role), data),
};
