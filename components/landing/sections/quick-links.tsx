import Link from "next/link";

export function LandingQuickLinks() {
  return (
    <div className="flex items-center justify-center gap-6 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400/60">
      <Link href="/docs" className="transition-colors hover:text-black">
        Documentation
      </Link>
      <span className="h-1 w-1 rounded-full bg-black/10" />
      <Link href="/profile" className="transition-colors hover:text-black">
        Profile
      </Link>
      <span className="h-1 w-1 rounded-full bg-black/10" />
      <Link href="/auth/login" className="transition-colors hover:text-black">
        Login
      </Link>
    </div>
  );
}
