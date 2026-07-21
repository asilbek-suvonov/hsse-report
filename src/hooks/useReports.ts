import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { reportService } from "@/services/report.service";
import { useAuthStore } from "@/store/useAuthStore";
import type { CreateReportRequest, ReportListParams } from "@/types/report";
import { toast } from "sonner";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Xatolik yuz berdi";
}

export function useReports(params: ReportListParams) {
  const role = useAuthStore((state) => state.role);

  return useQuery({
    queryKey: ["reports", role, params],
    queryFn: async () => {
      const response = await reportService.list(params, role);
      if (response.success && response.data) return response.data;
      throw new Error(response.message || "Reports failed to load");
    },
  });
}

export function useReportDetails(id: number | string | null) {
  const role = useAuthStore((state) => state.role);

  return useQuery({
    queryKey: ["reports", role, "detail", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await reportService.get(id, role);
      if (response.success && response.data) return response.data;
      throw new Error(response.message || "Report details failed to load");
    },
    enabled: Boolean(id),
  });
}

export function useCreateReport() {
  const queryClient = useQueryClient();
  const role = useAuthStore((state) => state.role);

  return useMutation({
    mutationFn: (data: CreateReportRequest) => reportService.create(data, role),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Hisobot muvaffaqiyatli yaratildi!");
        queryClient.invalidateQueries({ queryKey: ["reports"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      } else {
        toast.error(response.message || "Hisobot yaratishda xatolik yuz berdi");
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
}
