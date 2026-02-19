import { LogOut } from "lucide-react";

type AccountActionsProps = {
  onLogout: () => void;
};

export function ProfileAccountActions({ onLogout }: AccountActionsProps) {
  return (
    <div className="rounded-3xl border border-red-200 bg-red-50/60 p-5">
      <p className="text-xs font-black text-red-700">إجراءات الحساب</p>
      <p className="mt-1 text-sm text-red-600">استخدم هذا الزر لتسجيل الخروج بشكل آمن.</p>
      <button
        type="button"
        onClick={onLogout}
        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2 text-xs font-black text-white transition-colors hover:bg-red-700"
      >
        <LogOut className="h-4 w-4" />
        تسجيل الخروج
      </button>
    </div>
  );
}
