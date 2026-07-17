import { get, post, put, del } from "@/api/client";
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
  list: (params: EmployeeListParams) =>
    get<ApiResponse<{ content: EmployeeResponse[]; totalPages: number; totalElements: number }>>(
      "/admin/employees",
      { params: buildPagedQuery(params) },
    ),

  get: (id: number | string) =>
    get<ApiResponse<EmployeeResponse>>(`/admin/employees/${id}`),

  create: (data: CreateEmployeeRequest) =>
    post<ApiResponse<EmployeeResponse>>("/admin/employees", data),

  update: (id: number | string, data: UpdateEmployeeRequest) =>
    put<ApiResponse<EmployeeResponse>>(`/admin/employees/${id}`, data),

  delete: (id: number | string) =>
    del<ApiResponse<object>>(`/admin/employees/${id}`),

  toggle: (id: number | string) =>
    put<ApiResponse<EmployeeResponse>>(`/admin/employees/${id}/toggle`),

  listDepartments: () =>
    get<ApiResponse<DepartmentResponse[]>>("/admin/departments"),

  listBranches: (params?: BranchListParams) =>
    get<ApiResponse<{ content: BranchResponse[] }>>("/super-admin/branches", {
      params: buildPagedQuery(params || {}),
    }),
};
