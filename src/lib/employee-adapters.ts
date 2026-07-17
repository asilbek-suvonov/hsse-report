import type { Employee } from "@/types/employee";
import type {
  CreateEmployeeRequest,
  EmployeeResponse,
  UpdateEmployeeRequest,
} from "@/services/employee.service";

function splitName(fullName?: string | null) {
  const parts = (fullName || "").trim().split(/\s+/).filter(Boolean);
  return {
    firstName: parts[0] || "",
    lastName: parts.slice(1).join(" ") || "",
  };
}

export function mapApiEmployeeToEmployee(employee: EmployeeResponse): Employee {
  const name = splitName(employee.user.fullName);
  const role =
    employee.user.role === "SUPER_ADMIN"
      ? "super_admin"
      : employee.user.role === "ADMIN"
        ? "admin"
        : "employee";

  return {
    id: String(employee.id),
    employeeId: employee.employeeCode || `EMP-${String(employee.id).padStart(3, "0")}`,
    firstName: name.firstName,
    lastName: name.lastName,
    email: employee.user.email,
    phone: employee.user.phone || "",
    avatar: employee.user.avatarUrl || `https://avatar.vercel.sh/${employee.user.id}`,
    birthDate: "",
    gender: "male",
    branch: employee.branchName || "",
    department: employee.departmentName || "",
    position: employee.position || "",
    employmentType: "full_time",
    role,
    status: employee.status === "ACTIVE" ? "active" : "inactive",
    permissions: [],
    username: employee.user.email,
    lastLogin: employee.user.lastLogin || "-",
    createdAt: employee.user.createdAt,
  };
}

type EmployeeFormPayload = Omit<Employee, "id" | "employeeId" | "createdAt" | "lastLogin">;
type CreateEmployeeFormPayload = EmployeeFormPayload & {
  password: string;
  departmentId?: number | null;
};
type UpdateEmployeeFormPayload = EmployeeFormPayload & {
  departmentId?: number | null;
};

export function mapEmployeeFormToCreateRequest(employee: CreateEmployeeFormPayload): CreateEmployeeRequest {
  return {
    email: employee.email,
    password: employee.password,
    fullName: `${employee.firstName} ${employee.lastName}`.trim(),
    phone: employee.phone || null,
    departmentId: employee.departmentId ?? null,
    position: employee.position || null,
  };
}

export function mapEmployeeFormToUpdateRequest(employee: UpdateEmployeeFormPayload): UpdateEmployeeRequest {
  return {
    fullName: `${employee.firstName} ${employee.lastName}`.trim(),
    phone: employee.phone || null,
    departmentId: employee.departmentId ?? null,
    position: employee.position || null,
    status: employee.status === "active" ? "ACTIVE" : "INACTIVE",
  };
}
