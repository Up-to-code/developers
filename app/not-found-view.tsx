import Link from "next/link";
import { Compass, Sparkles } from "lucide-react";
import { AuroraBackground } from "@/components/ui/aurora-background";

export function NotFoundView() {
  return (
    <AuroraBackground className="bg-transparent">
      <main className="flex min-h-screen items-center justify-center px-4 font-cairo" dir="rtl">
        <section className="w-full max-w-2xl overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/55 p-6 shadow-2xl backdrop-blur-3xl md:p-8">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-black text-white shadow-xl">
            <Compass className="h-7 w-7" />
          </div>

          <div className="space-y-3 text-center">
            <p className="text-[10px] font-black uppercase tracking-[0.28em] text-red-500">Error 404</p>
            <h1 className="text-3xl font-black text-slate-900 md:text-4xl">الصفحة غير موجودة</h1>
            <p className="mx-auto max-w-xl text-sm font-bold leading-relaxed text-slate-500">
              يبدو أن الرابط غير صحيح أو أن الصفحة لم تعد متاحة. يمكنك العودة للمسار الأساسي ومتابعة العمل.
            </p>
          </div>

          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            <Link
              href="/ws/chat/new"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-2xl bg-black text-xs font-black uppercase tracking-[0.15em] text-white !text-white transition-colors hover:bg-black/90"
            >
              <Sparkles className="h-4 w-4 text-white !text-white" />
              فتح مساحة الشات
            </Link>
            <Link
              href="/"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-black/10 bg-white/70 text-xs font-black uppercase tracking-[0.15em] text-slate-700 transition-colors hover:bg-white"
            >
              العودة للرئيسية
            </Link>
          </div>
        </section>
      </main>
    </AuroraBackground>
  );
}
