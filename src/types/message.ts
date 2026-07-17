import { UserResponse } from "./auth";

export interface MessageResponse {
  id: number;
  sender: UserResponse;
  receiver: UserResponse;
  content: string;
  sentAt: string;
  read: boolean;
}

export interface MessageRequest {
  receiverId: number;
  content: string;
}
