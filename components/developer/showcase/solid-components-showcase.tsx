"use client";

import { Building2, Search, ShieldCheck, AlertTriangle } from "lucide-react";
import { SurfaceCard, StatusChip, FieldInput, SolidAlert } from "@/components/ag-ui/solid";
import { ThinkingMotion, ReadingMotion, ResolvedMotion } from "@/components/ag-ui/motion";

export function SolidComponentsShowcase() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <div className="space-y-4">
        <SolidAlert
          title="System Notification"
          description="تم تحديث النظام بنجاح. جميع الخدمات تعمل بكفاءة عالية."
          icon={ShieldCheck}
          tone="success"
        />
        <SolidAlert
          title="Critical Action"
          description="يرجى الانتباه: هذا الإجراء لا يمكن التراجع عنه."
          icon={AlertTriangle}
          tone="critical"
        />
      </div>

      <SurfaceCard className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--subtle)]/60">
          Solid Surface
        </p>
        <h3 className="text-xl font-black">Reusable Card With Props</h3>
        <p className="text-sm font-bold text-[var(--subtle)]">
          هذا مكون صلب يمكن إعادة استخدامه في الصفحات، الشاشات، أو الرسائل داخل المحادثة.
        </p>
        <div className="flex flex-wrap gap-2">
          <StatusChip tone="info">real-estate</StatusChip>
          <StatusChip tone="pending">pending</StatusChip>
          <StatusChip tone="success">ready</StatusChip>
        </div>
      </SurfaceCard>

      <SurfaceCard className="space-y-3" tone="soft">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--subtle)]/60">
          Structured Inputs
        </p>
        <div className="grid gap-3 md:grid-cols-2">
          <FieldInput label="Property Name" defaultValue="Skyline Residence" />
          <FieldInput label="City" defaultValue="Riyadh" />
          <FieldInput label="Price" defaultValue="4,800,000 SAR" />
          <FieldInput label="Status" defaultValue="Draft" />
        </div>
      </SurfaceCard>

      <SurfaceCard className="space-y-3" tone="highlight">
        <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-[var(--subtle)]/60">
          <Search className="h-4 w-4" />
          Thinking Motion
        </div>
        <ThinkingMotion />
        <ReadingMotion />
        <ResolvedMotion label="تم تجهيز نتيجة الإجراء" />
      </SurfaceCard>

      <SurfaceCard className="space-y-4" tone="soft">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--subtle)]/60">
          Domain Blocks
        </p>
        <div className="grid gap-3">
          <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white p-3">
            <div className="space-y-1">
              <p className="text-xs font-black">Property Lifecycle</p>
              <p className="text-[10px] font-bold text-[var(--subtle)]">
                create -&gt; review -&gt; confirm -&gt; execute
              </p>
            </div>
            <Building2 className="h-4 w-4" />
          </div>
          <div className="flex items-center justify-between rounded-2xl border border-black/10 bg-white p-3">
            <div className="space-y-1">
              <p className="text-xs font-black">Compliance Gate</p>
              <p className="text-[10px] font-bold text-[var(--subtle)]">user confirmation required</p>
            </div>
            <ShieldCheck className="h-4 w-4" />
          </div>
        </div>
      </SurfaceCard>
    </div>
  );
}
