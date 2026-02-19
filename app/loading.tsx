import { ChatSkeleton, RailSkeleton } from "@/components/ag-ui/skeleton";
import { ReadingMotion, ResolvedMotion, ThinkingMotion } from "@/components/ag-ui/motion";

export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] bg-[var(--background)]">
      <div className="flex h-screen w-full overflow-hidden font-cairo text-slate-900" dir="rtl">
        <aside className="hidden w-[320px] shrink-0 border-l border-[var(--border)] bg-[var(--surface)] md:flex md:flex-col">
          <div className="space-y-3 border-b border-[var(--border)] p-4">
            <div className="h-6 w-24 rounded-lg bg-black/10 animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-black/10 animate-pulse" />
            <div className="h-10 w-full rounded-xl bg-black/10 animate-pulse" />
          </div>
          <div className="min-h-0 flex-1 overflow-y-auto p-3">
            <RailSkeleton />
          </div>
          <div className="border-t border-[var(--border)] p-4">
            <div className="h-4 w-28 rounded bg-black/10 animate-pulse" />
            <div className="mt-2 h-3 w-44 rounded bg-black/10 animate-pulse" />
          </div>
        </aside>

        <main className="relative flex min-w-0 flex-1 flex-col">
          <header className="h-14 border-b border-[var(--border)] bg-[var(--surface)]/80 px-4 backdrop-blur-xl md:px-5">
            <div className="flex h-full items-center justify-between">
              <div className="space-y-2">
                <div className="h-4 w-36 rounded bg-black/10 animate-pulse" />
                <div className="h-3 w-28 rounded bg-black/10 animate-pulse" />
              </div>
              <div className="h-8 w-16 rounded-lg bg-black/10 animate-pulse" />
            </div>
          </header>

          <section className="min-h-0 flex-1 overflow-y-auto px-4 pb-52 pt-6 md:px-8">
            <div className="mx-auto w-full max-w-4xl space-y-4">
              <div className="grid gap-2 md:grid-cols-3">
                <ThinkingMotion />
                <ReadingMotion />
                <ResolvedMotion label="تهيئة الأدوات" />
              </div>
              <ChatSkeleton />
              <div className="rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-4">
                <div className="mb-3 h-3 w-40 rounded bg-black/10 animate-pulse" />
                <div className="grid gap-3 md:grid-cols-2">
                  <div className="h-10 rounded-xl bg-black/10 animate-pulse" />
                  <div className="h-10 rounded-xl bg-black/10 animate-pulse" />
                  <div className="h-10 rounded-xl bg-black/10 animate-pulse" />
                  <div className="h-10 rounded-xl bg-black/10 animate-pulse" />
                </div>
              </div>
            </div>
          </section>

          <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 md:px-8">
            <div className="pointer-events-auto mx-auto w-full max-w-4xl rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3">
              <div className="mb-3 h-8 w-48 rounded-full bg-black/10 animate-pulse" />
              <div className="h-24 w-full rounded-xl bg-black/10 animate-pulse" />
              <div className="mt-3 flex justify-end">
                <div className="h-9 w-16 rounded-xl bg-black/10 animate-pulse" />
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
