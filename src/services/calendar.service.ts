import { get } from "@/api/client";
import type { ApiResponse } from "@/types/auth";
import type { CalendarEventResponse, CalendarParams } from "@/types/calendar";

export const calendarService = {
  list: (params: CalendarParams) =>
    get<ApiResponse<CalendarEventResponse[]>>("/admin/calendar", { params }),
};
