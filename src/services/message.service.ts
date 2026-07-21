import { get, post } from "@/api/client";
import { withRolePrefix } from "@/api/role-endpoint";
import type { AppRole } from "@/store/useAuthStore";
import { MessageResponse, MessageRequest } from "@/types/message";
import { ApiResponse } from "@/types/auth";

export const messageService = {
  list: (role?: AppRole | null) =>
    get<ApiResponse<MessageResponse[]>>(withRolePrefix("/messages", role)),

  send: (data: MessageRequest, role?: AppRole | null) =>
    post<ApiResponse<MessageResponse>>(withRolePrefix("/messages", role), data),
};
