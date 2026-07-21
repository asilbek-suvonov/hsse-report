import { get } from "@/api/client";
import { withRolePrefix } from "@/api/role-endpoint";
import type { AppRole } from "@/store/useAuthStore";
import type { ApiResponse } from "@/types/auth";
import type { CalendarEventResponse, CalendarParams } from "@/types/calendar";

export const calendarService = {
  list: (params: CalendarParams, role?: AppRole | null) =>
    get<ApiResponse<CalendarEventResponse[]>>(withRolePrefix("/calendar", role), { params }),
};
