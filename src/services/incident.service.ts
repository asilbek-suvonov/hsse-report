import { get, put } from "@/api/client";
import { IncidentResponse, IncidentStatusRequest, AssignRequest, IncidentType, IncidentListParams } from "@/types/incident";
import { ApiResponse } from "@/types/auth";
import { buildPagedQuery } from "@/lib/api-query";

export const incidentService = {
  list: (params: IncidentListParams) =>
    get<ApiResponse<{ content: IncidentResponse[]; totalPages: number; totalElements: number }>>(
      "/admin/incidents",
      { params: buildPagedQuery(params) },
    ),

  get: (id: number | string) =>
    get<ApiResponse<IncidentResponse>>(`/admin/incidents/${id}`),

  updateStatus: (id: number | string, data: IncidentStatusRequest) =>
    put<ApiResponse<IncidentResponse>>(`/admin/incidents/${id}/status`, data),

  assign: (id: number | string, data: AssignRequest) =>
    put<ApiResponse<IncidentResponse>>(`/admin/incidents/${id}/assign`, data),

  listTypes: () =>
    get<ApiResponse<IncidentType[]>>("/super-admin/incident-types"),
};
