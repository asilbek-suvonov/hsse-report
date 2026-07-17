import type { UserResponse } from "./auth";

export type ReportType     = "nearmiss" | "observation" | "accident" | "incident";
export type ReportStatus   = "new" | "accepted" | "in-progress" | "cancelled" | "completed";
export type ReportPriority = "high" | "medium" | "low";

export interface ReportAuthor {
  id: string;
  name: string;
  avatar: string;
}

export interface Report {
  id: string;
  reportId: string;       // e.g. RPT-001
  title: string;
  description: string;
  type: ReportType;
  status: ReportStatus;
  priority: ReportPriority;
  department: string;
  riskCategory: string;
  author: ReportAuthor;
  likes: number;
  comments: number;
  attachments: number;
  createdAt: string;      // ISO date string
  updatedAt: string;
}

export interface CreateReportRequest {
  title: string;
  description?: string | null;
  reportTypeId: number;
  fileUrl?: string | null;
}

export interface ReportResponse {
  id: number;
  title: string;
  description?: string | null;
  reportTypeId?: number | null;
  reportTypeName?: string | null;
  branchId?: number | null;
  branchName?: string | null;
  createdBy?: UserResponse | null;
  fileUrl?: string | null;
  createdAt: string;
  updatedAt?: string | null;
}

export interface ReportListParams {
  page?: number;
  size?: number;
  sort?: string | string[];
  search?: string;
  reportTypeId?: number;
  branchId?: number;
  createdById?: number;
  from?: string;
  to?: string;
}

export interface ReportPageResponse {
  content: ReportResponse[];
  totalPages: number;
  totalElements: number;
}
