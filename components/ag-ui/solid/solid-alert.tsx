import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import type { ElementType } from "react";

const alertVariants = cva(
    "relative w-full overflow-hidden rounded-[2.5rem] p-6 shadow-2xl transition-all duration-500 animate-in fade-in slide-in-from-bottom-4 zoom-in-95",
    {
        variants: {
            tone: {
                default: "bg-white text-slate-900 border-l-8 border-black",
                critical: "bg-white text-red-600 border-l-8 border-red-600",
                success: "bg-white text-emerald-600 border-l-8 border-emerald-600",
            },
        },
        defaultVariants: {
            tone: "default",
        },
    },
);

type SolidAlertProps = VariantProps<typeof alertVariants> & {
    title: string;
    description?: string;
    icon?: ElementType;
    className?: string;
};

export function SolidAlert({
    title,
    description,
    icon: Icon,
    tone,
    className,
}: SolidAlertProps) {
    return (
        <div className={cn(alertVariants({ tone }), className)}>
            <div className="relative z-10 flex items-start gap-4">
                {Icon ? (
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-black/5">
                        <Icon className="h-6 w-6" />
                    </div>
                ) : null}
                <div className="space-y-1">
                    <h4 className="text-lg font-black uppercase tracking-widest">{title}</h4>
                    {description ? (
                        <p className="text-xs font-bold leading-relaxed opacity-60">
                            {description}
                        </p>
                    ) : null}
                </div>
            </div>

            {/* Ambient background decoration */}
            <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-black/5 blur-3xl transition-all" />
        </div>
    );
}
