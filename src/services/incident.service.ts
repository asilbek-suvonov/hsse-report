import { get, put } from "@/api/client";
import { withRolePrefix } from "@/api/role-endpoint";
import type { AppRole } from "@/store/useAuthStore";
import { IncidentResponse, IncidentStatusRequest, AssignRequest, IncidentType, IncidentListParams } from "@/types/incident";
import { ApiResponse } from "@/types/auth";
import { buildPagedQuery } from "@/lib/api-query";

export const incidentService = {
  list: (params: IncidentListParams, role?: AppRole | null) =>
    get<ApiResponse<{ content: IncidentResponse[]; totalPages: number; totalElements: number }>>(
      withRolePrefix("/incidents", role),
      { params: buildPagedQuery(params) },
    ),

  get: (id: number | string, role?: AppRole | null) =>
    get<ApiResponse<IncidentResponse>>(withRolePrefix(`/incidents/${id}`, role)),

  updateStatus: (id: number | string, data: IncidentStatusRequest, role?: AppRole | null) =>
    put<ApiResponse<IncidentResponse>>(withRolePrefix(`/incidents/${id}/status`, role), data),

  assign: (id: number | string, data: AssignRequest, role?: AppRole | null) =>
    put<ApiResponse<IncidentResponse>>(withRolePrefix(`/incidents/${id}/assign`, role), data),

  listTypes: () =>
    get<ApiResponse<IncidentType[]>>("/super-admin/incident-types"),
};
