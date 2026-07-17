import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { messageService } from "@/services/message.service";
import { MessageRequest } from "@/types/message";
import { toast } from "sonner";

function getErrorMessage(error: unknown) {
  return error instanceof Error ? error.message : "Xatolik yuz berdi";
}

export function useMessages() {
  return useQuery({
    queryKey: ["messages"],
    queryFn: async () => {
      const response = await messageService.list();
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

  return useMutation({
    mutationFn: (data: MessageRequest) => messageService.send(data),
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
