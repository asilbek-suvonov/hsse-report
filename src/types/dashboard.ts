import type { IncidentResponse } from "./incident";

export interface AuditLogResponse {
  id: number;
  userId?: number | null;
  userName?: string | null;
  userEmail?: string | null;
  action: string;
  details?: string | null;
  ipAddress?: string | null;
  createdAt: string;
}

export type DashboardCountMap = Record<string, number>;

export interface TaskResponse {
  id: number;
  title: string;
  description?: string | null;
  status?: string | null;
  priority?: string | null;
  dueDate?: string | null;
  createdAt?: string | null;
}

export interface SuperAdminDashboardResponse {
  totalAdmins: number;
  totalClients: number;
  totalBranches: number;
  totalIncidents: number;
  openIncidents: number;
  resolvedIncidents: number;
  totalTasks: number;
  completedTasks: number;
  incidentsByMonth: DashboardCountMap[];
  incidentsBySeverity: DashboardCountMap;
  tasksByStatus: DashboardCountMap;
  recentActivities: AuditLogResponse[];
}

export interface AdminDashboardResponse {
  branchName?: string | null;
  totalEmployees: number;
  activeEmployees: number;
  myProjects: number;
  activeTasks: number;
  openIncidents: number;
  tasksByStatus: DashboardCountMap;
  recentIncidents: IncidentResponse[];
  upcomingTasks: TaskResponse[];
}
