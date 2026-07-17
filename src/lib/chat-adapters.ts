import type { MessageResponse } from "@/types/message";
import type { ChatMessage, ChatUser } from "@/types/chat";
import type { UserResponse } from "@/types/auth";

export interface ChatLastMessage {
  text: string;
  time: string;
  unread?: number;
}

function formatTime(value: string) {
  return new Date(value).toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" });
}

function mapUser(user: UserResponse): ChatUser {
  return {
    id: String(user.id),
    name: user.fullName || user.email,
    avatar: user.avatarUrl || `https://avatar.vercel.sh/${user.id}`,
    role: user.role,
    status: user.active ? "online" : "offline",
    lastSeen: user.lastLogin ? formatTime(user.lastLogin) : "-",
    bio: "",
    phone: user.phone || "",
    email: user.email,
    department: user.branchName || "",
  };
}

export function buildChatUsers(messages: MessageResponse[], currentUserId?: number | null): ChatUser[] {
  const users = new Map<string, ChatUser>();

  messages.forEach((message) => {
    const other = message.sender.id === currentUserId ? message.receiver : message.sender;
    users.set(String(other.id), mapUser(other));
  });

  return Array.from(users.values());
}

export function buildChatMessages(messages: MessageResponse[], currentUserId?: number | null): Record<string, ChatMessage[]> {
  return messages.reduce<Record<string, ChatMessage[]>>((acc, message) => {
    const otherId = String(message.sender.id === currentUserId ? message.receiver.id : message.sender.id);
    const date = message.sentAt.slice(0, 10);
    const chatMessage: ChatMessage = {
      id: String(message.id),
      chatId: otherId,
      senderId: message.sender.id === currentUserId ? "me" : String(message.sender.id),
      text: message.content,
      type: "text",
      status: message.read ? "read" : "delivered",
      timestamp: formatTime(message.sentAt),
      date,
    };

    acc[otherId] = [...(acc[otherId] || []), chatMessage];
    return acc;
  }, {});
}

export function buildLastMessages(messages: MessageResponse[], currentUserId?: number | null): Record<string, ChatLastMessage> {
  const lastMessages: Record<string, ChatLastMessage> = {};

  messages.forEach((message) => {
    const otherId = String(message.sender.id === currentUserId ? message.receiver.id : message.sender.id);
    lastMessages[otherId] = {
      text: message.content,
      time: formatTime(message.sentAt),
      unread: message.receiver.id === currentUserId && !message.read ? 1 : undefined,
    };
  });

  return lastMessages;
}
