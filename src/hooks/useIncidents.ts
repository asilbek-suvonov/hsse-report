import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { incidentService } from "@/services/incident.service";
import { useAuthStore } from "@/store/useAuthStore";
import { IncidentStatusRequest, AssignRequest, IncidentListParams } from "@/types/incident";
import { toast } from "sonner";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Xatolik yuz berdi";
}

export function useIncidents(params: IncidentListParams) {
  const role = useAuthStore((state) => state.role);

  return useQuery({
    queryKey: ["incidents", role, params],
    queryFn: async () => {
      const response = await incidentService.list(params, role);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || "Incidents failed to load");
    },
  });
}

export function useIncidentDetails(id: number | string | null) {
  const role = useAuthStore((state) => state.role);

  return useQuery({
    queryKey: ["incidents", role, "detail", id],
    queryFn: async () => {
      if (!id) return null;
      const response = await incidentService.get(id, role);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || "Incident details failed to load");
    },
    enabled: !!id,
  });
}

export function useUpdateIncidentStatus() {
  const queryClient = useQueryClient();
  const role = useAuthStore((state) => state.role);

  return useMutation({
    mutationFn: ({ id, status }: { id: number | string; status: IncidentStatusRequest["status"] }) =>
      incidentService.updateStatus(id, { status }, role),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Hodisa statusi muvaffaqiyatli yangilandi!");
        queryClient.invalidateQueries({ queryKey: ["incidents"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      } else {
        toast.error(response.message || "Statusni yangilashda xatolik yuz berdi");
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useAssignIncident() {
  const queryClient = useQueryClient();
  const role = useAuthStore((state) => state.role);

  return useMutation({
    mutationFn: ({ id, assignedTo }: { id: number | string; assignedTo: number }) =>
      incidentService.assign(id, { assignedTo }, role),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Mas'ul muvaffaqiyatli biriktirildi!");
        queryClient.invalidateQueries({ queryKey: ["incidents"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      } else {
        toast.error(response.message || "Mas'ul biriktirishda xatolik yuz berdi");
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useIncidentTypes() {
  return useQuery({
    queryKey: ["incident-types"],
    queryFn: async () => {
      const response = await incidentService.listTypes();
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || "Incident types failed to load");
    },
  });
}
