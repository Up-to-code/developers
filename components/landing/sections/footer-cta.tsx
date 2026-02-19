type LandingFooterCtaProps = {
  onStart: () => void;
};

export function LandingFooterCta({ onStart }: LandingFooterCtaProps) {
  return (
    <footer className="space-y-12 text-center">
      <div className="mx-auto h-px w-24 bg-black/10" />
      <div className="space-y-4">
        <h3 className="text-2xl font-black uppercase italic tracking-widest">Anan Developers</h3>
        <p className="text-sm font-bold text-[var(--subtle)]">جميع الحقوق محفوظة © ٢٠٢٤</p>
      </div>
      <button
        onClick={onStart}
        className="inline-flex h-16 items-center justify-center rounded-full bg-black px-12 text-lg font-black text-white shadow-2xl transition-all hover:scale-105 active:scale-95"
      >
        ابدأ مشروعك الآن
      </button>
    </footer>
  );
}
