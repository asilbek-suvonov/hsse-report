import { get, post } from "@/api/client";
import { MessageResponse, MessageRequest } from "@/types/message";
import { ApiResponse } from "@/types/auth";

export const messageService = {
  list: () =>
    get<ApiResponse<MessageResponse[]>>("/admin/messages"),

  send: (data: MessageRequest) =>
    post<ApiResponse<MessageResponse>>("/admin/messages", data),
};
