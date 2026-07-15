"use client";

import { cn } from "@/lib/utils";
import { ChatMessage, ChatUser } from "@/types/chat";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

const STATUS_DOT: Record<string, string> = {
  online: "bg-green-500", away: "bg-yellow-400", offline: "bg-gray-300 dark:bg-dark-4",
};

function ReadIcon({ status }: { status: string }) {
  if (status === "read") return (
    <svg width="15" height="10" viewBox="0 0 18 12" fill="none">
      <path d="M1 6l4 4L13 1" stroke="#5750F1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 10l7-9" stroke="#5750F1" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  if (status === "delivered") return (
    <svg width="15" height="10" viewBox="0 0 18 12" fill="none">
      <path d="M1 6l4 4L13 1" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M6 10l7-9" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
  return (
    <svg width="12" height="10" viewBox="0 0 14 10" fill="none">
      <path d="M1 5l4 4L13 1" stroke="#9ca3af" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function formatDate(d: string) {
  const today     = new Date().toISOString().slice(0, 10);
  const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
  if (d === today)     return "Bugun";
  if (d === yesterday) return "Kecha";
  return new Date(d).toLocaleDateString("uz-UZ", { day: "2-digit", month: "long", year: "numeric" });
}

interface Props {
  user: ChatUser;
  messages: ChatMessage[];
  onSend: (text: string) => void;
  onUserClick: () => void;
}

export function ChatWindow({ user, messages, onSend, onUserClick }: Props) {
  const [input, setInput]       = useState("");
  const [imgPreview, setImgPreview] = useState<string | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const fileRef   = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = () => {
    const t = input.trim();
    if (!t && !imgPreview) return;
    onSend(t || "(Rasm)");
    setInput("");
    setImgPreview(null);
    setTimeout(() => textareaRef.current?.focus(), 0);
  };

  const handleKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = ev => setImgPreview(ev.target?.result as string);
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  // Group by date
  const grouped: { date: string; msgs: ChatMessage[] }[] = [];
  messages.forEach(msg => {
    const last = grouped[grouped.length - 1];
    if (last && last.date === msg.date) last.msgs.push(msg);
    else grouped.push({ date: msg.date, msgs: [msg] });
  });

  return (
    <div className="flex h-full  flex-col bg-gray-50/40 dark:bg-[#020d1a]/40">
      {/* ── Header ── */}
      <div className="flex items-center justify-between border-b border-stroke bg-white px-4 py-3 dark:border-dark-3 dark:bg-gray-dark">
        <button
          onClick={onUserClick}
          aria-label={`${user.name} profilini ko'rish`}
          className="flex items-center gap-3 rounded-xl px-2 py-1.5 transition hover:bg-gray-50 dark:hover:bg-dark-2 text-left"
        >
          <div className="relative">
            <div className="relative h-10 w-10 overflow-hidden rounded-full bg-gray-100 dark:bg-dark-3">
              <Image src={user.avatar} alt={user.name} fill sizes="40px" className="object-cover"/>
            </div>
            <span className={cn("absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-white dark:border-gray-dark", STATUS_DOT[user.status])}/>
          </div>
          <div>
            <p className="text-sm font-semibold text-dark dark:text-white leading-tight">{user.name}</p>
            <p className={cn("flex items-center gap-1 text-xs",
              user.status === "online" ? "text-green-500" : "text-gray-400 dark:text-dark-6")}>
              <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[user.status])}/>
              {user.status === "online" ? "Online" : user.status === "away" ? "Away" : `Ko'rildi: ${user.lastSeen}`}
            </p>
          </div>
        </button>

        {/* Action icons */}
   
      </div>

      {/* ── Messages ── */}
      <div className="flex-1 overflow-y-auto hide-scrollbar px-4 py-4">
        {messages.length === 0 && (
          <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-400 dark:text-dark-6">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 dark:bg-dark-3">
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
                <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="text-sm">Hali xabarlar yo'q. Birinchi bo'lib yozing!</p>
          </div>
        )}

        {grouped.map(group => (
          <div key={group.date}>
            {/* Date separator */}
            <div className="my-4 flex items-center justify-center">
              <span className="rounded-full bg-white/80 px-3 py-1 text-[11px] font-medium text-gray-400 shadow-sm dark:bg-dark-2 dark:text-dark-6">
                {formatDate(group.date)}
              </span>
            </div>

            {group.msgs.map(msg => {
              const isMe = msg.senderId === "me";
              return (
                <div key={msg.id} className={cn("group mb-2 flex", isMe ? "justify-end" : "justify-start")}>
                  {/* Incoming avatar */}
                  {!isMe && (
                    <div className="relative mr-2 mt-auto h-7 w-7 shrink-0 overflow-hidden rounded-full bg-gray-100 dark:bg-dark-3">
                      <Image src={user.avatar} alt="" fill sizes="28px" className="object-cover"/>
                    </div>
                  )}

                  <div className={cn("flex max-w-[72%] flex-col", isMe ? "items-end" : "items-start")}>
                    {/* Bubble */}
                    <div className={cn(
                      "relative rounded-2xl px-4 py-2.5 shadow-sm",
                      isMe
                        ? "rounded-br-sm bg-primary text-white"
                        : "rounded-bl-sm border border-stroke bg-white text-dark dark:border-dark-3 dark:bg-dark-2 dark:text-white",
                    )}>
                      {/* Image message */}
                      {msg.imageUrl && (
                        <div className="mb-1 overflow-hidden rounded-xl">
                          <Image src={msg.imageUrl} alt="rasm" width={240} height={160} className="object-cover"/>
                        </div>
                      )}

                      {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}

                   

                      {/* Time + status */}
                      <div className={cn("mt-0.5 flex items-center gap-1",
                        isMe ? "justify-end" : "justify-start")}>
                        <span className={cn("text-[10px]",
                          isMe ? "text-white/70" : "text-gray-400 dark:text-dark-6")}>
                          {msg.timestamp}
                        </span>
                        {isMe && <ReadIcon status={msg.status}/>}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        ))}
        <div ref={bottomRef}/>
      </div>

      {/* ── Image preview ── */}
      {imgPreview && (
        <div className="mx-4 mb-2 flex items-center gap-2 rounded-xl border border-stroke bg-white p-2 dark:border-dark-3 dark:bg-dark-2">
          <div className="relative h-14 w-14 overflow-hidden rounded-lg">
            <Image src={imgPreview} alt="preview" fill className="object-cover"/>
          </div>
          <span className="flex-1 text-xs text-gray-500 dark:text-dark-6">Rasm yuborishga tayyor</span>
          <button onClick={() => setImgPreview(null)} aria-label="Bekor qilish"
            className="text-gray-400 hover:text-red-500">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
              <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
      )}

      {/* ── Composer ── */}
      <div className="border-t border-stroke bg-white px-3 py-1 dark:border-dark-3 dark:bg-gray-dark">
        <div className="flex items-end gap-2 rounded-2xl border border-stroke bg-gray-50 px-3 py-2.5 transition focus-within:border-primary dark:border-dark-3 dark:bg-dark-2 h-fit">
          {/* Emoji */}
          <button aria-label="Emoji" className="mb-0.5 shrink-0 text-gray-400 transition hover:text-primary">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
              <path d="M8 13s1.5 2 4 2 4-2 4-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              <circle cx="9" cy="10" r="0.8" fill="currentColor"/>
              <circle cx="15" cy="10" r="0.8" fill="currentColor"/>
            </svg>
          </button>

      

          {/* Attachment */}
          <label className="mb-0.5 shrink-0 cursor-pointer text-gray-400 transition hover:text-primary" aria-label="Fayl biriktirish">
            <input type="file" className="sr-only"/>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
              <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </label>

          {/* Input */}
          <textarea
            ref={textareaRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Xabar yozing..."
            rows={1}
            aria-label="Xabar yozish"
            className="flex-1 resize-none bg-transparent text-sm text-dark outline-none placeholder:text-gray-400 dark:text-white"
            style={{ maxHeight: 120 }}
          />

          {/* Send */}
          <button
            onClick={handleSend}
            disabled={!input.trim() && !imgPreview}
            aria-label="Xabar yuborish"
            className="mb-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:bg-opacity-90 disabled:opacity-40 disabled:cursor-not-allowed active:scale-95"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <line x1="22" y1="2" x2="11" y2="13" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <polygon points="22 2 15 22 11 13 2 9 22 2" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
       
      </div>
    </div>
  );
}
