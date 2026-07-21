import { useQuery } from "@tanstack/react-query";
import { calendarService } from "@/services/calendar.service";
import { useAuthStore } from "@/store/useAuthStore";
import type { CalendarParams } from "@/types/calendar";

export function useCalendarEvents(params: CalendarParams) {
  const role = useAuthStore((state) => state.role);

  return useQuery({
    queryKey: ["calendar", role, params],
    queryFn: async () => {
      const response = await calendarService.list(params, role);
      if (response.success && response.data) return response.data;
      throw new Error(response.message || "Calendar events failed to load");
    },
  });
}
