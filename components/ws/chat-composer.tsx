"use client";

import type { FormEvent } from "react";
import { ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { AgentProfilePicker } from "@/components/ws/agent-profile-picker";
import type { AgentProfileId } from "@/components/ws/agent-profiles";

type Props = {
  value: string;
  isSending: boolean;
  selectedProfileId: AgentProfileId;
  onChangeProfile: (profileId: AgentProfileId) => void;
  onChange: (value: string) => void;
  onSubmit: () => Promise<void>;
};

export function ChatComposer({
  value,
  isSending,
  selectedProfileId,
  onChangeProfile,
  onChange,
  onSubmit,
}: Props) {
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="relative rounded-[2.5rem] bg-white/60 p-2 shadow-2xl backdrop-blur-3xl transition-all focus-within:bg-white/80 border border-white/50"
    >
      <div className="px-4 pt-4">
        <AgentProfilePicker value={selectedProfileId} onChange={onChangeProfile} />
      </div>

      <div className="relative">
        <textarea
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="اطلب تنفيذ مهمة..."
          className="min-h-[80px] w-full resize-none bg-transparent px-6 text-lg font-black leading-relaxed text-slate-800 outline-none placeholder:text-slate-400/80"
          onKeyDown={(e) => {
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (value.trim() && !isSending) {
                void onSubmit();
              }
            }
          }}
        />

        <div className="flex justify-end p-2">
          <button
            type="submit"
            disabled={isSending || !value.trim()}
            className={cn(
              "flex h-12 w-12 items-center justify-center rounded-full transition-all duration-300",
              value.trim()
                ? "bg-black text-white shadow-xl rotate-0 scale-100"
                : "bg-[#EEE] text-slate-400 rotate-0 scale-75 cursor-not-allowed"
            )}
          >
            <ArrowUp className="h-5 w-5" />
          </button>
        </div>
      </div>
    </form>
  );
}
