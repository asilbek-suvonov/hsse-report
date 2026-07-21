import { get, post, put, del } from "@/api/client";
import { withRolePrefix } from "@/api/role-endpoint";
import type { AppRole } from "@/store/useAuthStore";
import { ApiResponse, UserResponse } from "@/types/auth";
import { buildPagedQuery } from "@/lib/api-query";

export interface EmployeeResponse {
  id: number;
  user: UserResponse;
  branchId?: number | null;
  branchName?: string | null;
  departmentId?: number | null;
  departmentName?: string | null;
  position?: string | null;
  employeeCode?: string | null;
  hireDate?: string | null;
  status: "ACTIVE" | "INACTIVE" | "ON_LEAVE";
}

export interface CreateEmployeeRequest {
  email: string;
  password: string;
  fullName: string;
  phone?: string | null;
  departmentId?: number | null;
  position?: string | null;
  employeeCode?: string | null;
  hireDate?: string | null;
}

export interface UpdateEmployeeRequest {
  fullName: string;
  phone?: string | null;
  departmentId?: number | null;
  position?: string | null;
  employeeCode?: string | null;
  hireDate?: string | null;
  status: "ACTIVE" | "INACTIVE" | "ON_LEAVE";
}

export interface DepartmentResponse {
  id: number;
  name: string;
  branchId?: number | null;
  branchName?: string | null;
  active: boolean;
}

export interface BranchResponse {
  id: number;
  name: string;
  address?: string | null;
  managerId?: number | null;
  managerName?: string | null;
  createdAt: string;
  active: boolean;
}

export interface EmployeeListParams {
  page?: number;
  size?: number;
  search?: string;
  status?: EmployeeResponse["status"];
  departmentId?: number;
  sort?: string | string[];
}

export interface BranchListParams {
  page?: number;
  size?: number;
  search?: string;
  sort?: string | string[];
}

export const employeeService = {
  list: (params: EmployeeListParams, role?: AppRole | null) =>
    get<ApiResponse<{ content: EmployeeResponse[]; totalPages: number; totalElements: number }>>(
      withRolePrefix("/employees", role),
      { params: buildPagedQuery(params) },
    ),

  get: (id: number | string, role?: AppRole | null) =>
    get<ApiResponse<EmployeeResponse>>(withRolePrefix(`/employees/${id}`, role)),

  create: (data: CreateEmployeeRequest, role?: AppRole | null) =>
    post<ApiResponse<EmployeeResponse>>(withRolePrefix("/employees", role), data),

  update: (id: number | string, data: UpdateEmployeeRequest, role?: AppRole | null) =>
    put<ApiResponse<EmployeeResponse>>(withRolePrefix(`/employees/${id}`, role), data),

  delete: (id: number | string, role?: AppRole | null) =>
    del<ApiResponse<object>>(withRolePrefix(`/employees/${id}`, role)),

  toggle: (id: number | string, role?: AppRole | null) =>
    put<ApiResponse<EmployeeResponse>>(withRolePrefix(`/employees/${id}/toggle`, role)),

  listDepartments: (role?: AppRole | null) =>
    get<ApiResponse<DepartmentResponse[]>>(withRolePrefix("/departments", role)),

  listBranches: (params?: BranchListParams) =>
    get<ApiResponse<{ content: BranchResponse[] }>>("/super-admin/branches", {
      params: buildPagedQuery(params || {}),
    }),
};
