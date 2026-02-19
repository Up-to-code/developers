import { CheckCircle2 } from "lucide-react";

export function ResolvedMotion({ label = "تم إنهاء الخطوة" }: { label?: string }) {
  return (
    <div className="flex items-center gap-2 rounded-2xl border border-emerald-600/20 bg-emerald-500/10 px-4 py-3 text-emerald-700">
      <CheckCircle2 className="h-4 w-4" />
      <span className="text-xs font-bold">{label}</span>
    </div>
  );
}
