import { AuroraBackground } from "@/components/ui/aurora-background";
import { ReadingMotion, ThinkingMotion } from "@/components/ag-ui/motion";

export function AuthLoadingOverlay() {
  return (
    <AuroraBackground className="bg-transparent">
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" dir="rtl">
        <div className="w-full max-w-md space-y-4 rounded-3xl border border-black/10 bg-white/80 p-5 shadow-2xl backdrop-blur-2xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--subtle)]/70">
            جاري التحقق من الجلسة
          </p>
          <ThinkingMotion />
          <ReadingMotion />
          <div className="h-2 overflow-hidden rounded-full bg-black/10">
            <div className="h-full w-1/2 animate-pulse rounded-full bg-black/70" />
          </div>
        </div>
      </div>
    </AuroraBackground>
  );
}

export function AuthRedirectOverlay() {
  return (
    <AuroraBackground className="bg-transparent">
      <div className="fixed inset-0 z-[100] flex items-center justify-center px-4" dir="rtl">
        <div className="w-full max-w-md space-y-3 rounded-3xl border border-black/10 bg-white/80 p-5 text-center shadow-2xl backdrop-blur-2xl">
          <p className="text-sm font-black">يتم تحويلك إلى تسجيل الدخول...</p>
          <p className="text-xs text-[var(--subtle)]">لا يمكن فتح صفحة الشات بدون جلسة مصادقة.</p>
        </div>
      </div>
    </AuroraBackground>
  );
}
