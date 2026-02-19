"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PanelRightClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { RailSkeleton } from "@/components/ag-ui/skeleton";
import type { DwsThread } from "@/components/ws/types";
import { useGlobalModal } from "@/components/ws/global-modal-provider";

type Props = {
  chats: DwsThread[];
  activeChatId: string | null;
  isLoading: boolean;
  isOpen: boolean;
  user: { name?: string; email?: string; image?: string | null } | null | undefined;
  dwsId: string;
  onToggle: () => void;
  onNewChat: () => void;
  onSelectChat: (chatId: string) => void;
  onDeleteChat: (chatId: string) => void;
};

export function ChatSidebar({
  dwsId,
  chats,
  activeChatId,
  isLoading,
  isOpen,
  user,
  onToggle,
  onNewChat,
  onSelectChat,
  onDeleteChat,
}: Props) {
  const [query, setQuery] = useState("");
  const { openModal } = useGlobalModal();

  const filteredChats = useMemo(() => {
    const text = query.trim().toLowerCase();
    if (!text) return chats;

    return chats.filter((chat) =>
      (chat.title ?? "بدون عنوان").toLowerCase().includes(text),
    );
  }, [chats, query]);


  return (
    <aside
      className={cn(
        "hidden shrink-0 overflow-hidden bg-white/40 backdrop-blur-3xl transition-all duration-300 ease-in-out md:flex md:flex-col",
        isOpen ? "md:w-[320px]" : "md:w-0",
      )}
    >
      <div className="flex items-center justify-between p-8">
        <div className="flex items-center gap-2 text-2xl font-black tracking-tight" title={dwsId}>
          <span>عنان.</span>
        </div>
        <button
          onClick={onToggle}
          className="rounded-xl border border-black/5 bg-white/50 p-2 text-slate-400 transition-all hover:bg-white hover:text-black hover:shadow-sm"
          aria-label="إغلاق الشريط الجانبي"
        >
          <PanelRightClose className="h-4 w-4" />
        </button>
      </div>

      <div className="space-y-4 px-8 pb-8">
        <Button
          className="h-12 w-full justify-center rounded-2xl bg-black text-white hover:bg-black/90 text-[11px] font-black uppercase tracking-[0.2em]"
          onClick={onNewChat}
        >
          <span className="flex items-center gap-2">
            <span>+</span>
            <span>محادثة جديدة</span>
          </span>
        </Button>
        <div className="relative">
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="ابحث في المحادثات..."
            className="h-10 w-full rounded-xl bg-black/5 px-4 text-[10px] font-black uppercase tracking-widest outline-none transition-all focus:bg-black/10 placeholder:text-slate-300"
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-4 py-2">
        {isLoading ? (
          <div className="space-y-4">
            <RailSkeleton />
            <RailSkeleton />
            <RailSkeleton />
          </div>
        ) : filteredChats.length === 0 ? (
          <p className="rounded-[2rem] border border-dashed border-black/5 p-8 text-center text-[10px] font-black uppercase tracking-[0.2em] text-slate-300">
            لا توجد محادثات
          </p>
        ) : (
          filteredChats.map((chat) => {
            const isActive = activeChatId === chat._id;
            return (
              <div
                key={chat._id}
                className={cn(
                  "group mb-1 flex items-center gap-2 rounded-2xl px-4 py-3 transition-all",
                  isActive
                    ? "bg-black/10 text-black shadow-sm"
                    : "text-slate-500 hover:bg-black/5 hover:text-black",
                )}
              >
                <button className="min-w-0 flex-1 text-right" onClick={() => onSelectChat(chat._id)}>
                  <p className="truncate text-xs font-black tracking-tight">
                    {chat.title ?? "بدون عنوان"}
                  </p>
                </button>
                <button
                  type="button"
                  onClick={() => {
                    openModal({
                      title: "حذف المحادثة",
                      description: `سيتم حذف "${chat.title ?? "هذه المحادثة"}" نهائياً. هل تريد المتابعة؟`,
                      confirmLabel: "حذف",
                      variant: "danger",
                      onConfirm: async () => {
                        await onDeleteChat(chat._id);
                      },
                    });
                  }}
                  className={cn(
                    "text-[10px] font-black uppercase tracking-widest transition-opacity",
                    isActive ? "opacity-40 hover:opacity-100" : "opacity-0 group-hover:opacity-40 hover:opacity-100",
                  )}
                >
                  حذف
                </button>
              </div>
            );
          })
        )}
      </div>

      <div className="p-6 mt-auto border-t border-black/5">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-black/5 text-xs font-black border border-black/10">
            {user?.name?.[0]?.toUpperCase() ?? "AM"}
          </div>
          <div className="flex flex-col">
            <p className="text-xs font-black tracking-tight text-slate-900">{user?.name ?? "مطور النظام"}</p>
            <Link
              href="/profile"
              className="text-[10px] font-bold text-[var(--subtle)] hover:text-black transition-colors"
            >
              إدارة الملف الشخصي
            </Link>
          </div>
        </div>
      </div>

    </aside>
  );
}
