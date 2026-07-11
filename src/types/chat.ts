export type MessageStatus = "sent" | "delivered" | "read";
export type MessageType   = "text" | "image" | "file" | "audio" | "video";
export type UserStatus    = "online" | "offline" | "away";

export interface ChatUser {
  id: string;
  name: string;
  avatar: string;
  role: string;
  status: UserStatus;
  lastSeen: string;
  bio: string;
  phone: string;
  email: string;
  department: string;
}

export interface ChatMessage {
  id: string;
  chatId: string;
  senderId: string;      // "me" | user.id
  text?: string;
  type: MessageType;
  status: MessageStatus;
  timestamp: string;
  date: string;
  imageUrl?: string;
  fileName?: string;
  fileSize?: string;
  audioDuration?: string;
  reactions?: { emoji: string; count: number }[];
}

export interface MediaItem {
  id: string;
  type: "image" | "video" | "audio";
  url: string;
  name: string;
  duration?: string;
  size?: string;
  date: string;
}
