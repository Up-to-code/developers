import { cn } from "@/lib/utils";
import type { HTMLAttributes } from "react";

type SurfaceCardProps = HTMLAttributes<HTMLDivElement> & {
  tone?: "default" | "soft" | "highlight";
};

export function SurfaceCard({
  className,
  tone = "default",
  ...props
}: SurfaceCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border p-4",
        tone === "default" && "border-black/10 bg-white/70 backdrop-blur-xl",
        tone === "soft" && "border-[var(--border)] bg-[var(--surface)]",
        tone === "highlight" && "border-black/20 bg-white",
        className,
      )}
      {...props}
    />
  );
}
