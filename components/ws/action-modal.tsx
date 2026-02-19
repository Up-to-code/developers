"use client";

import { cn } from "@/lib/utils";

type ActionModalProps = {
  isOpen: boolean;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "default" | "danger";
  busy?: boolean;
  error?: string | null;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
};

export function ActionModal({
  isOpen,
  title,
  description,
  confirmLabel = "تأكيد",
  cancelLabel = "إلغاء",
  variant = "default",
  busy = false,
  error,
  onClose,
  onConfirm,
}: ActionModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm transition-all animate-in fade-in" dir="rtl">
      <button type="button" className="absolute inset-0" onClick={onClose} aria-label="close modal" />
      <div className="relative w-full max-w-sm overflow-hidden rounded-[2.5rem] bg-white p-6 shadow-2xl animate-in zoom-in-95 slide-in-from-bottom-2 duration-200">
        <div className="space-y-4 text-center">
          <h3 className="text-xl font-black tracking-tight">{title}</h3>
          <p className="text-sm font-bold text-[var(--subtle)] leading-relaxed">{description}</p>
          {error && (
            <div className="rounded-xl bg-red-50 p-3 text-xs font-black text-red-600 animate-in fade-in slide-in-from-top-1">
              {error}
            </div>
          )}
        </div>

        <div className="mt-8 flex items-center gap-3">
          <button
            type="button"
            onClick={onClose}
            disabled={busy}
            className="flex-1 rounded-2xl bg-slate-100 py-3 text-xs font-black text-slate-500 hover:bg-slate-200 transition-colors disabled:opacity-50"
          >
            {cancelLabel}
          </button>
          <button
            type="button"
            onClick={() => void onConfirm()}
            disabled={busy}
            className={cn(
              "flex-1 rounded-2xl py-3 text-xs font-black text-white shadow-lg transition-all hover:scale-105 disabled:opacity-50 disabled:hover:scale-100",
              variant === "danger" ? "bg-red-600 shadow-red-500/30" : "bg-black shadow-black/30",
            )}
          >
            {busy ? "..." : confirmLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
