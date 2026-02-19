"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
};

export function Button({
  className,
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center rounded-xl font-semibold transition-all active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-30",
        variant === "default" &&
        "bg-[var(--primary)] text-[var(--primary-foreground)] hover:opacity-90",
        variant === "outline" &&
        "border border-[var(--border)] bg-[var(--surface)] text-[var(--foreground)] hover:bg-[var(--surface-soft)]",
        variant === "ghost" &&
        "bg-transparent text-[var(--subtle)] hover:bg-[var(--surface-soft)] hover:text-[var(--foreground)]",
        size === "sm" && "h-8 px-3 text-[11px]",
        size === "md" && "h-10 px-4 text-xs",
        size === "lg" && "h-12 px-6 text-sm",
        className,
      )}
      {...props}
    />
  );
}
