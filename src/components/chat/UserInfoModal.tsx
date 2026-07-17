"use client";

import { cn } from "@/lib/utils";
import { ChatUser, MediaItem } from "@/types/chat";
import Image from "next/image";
import { useEffect, useState } from "react";

const STATUS_LABEL: Record<string, string> = { online:"Online", away:"Away", offline:"Offline" };
const STATUS_COLOR: Record<string, string> = { online:"text-green-500", away:"text-yellow-500", offline:"text-gray-400 dark:text-dark-6" };
const STATUS_DOT:   Record<string, string> = { online:"bg-green-500", away:"bg-yellow-400", offline:"bg-gray-300 dark:bg-dark-4" };
const USER_MEDIA: MediaItem[] = [];

type MediaTab = "images" | "videos" | "audio";

function PlayIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="text-white">
      <polygon points="5 3 19 12 5 21 5 3"/>
    </svg>
  );
}

function WaveIcon() {
  return (
    <svg width="40" height="20" viewBox="0 0 40 20" fill="none">
      {[2,6,10,14,18,22,26,30,34,38].map((x,i) => (
        <rect key={i} x={x} y={10 - (i%3)*3 - 2} width="2" height={(i%3)*3 + 6} rx="1" fill="#5750F1"/>
      ))}
    </svg>
  );
}

interface Props {
  user: ChatUser;
  onClose: () => void;
}

