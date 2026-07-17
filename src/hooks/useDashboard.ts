import { useQuery } from "@tanstack/react-query";
import { dashboardService } from "@/services/dashboard.service";

export function useSuperAdminDashboard() {
  return useQuery({
    queryKey: ["dashboard", "super-admin"],
    queryFn: async () => {
      const response = await dashboardService.getSuperAdminStats();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || "Super Admin dashboard statistics failed to load");
    },
  });
}

export function useAdminDashboard() {
  return useQuery({
    queryKey: ["dashboard", "admin"],
    queryFn: async () => {
      const response = await dashboardService.getAdminStats();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || "Admin dashboard statistics failed to load");
    },
  });
}
