import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { employeeService, BranchListParams, CreateEmployeeRequest, EmployeeListParams, UpdateEmployeeRequest } from "@/services/employee.service";
import { useAuthStore } from "@/store/useAuthStore";
import { toast } from "sonner";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Xatolik yuz berdi";
}

export function useEmployees(params: EmployeeListParams) {
  const role = useAuthStore((state) => state.role);

  return useQuery({
    queryKey: ["employees", role, params],
    queryFn: async () => {
      const response = await employeeService.list(params, role);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || "Employees failed to load");
    },
  });
}

export function useCreateEmployee() {
  const queryClient = useQueryClient();
  const role = useAuthStore((state) => state.role);

  return useMutation({
    mutationFn: (data: CreateEmployeeRequest) => employeeService.create(data, role),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Xodim muvaffaqiyatli qo'shildi!");
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      } else {
        toast.error(response.message || "Xodim qo'shishda xatolik yuz berdi");
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useUpdateEmployee() {
  const queryClient = useQueryClient();
  const role = useAuthStore((state) => state.role);

  return useMutation({
    mutationFn: ({ id, data }: { id: number | string; data: UpdateEmployeeRequest }) =>
      employeeService.update(id, data, role),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Xodim ma'lumotlari muvaffaqiyatli yangilandi!");
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      } else {
        toast.error(response.message || "Xodim ma'lumotlarini yangilashda xatolik yuz berdi");
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDeleteEmployee() {
  const queryClient = useQueryClient();
  const role = useAuthStore((state) => state.role);

  return useMutation({
    mutationFn: (id: number | string) => employeeService.delete(id, role),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Xodim muvaffaqiyatli o'chirildi!");
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      } else {
        toast.error(response.message || "Xodimni o'chirishda xatolik yuz berdi");
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useToggleEmployee() {
  const queryClient = useQueryClient();
  const role = useAuthStore((state) => state.role);

  return useMutation({
    mutationFn: (id: number | string) => employeeService.toggle(id, role),
    onSuccess: (response) => {
      if (response.success) {
        toast.success("Xodim statusi muvaffaqiyatli o'zgartirildi!");
        queryClient.invalidateQueries({ queryKey: ["employees"] });
        queryClient.invalidateQueries({ queryKey: ["dashboard"] });
      } else {
        toast.error(response.message || "Statusni o'zgartirishda xatolik yuz berdi");
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
}

export function useDepartments() {
  const role = useAuthStore((state) => state.role);

  return useQuery({
    queryKey: ["departments", role],
    queryFn: async () => {
      const response = await employeeService.listDepartments(role);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || "Departments failed to load");
    },
  });
}

export function useBranches(params?: BranchListParams) {
  return useQuery({
    queryKey: ["branches", params],
    queryFn: async () => {
      const response = await employeeService.listBranches(params);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || "Branches failed to load");
    },
  });
}
