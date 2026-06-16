export type ReportType   = "nearmiss"|"observation"|"accident"|"incident";
export type Severity     = "high"|"medium"|"low";
export type ReportStatus = "new"|"accepted"|"in-progress"|"cancelled"|"completed";
export type DayState     = "normal"|"empty"|"warning"|"critical";

export interface DayReport {
  id: string;
  title: string;
  type: ReportType;
  status: ReportStatus;
  severity: Severity;
  department: string;
  riskCategory: string;
  createdBy: { name: string; avatar: string };
  time: string;
  description: string;
}

export interface DayData {
  date: string;
  nearmiss: number;
  observation: number;
  accident: number;
  incident: number;
  reports: DayReport[];
}

export interface CalendarFilters {
  reportType:   ReportType[];
  riskCategory: string[];
  department:   string[];
  severity:     Severity[];
  status:       ReportStatus[];
}
