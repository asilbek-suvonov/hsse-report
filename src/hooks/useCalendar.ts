import { useQuery } from "@tanstack/react-query";
import { calendarService } from "@/services/calendar.service";
import type { CalendarParams } from "@/types/calendar";

export function useCalendarEvents(params: CalendarParams) {
  return useQuery({
    queryKey: ["calendar", params],
    queryFn: async () => {
      const response = await calendarService.list(params);
      if (response.success && response.data) return response.data;
      throw new Error(response.message || "Calendar events failed to load");
    },
  });
}
