import { UserResponse } from "./auth";

export interface IncidentResponse {
  id: number;
  title: string;
  description?: string | null;
  incidentTypeId?: number | null;
  incidentTypeName?: string | null;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  status: "OPEN" | "INVESTIGATING" | "RESOLVED" | "CLOSED";
  location?: string | null;
  branchId?: number | null;
  branchName?: string | null;
  reportedBy?: UserResponse | null;
  assignedTo?: UserResponse | null;
  incidentDate: string;
  resolvedAt?: string | null;
  createdAt: string;
}

export interface CreateIncidentRequest {
  title: string;
  description: string;
  incidentTypeId: number;
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  location?: string | null;
  incidentDate: string;
}

export interface IncidentStatusRequest {
  status: "OPEN" | "INVESTIGATING" | "RESOLVED" | "CLOSED";
}

export interface AssignRequest {
  assignedTo: number;
}

export interface IncidentType {
  id: number;
  name: string;
  description?: string | null;
  active: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export interface IncidentListParams {
  page?: number;
  size?: number;
  sort?: string | string[];
  status?: IncidentResponse["status"];
  severity?: IncidentResponse["severity"];
  search?: string;
  incidentTypeId?: number;
  branchId?: number;
  reportedById?: number;
}
