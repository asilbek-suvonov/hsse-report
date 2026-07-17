import type { Report, ReportPriority, ReportResponse, ReportStatus, ReportType } from "@/types/report";

function mapReportType(name?: string | null): ReportType {
  const value = (name || "").toLowerCase();
  if (value.includes("near")) return "nearmiss";
  if (value.includes("observ")) return "observation";
  if (value.includes("accident")) return "accident";
  if (value.includes("incident")) return "incident";
  return "incident";
}

function inferPriority(type: ReportType): ReportPriority {
  if (type === "accident" || type === "incident") return "high";
  if (type === "observation") return "medium";
  return "low";
}

export function mapApiReportToReport(report: ReportResponse): Report {
  const type = mapReportType(report.reportTypeName);
  const createdAt = report.createdAt || new Date().toISOString();

  return {
    id: String(report.id),
    reportId: `RPT-${String(report.id).padStart(3, "0")}`,
    title: report.title,
    description: report.description || "",
    type,
    status: "new" satisfies ReportStatus,
    priority: inferPriority(type),
    department: report.branchName || "-",
    riskCategory: report.reportTypeName || "-",
    author: {
      id: String(report.createdBy?.id || "system"),
      name: report.createdBy?.fullName || report.createdBy?.email || "Noma'lum",
      avatar: report.createdBy?.avatarUrl || `https://avatar.vercel.sh/${report.createdBy?.id || report.id}`,
    },
    likes: 0,
    comments: 0,
    attachments: report.fileUrl ? 1 : 0,
    createdAt,
    updatedAt: createdAt,
  };
}
