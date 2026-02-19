export function ThinkingMotion() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 backdrop-blur-xl">
      <div className="relative h-5 w-5">
        <span className="absolute inset-0 rounded-full border border-black/20 animate-ping" />
        <span className="absolute inset-[5px] rounded-full bg-black" />
      </div>
      <div className="space-y-1">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--subtle)]">
          Thinking
        </p>
        <p className="text-xs font-bold text-black/80">الوكيل يفكر في أفضل إجراء...</p>
      </div>
    </div>
  );
}
