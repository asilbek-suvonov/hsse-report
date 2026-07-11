"use client";

import { CHAT_USERS, MOCK_MESSAGES } from "@/data/chat";
import { cn } from "@/lib/utils";
import { ChatMessage, ChatUser } from "@/types/chat";
import { useState } from "react";
import { ChatWindow } from "./ChatWindow";
import { UserInfoModal } from "./UserInfoModal";
import { UserList } from "./UserList";

/* Empty state */
function EmptyState() {
  return (
    <div className="flex h-full  flex-col items-center justify-center gap-4 bg-gray-50/40 dark:bg-[#020d1a]/40">
      <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10">
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" className="text-primary/50">
          <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
        </svg>
      </div>
      <div className="text-center">
        <p className="text-base font-semibold text-dark dark:text-white">Suhbat tanlang</p>
        <p className="mt-1 text-sm text-gray-400 dark:text-dark-6">Chap tarafdagi ro'yxatdan foydalanuvchini tanlang</p>
      </div>
    </div>
  );
}

export function MessagesPage() {
  const [messages, setMessages] = useState<Record<string, ChatMessage[]>>(MOCK_MESSAGES);
  const [activeUser, setActiveUser]     = useState<ChatUser | null>(null);
  const [showInfo,   setShowInfo]       = useState(false);
  const [showList,   setShowList]       = useState(true); // mobile toggle

  const handleSelect = (user: ChatUser) => {
    setActiveUser(user);
    setShowList(false);
    setShowInfo(false);
  };

  const handleSend = (text: string) => {
    if (!activeUser) return;
    const newMsg: ChatMessage = {
      id:        `msg-${Date.now()}`,
      chatId:    activeUser.id,
      senderId:  "me",
      text,
      type:      "text",
      status:    "sent",
      timestamp: new Date().toLocaleTimeString("uz-UZ", { hour: "2-digit", minute: "2-digit" }),
      date:      new Date().toISOString().slice(0, 10),
    };
    setMessages(prev => ({
      ...prev,
      [activeUser.id]: [...(prev[activeUser.id] ?? []), newMsg],
    }));
  };

  return (
    <>
      {/* Full-height layout, overrides main padding */}
      <div
        className="-m-4 overflow-hidden rounded-2xl border border-stroke bg-white shadow-sm dark:border-dark-3 dark:bg-gray-dark md:m-2 2xl:mt-6 "
        style={{ height: "calc(100vh - 73px)" }}
      >
        <div className="flex h-full">
          {/* ── Left: user list ── */}
          <div className={cn(
            "h-full shrink-0 border-r border-stroke dark:border-dark-3",
            "w-full md:w-72 lg:w-80",
            !showList && activeUser ? "hidden md:block" : "block",
          )}>
            <UserList
              users={CHAT_USERS}
              activeId={activeUser?.id ?? null}
              onSelect={handleSelect}
            />
          </div>

          {/* ── Right: chat ── */}
          <div className={cn(
            "flex min-w-0 flex-1 flex-col",
            showList && !activeUser ? "hidden md:flex" : "flex",
            showList && activeUser  ? "hidden md:flex" : "",
          )}>
            {activeUser ? (
              <>
                {/* Mobile back */}
                <div className="flex items-center gap-2 border-b border-stroke bg-white px-3 py-2 dark:border-dark-3 dark:bg-gray-dark md:hidden">
                  <button
                    onClick={() => setShowList(true)}
                    aria-label="Orqaga"
                    className="flex h-8 w-8 items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 dark:hover:bg-dark-2"
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                      <path d="M19 12H5M12 5l-7 7 7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span className="text-sm font-semibold text-dark dark:text-white">{activeUser.name}</span>
                </div>

                <ChatWindow
                  user={activeUser}
                  messages={messages[activeUser.id] ?? []}
                  onSend={handleSend}
                  onUserClick={() => setShowInfo(true)}
                />
              </>
            ) : (
              <EmptyState />
            )}
          </div>
        </div>
      </div>

      {/* User info modal */}
      {showInfo && activeUser && (
        <UserInfoModal user={activeUser} onClose={() => setShowInfo(false)}/>
      )}
    </>
  );
}
