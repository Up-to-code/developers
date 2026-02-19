import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/utils";

type FieldInputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
};

export function FieldInput({ label, className, ...props }: FieldInputProps) {
  return (
    <label className="block space-y-1.5">
      <span className="text-[9px] font-black uppercase tracking-[0.16em] text-[var(--subtle)]/70">
        {label}
      </span>
      <input
        className={cn(
          "h-10 w-full rounded-xl border border-[var(--border)] bg-[var(--surface)] px-3 text-xs outline-none transition-colors focus:border-black/20",
          className,
        )}
        {...props}
      />
    </label>
  );
}
