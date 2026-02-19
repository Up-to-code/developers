export function ReadingMotion() {
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-black/10 bg-white/70 px-4 py-3 backdrop-blur-xl">
      <div className="flex items-center gap-1">
        <span className="h-1.5 w-1.5 rounded-full bg-black/60 animate-pulse" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/40 animate-pulse [animation-delay:120ms]" />
        <span className="h-1.5 w-1.5 rounded-full bg-black/30 animate-pulse [animation-delay:240ms]" />
      </div>
      <p className="text-xs font-bold text-black/70">الوكيل يقرأ السياق والملفات المرتبطة...</p>
    </div>
  );
}
