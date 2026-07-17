import type { CalendarEventResponse, DayData, DayState } from "@/types/calendar";

function getMonthDates(year: number, month: number) {
  const days = new Date(year, month + 1, 0).getDate();
  return Array.from({ length: days }, (_, index) => {
    const day = index + 1;
    return `${year}-${String(month + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
  });
}

export function mapCalendarEventsToDays(events: CalendarEventResponse[], year: number, month: number): DayData[] {
  const byDate = events.reduce<Record<string, CalendarEventResponse[]>>((acc, event) => {
    const date = event.startTime.slice(0, 10);
    acc[date] = [...(acc[date] || []), event];
    return acc;
  }, {});

  return getMonthDates(year, month).map((date) => {
    const dayEvents = byDate[date] || [];
    return {
      date,
      nearmiss: 0,
      observation: 0,
      accident: 0,
      incident: dayEvents.length,
      reports: dayEvents.map((event) => ({
        id: String(event.id),
        title: event.title,
        type: "incident",
        status: "new",
        severity: "medium",
        department: event.branchName || "-",
        riskCategory: "Calendar event",
        createdBy: {
          name: event.createdBy?.fullName || event.createdBy?.email || "Admin",
          avatar: event.createdBy?.avatarUrl || `https://avatar.vercel.sh/${event.createdBy?.id || event.id}`,
        },
        time: new Date(event.startTime).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }),
        description: event.description || "",
      })),
    };
  });
}

export function getCalendarDayState(day: DayData): DayState {
  const total = day.nearmiss + day.observation + day.accident + day.incident;
  if (total === 0) return "empty";
  if (day.accident > 0 || day.incident >= 3) return "critical";
  if (day.incident > 0 || day.observation > 0) return "warning";
  return "normal";
}
