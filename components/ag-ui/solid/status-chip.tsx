import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type StatusTone = "neutral" | "pending" | "success" | "danger" | "info";

type StatusChipProps = HTMLAttributes<HTMLSpanElement> & {
  tone?: StatusTone;
};

export function StatusChip({
  className,
  tone = "neutral",
  ...props
}: StatusChipProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-1 text-[9px] font-black uppercase tracking-[0.15em]",
        tone === "neutral" && "bg-black/5 text-black/50",
        tone === "pending" && "bg-amber-500/10 text-amber-700",
        tone === "success" && "bg-emerald-500/10 text-emerald-700",
        tone === "danger" && "bg-red-500/10 text-red-700",
        tone === "info" && "bg-blue-500/10 text-blue-700",
        className,
      )}
      {...props}
    />
  );
}
