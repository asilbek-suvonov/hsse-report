import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { messageService } from "@/services/message.service";
import { useAuthStore } from "@/store/useAuthStore";
import { MessageRequest } from "@/types/message";
import { toast } from "sonner";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Xatolik yuz berdi";
}

export function useMessages() {
  const role = useAuthStore((state) => state.role);

  return useQuery({
    queryKey: ["messages", role],
    queryFn: async () => {
      const response = await messageService.list(role);
      if (response.success && response.data) {
        return response.data;
      }
      throw new Error(response.message || "Messages failed to load");
    },
    refetchInterval: 5000, // Poll every 5 seconds for basic chat updates
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  const role = useAuthStore((state) => state.role);

  return useMutation({
    mutationFn: (data: MessageRequest) => messageService.send(data, role),
    onSuccess: (response) => {
      if (response.success) {
        queryClient.invalidateQueries({ queryKey: ["messages"] });
      } else {
        toast.error(response.message || "Xabar yuborishda xatolik yuz berdi");
      }
    },
    onError: (error: unknown) => {
      toast.error(getErrorMessage(error));
    },
  });
}
