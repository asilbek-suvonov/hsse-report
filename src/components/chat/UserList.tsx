"use client";

import type { ChatLastMessage } from "@/lib/chat-adapters";
import { cn } from "@/lib/utils";
import { ChatUser } from "@/types/chat";
import Image from "next/image";
import { useState } from "react";

const STATUS_DOT: Record<string, string> = {
  online:  "bg-green-500",
  away:    "bg-yellow-400",
  offline: "bg-gray-300 dark:bg-dark-4",
};

interface Props {
  users: ChatUser[];
  activeId: string | null;
  onSelect: (u: ChatUser) => void;
  lastMessages: Record<string, ChatLastMessage>;
}

export function UserList({ users, activeId, onSelect, lastMessages }: Props) {
  const [q, setQ] = useState("");

  const filtered = users.filter(u =>
    u.name.toLowerCase().includes(q.toLowerCase()) ||
    u.department.toLowerCase().includes(q.toLowerCase()),
  );

  return (
    <div className="flex h-full flex-col border-r border-stroke bg-white dark:border-dark-3 dark:bg-gray-dark">
      {/* Header */}
 

      {/* Search */}
      <div className="px-3 py-2.5">
        <div className="flex items-center gap-2 rounded-xl border border-stroke bg-gray-50 px-3 py-2 transition focus-within:border-primary dark:border-dark-3 dark:bg-dark-2">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="shrink-0 text-gray-400">
            <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="1.8"/>
            <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"/>
          </svg>
          <input
            value={q}
            onChange={e => setQ(e.target.value)}
            placeholder="Qidirish..."
            aria-label="Foydalanuvchi qidirish"
            className="w-full bg-transparent text-sm text-dark outline-none placeholder:text-gray-400 dark:text-white"
          />
          {q && (
            <button onClick={() => setQ("")} aria-label="Tozalash"
              className="shrink-0 text-gray-400 hover:text-dark dark:hover:text-white">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
          )}
        </div>
      </div>

      {/* User list */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-2 pb-3">
        {filtered.length === 0 && (
          <div className="flex flex-col items-center py-10 text-gray-400 dark:text-dark-6">
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" className="mb-2 opacity-40">
              <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
            </svg>
            <p className="text-sm">Topilmadi</p>
          </div>
        )}
        {filtered.map(user => {
          const last   = lastMessages[user.id];
          const active = activeId === user.id;
          return (
            <button
              key={user.id}
              onClick={() => onSelect(user)}
              aria-current={active ? "true" : undefined}
              className={cn(
                "flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left transition-all",
                active
                  ? "bg-primary/8 ring-1 ring-primary/20 dark:bg-primary/15"
                  : "hover:bg-gray-50 dark:hover:bg-dark-2",
              )}
            >
              {/* Avatar */}
              <div className="relative shrink-0">
                <div className="relative h-11 w-11 overflow-hidden rounded-full bg-gray-100 dark:bg-dark-3">
                  <Image src={user.avatar} alt={user.name} fill sizes="44px" className="object-cover"/>
                </div>
                <span className={cn("absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-dark", STATUS_DOT[user.status])} />
              </div>

              {/* Content */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-1">
                  <span className={cn("truncate text-sm font-semibold",
                    active ? "text-primary" : "text-dark dark:text-white")}>
                    {user.name}
                  </span>
                  <span className="shrink-0 text-[11px] text-gray-400 dark:text-dark-6">{last?.time}</span>
                </div>
                <div className="mt-0.5 flex items-center justify-between gap-1">
                  <p className="truncate text-xs text-gray-500 dark:text-dark-6">{last?.text ?? "Hali xabar yo'q"}</p>
                  {last?.unread ? (
                    <span className="flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-primary px-1.5 text-[10px] font-bold text-white">
                      {last.unread}
                    </span>
                  ) : null}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
