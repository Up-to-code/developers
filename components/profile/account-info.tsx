import { Mail, Phone } from "lucide-react";

type AccountInfoProps = {
  email: string;
};

export function ProfileAccountInfo({ email }: AccountInfoProps) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white/60 p-5">
      <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">معلومات الحساب</p>

      <div className="space-y-3">
        <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/80 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5">
            <Mail className="h-4 w-4 text-slate-500" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">البريد الإلكتروني</p>
            <p className="text-sm font-bold text-slate-900">{email}</p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-2xl border border-black/5 bg-white/80 p-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-black/5">
            <Phone className="h-4 w-4 text-slate-500" />
          </div>
          <div>
            <p className="text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">رقم الهاتف</p>
            <p className="text-sm font-bold text-slate-900" dir="ltr">
              +966 50 000 0000
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
