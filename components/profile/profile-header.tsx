import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export function ProfileHeader() {
  return (
    <header className="flex items-center justify-between border-b border-black/5 p-5">
      <div>
        <h1 className="text-2xl font-black text-slate-900">ملف المستخدم</h1>
        <p className="text-xs font-bold text-slate-400">Profile Settings</p>
      </div>

      <Link
        href="/ws/chat/new"
        className="inline-flex items-center gap-2 rounded-xl border border-black/10 bg-white/70 px-3 py-2 text-xs font-black text-slate-700 transition-colors hover:bg-white"
      >
        <ArrowLeft className="h-4 w-4" />
        العودة للشات
      </Link>
    </header>
  );
}
