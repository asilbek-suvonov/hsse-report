import { get, post } from "@/api/client";
import { buildPagedQuery } from "@/lib/api-query";
import type { ApiResponse } from "@/types/auth";
import type { CreateReportRequest, ReportListParams, ReportPageResponse, ReportResponse } from "@/types/report";

export const reportService = {
  list: (params: ReportListParams) =>
    get<ApiResponse<ReportPageResponse>>("/admin/reports", {
      params: buildPagedQuery(params),
    }),

  get: (id: number | string) =>
    get<ApiResponse<ReportResponse>>(`/admin/reports/${id}`),

  create: (data: CreateReportRequest) =>
    post<ApiResponse<ReportResponse>>("/admin/reports", data),
};
