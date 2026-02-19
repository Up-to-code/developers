import { ArrowLeft } from "lucide-react";

type HeroProps = {
  query: string;
  isFocused: boolean;
  onFocusChange: (focused: boolean) => void;
  onQueryChange: (value: string) => void;
  onSubmit: (event: React.FormEvent) => void;
  footer?: React.ReactNode;
};

export function LandingHero({
  query,
  isFocused,
  onFocusChange,
  onQueryChange,
  onSubmit,
  footer,
}: HeroProps) {
  return (
    <div className="relative z-10 flex min-h-screen w-full max-w-4xl flex-col items-center justify-center space-y-12 px-4 text-center">
      <div className="space-y-6">
        <h1 className="text-5xl md:text-7xl font-black tracking-tighter mix-blend-difference">
          ماذا تريد أن تبني اليوم؟
        </h1>
        <p className="text-xl md:text-2xl font-bold text-slate-500 max-w-2xl mx-auto leading-relaxed">
          مساحة عمل ذكية للمطورين. وكلاء متخصصون. تنفيذ فوري.
        </p>
      </div>

      <form onSubmit={onSubmit} className="relative mx-auto w-full max-w-2xl">
        <div
          className={`
            relative overflow-hidden rounded-[4rem] bg-white/40 shadow-xl backdrop-blur-3xl transition-all duration-500
            ${isFocused ? "shadow-2xl scale-105 bg-white/60" : "hover:bg-white/50"}
          `}
        >
          <div className="relative flex items-center">
            <input
              type="text"
              value={query}
              onChange={(event) => onQueryChange(event.target.value)}
              onFocus={() => onFocusChange(true)}
              onBlur={() => onFocusChange(false)}
              placeholder="صف المشروع الذي تفكر فيه..."
              className="h-20 w-full bg-transparent px-8 text-xl md:text-2xl font-black text-slate-800 placeholder:text-slate-400/70 focus:outline-none"
              autoFocus
            />
            <button
              type="submit"
              disabled={!query.trim()}
              className={`
                absolute left-3 ml-2 flex h-14 w-14 items-center justify-center rounded-full transition-all duration-300
                ${query.trim() ? "bg-black text-white" : "bg-white/20 text-slate-400 -rotate-90 scale-75"}
              `}
            >
              <ArrowLeft className="h-6 w-6" />
            </button>
          </div>
        </div>
      </form>

      {footer}
    </div>
  );
}
