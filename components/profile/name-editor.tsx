import { PencilLine } from "lucide-react";

type NameEditorProps = {
  value: string;
  placeholder: string;
  canSave: boolean;
  onChange: (value: string) => void;
  onSave: () => void;
};

export function ProfileNameEditor({
  value,
  placeholder,
  canSave,
  onChange,
  onSave,
}: NameEditorProps) {
  return (
    <div className="rounded-3xl border border-black/5 bg-white/60 p-5">
      <p className="mb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">تعديل الاسم</p>

      <div className="space-y-3">
        <label className="block text-right text-[10px] font-black uppercase tracking-[0.15em] text-slate-400">
          اسم العرض
        </label>
        <div className="flex gap-2">
          <input
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={placeholder}
            className="h-11 flex-1 rounded-xl border border-black/10 bg-white px-3 text-sm font-bold text-slate-900 outline-none transition-colors focus:border-black/25"
          />
          <button
            type="button"
            onClick={onSave}
            disabled={!canSave}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-black px-4 text-xs font-black text-white transition-opacity disabled:opacity-40"
          >
            <PencilLine className="h-4 w-4" />
            حفظ
          </button>
        </div>
      </div>
    </div>
  );
}