export function UserInfoModal({ user, onClose }: Props) {
  const [mediaTab, setMediaTab] = useState<MediaTab>("images");

  useEffect(() => {
    const h = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", h);
    return () => document.removeEventListener("keydown", h);
  }, [onClose]);

  const images = USER_MEDIA.filter((m): m is MediaItem & { type: "image" } => m.type === "image");
  const videos = USER_MEDIA.filter((m): m is MediaItem & { type: "video" } => m.type === "video");
  const audios  = USER_MEDIA.filter((m): m is MediaItem & { type: "audio" } => m.type === "audio");

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className="fixed inset-0 z-9600 bg-black/50 backdrop-blur-sm"
        aria-hidden="true"
      />

      {/* Modal */}
      <div
        role="dialog"
        aria-modal="true"
        aria-label={`${user.name} profili`}
        className="fixed left-1/2 top-1/2 z-9700 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl bg-white shadow-2xl dark:bg-gray-dark"
      >
        {/* Close */}
        <button
          onClick={onClose}
          aria-label="Yopish"
          className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg text-gray-400 transition hover:bg-gray-100 hover:text-dark dark:hover:bg-dark-2 dark:hover:text-white"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
            <path d="M18 6L6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </button>

        {/* Scrollable body */}
        <div className="max-h-[85vh] overflow-y-auto hide-scrollbar rounded-2xl">
          {/* Hero */}
          <div className="flex flex-col items-center bg-linear-to-b from-primary/8 to-transparent px-6 pb-5 pt-8">
            <div className="relative mb-3">
              <div className="relative h-20 w-20 overflow-hidden rounded-full ring-4 ring-white shadow-md dark:ring-gray-dark">
                <Image src={user.avatar} alt={user.name} fill sizes="80px" className="object-cover"/>
              </div>
              <span className={cn("absolute bottom-0.5 right-0.5 h-4 w-4 rounded-full border-2 border-white dark:border-gray-dark", STATUS_DOT[user.status])}/>
            </div>
            <h3 className="text-lg font-bold text-dark dark:text-white">{user.name}</h3>
            <span className="mt-0.5 rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-semibold text-primary">
              {user.role}
            </span>
            <p className={cn("mt-1 flex items-center gap-1 text-xs font-medium", STATUS_COLOR[user.status])}>
              <span className={cn("h-1.5 w-1.5 rounded-full", STATUS_DOT[user.status])}/>
              {STATUS_LABEL[user.status]}
            </p>
          </div>

          {/* Info */}
          <div className="px-5 pb-3">
            {user.bio && (
              <div className="mb-4 rounded-xl border border-stroke bg-gray-50/60 p-3.5 dark:border-dark-3 dark:bg-dark-2/60">
                <p className="text-sm leading-relaxed text-dark dark:text-white">{user.bio}</p>
              </div>
            )}

            <div className="space-y-2.5 mb-5">
              {[
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>, label: "Telefon", value: user.phone },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><polyline points="22,6 12,13 2,6" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>, label: "Email", value: user.email },
                { icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>, label: "Bo'lim", value: user.department },
              ].map(row => (
                <div key={row.label} className="flex items-center gap-3">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-100 text-gray-500 dark:bg-dark-3 dark:text-dark-6">
                    {row.icon}
                  </div>
                  <div>
                    <p className="text-[10px] text-gray-400 dark:text-dark-6">{row.label}</p>
                    <p className="text-sm font-medium text-dark dark:text-white">{row.value}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Media tabs */}
            <div className="mb-3 flex items-center gap-1 rounded-xl border border-stroke bg-gray-50 p-1 dark:border-dark-3 dark:bg-dark-2">
              {(["images","videos","audio"] as MediaTab[]).map(tab => (
                <button
                  key={tab}
                  onClick={() => setMediaTab(tab)}
                  className={cn(
                    "flex-1 rounded-lg py-1.5 text-xs font-medium transition",
                    mediaTab === tab
                      ? "bg-white shadow-sm text-dark dark:bg-gray-dark dark:text-white"
                      : "text-gray-400 hover:text-dark dark:text-dark-6 dark:hover:text-white",
                  )}
                >
                  {tab === "images" ? `Rasmlar (${images.length})` : tab === "videos" ? `Video (${videos.length})` : `Audio (${audios.length})`}
                </button>
              ))}
            </div>

            {/* Media content */}
            {mediaTab === "images" && (
              <div className="grid grid-cols-3 gap-1.5">
                {images.map(m => (
                  <div key={m.id} className="relative aspect-square overflow-hidden rounded-xl bg-gray-100 dark:bg-dark-3">
                    <Image src={m.url} alt={m.name} fill sizes="100px" className="object-cover transition hover:scale-105"/>
                  </div>
                ))}
              </div>
            )}

            {mediaTab === "videos" && (
              <div className="grid grid-cols-2 gap-2">
                {videos.map(m => (
                  <div key={m.id} className="relative aspect-video overflow-hidden rounded-xl bg-dark-3">
                    <div className="flex h-full items-center justify-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black/50 backdrop-blur-sm">
                        <PlayIcon />
                      </div>
                    </div>
                    <div className="absolute bottom-1.5 left-2 text-[10px] font-medium text-white/90">{m.duration}</div>
                    <div className="absolute bottom-1.5 right-2 text-[10px] text-white/70 truncate max-w-[70%]">{m.name}</div>
                  </div>
                ))}
              </div>
            )}

            {mediaTab === "audio" && (
              <div className="flex flex-col gap-2">
                {audios.map(m => (
                  <div key={m.id}
                    className="flex items-center gap-3 rounded-xl border border-stroke bg-gray-50/60 px-3 py-2.5 dark:border-dark-3 dark:bg-dark-2/60">
                    <button
                      aria-label={`${m.name} ni ijro etish`}
                      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary text-white transition hover:bg-opacity-90"
                    >
                      <PlayIcon />
                    </button>
                    <div className="flex-1 min-w-0">
                      <p className="truncate text-xs font-semibold text-dark dark:text-white">{m.name}</p>
                      <div className="mt-1"><WaveIcon /></div>
                    </div>
                    <div className="shrink-0 text-right">
                      <p className="text-xs font-medium text-primary">{m.duration}</p>
                      <p className="text-[10px] text-gray-400 dark:text-dark-6">{m.size}</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
