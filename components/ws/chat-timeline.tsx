"use client";

import { ShieldCheck, Building2, LineChart, ArrowLeftRight } from "lucide-react";
import { ChatSkeleton } from "@/components/ag-ui/skeleton";
import { ConformerActionList } from "@/components/ag-ui/conformer";
import { ReadingMotion, ThinkingMotion } from "@/components/ag-ui/motion";
import { DwsAction, DwsMessage } from "./types";

type Props = {
  messages: DwsMessage[];
  pendingActions: DwsAction[];
  isLoading: boolean;
  isAwaitingAssistant: boolean;
  onQuickPrompt: (prompt: string) => void;
  onSaveAction: (actionId: DwsAction["_id"], payload: unknown) => Promise<void>;
  onConfirmAction: (actionId: DwsAction["_id"], payload?: unknown) => Promise<void>;
  onCancelAction: (actionId: DwsAction["_id"]) => Promise<void>;
};

export function ChatTimeline({
  messages,
  pendingActions,
  isLoading,
  isAwaitingAssistant,
  onQuickPrompt,
  onSaveAction,
  onConfirmAction,
  onCancelAction,
}: Props) {
  if (isLoading) {
    return <ChatSkeleton />;
  }

  if (messages.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-12">
        <div className="space-y-4">
          <h2 className="text-5xl font-black text-slate-900">مرحباً بك.</h2>
          <p className="text-sm font-bold text-slate-400">بيئة المعالجة العقارية الإصدار الثاني</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl px-4">
          {[
            { title: "تدقيق العقود", desc: "فحص الجوانب القانونية والالتزامات النظامية في المسودات.", icon: ShieldCheck, tag: "LEGAL" },
            { title: "تحليل الوحدات العقارية", desc: "استخراج بيانات الصكوك والمواصفات والمساحات بدقة معمارية.", icon: Building2, tag: "REAL ESTATE" },
            { title: "إدارة الموارد", desc: "ربط العمليات مع واجهات البرمجة الخارجية للمنظومة.", icon: ArrowLeftRight, tag: "SYSTEM" },
            { title: "إحصائيات السوق", desc: "توليد تقارير حية عن حركة المبيعات في الأحياء المستهدفة.", icon: LineChart, tag: "ANALYTICS" }
          ].map((item) => (
            <button
              key={item.title}
              className="group flex flex-col items-start rounded-[24px] border border-black/5 bg-white/40 p-6 text-right shadow-sm backdrop-blur-xl transition-all hover:shadow-md"
              onClick={() => onQuickPrompt(item.title)}
            >
              <div className="mb-4 flex w-full items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="h-1 w-1 rounded-full bg-green-500" />
                  <span className="text-[9px] font-black uppercase tracking-widest text-slate-300">{item.tag}</span>
                </div>
                <item.icon className="h-4 w-4 text-slate-200 transition-colors group-hover:text-slate-400" />
              </div>
              <h3 className="mb-1 text-sm font-black text-slate-900">{item.title}</h3>
              <p className="text-[10px] font-bold leading-relaxed text-slate-400">{item.desc}</p>
            </button>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {messages.map((message) =>
        message.role === "assistant" ? (
          <div key={message.id} className="flex items-start gap-4">
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-black text-white text-[10px] font-black shadow-sm">
              ع
            </div>
            <div className="max-w-[85%] space-y-1">
              <div className="rounded-[24px] border border-black/5 bg-white px-5 py-4 text-[13px] leading-relaxed text-slate-900 shadow-sm">
                <p className="whitespace-pre-wrap">{message.text}</p>
              </div>
              <p className="px-2 text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--subtle)]/40">
                {message.timestamp}
              </p>
            </div>
          </div>
        ) : (
          <div key={message.id} className="flex flex-row-reverse items-start gap-4">
            <div className="max-w-[80%] rounded-[24px] border border-black/5 bg-white/40 px-5 py-3 text-[13px] leading-relaxed text-slate-900 shadow-sm backdrop-blur-xl">
              <p className="whitespace-pre-wrap">{message.text}</p>
              <p className="mt-2 text-[9px] font-bold uppercase tracking-[0.2em] opacity-20">
                {message.timestamp}
              </p>
            </div>
          </div>
        ),
      )}

      {pendingActions.length > 0 ? (
        <div className="space-y-4 rounded-[2rem] border border-black/5 bg-white/40 p-6 shadow-sm backdrop-blur-2xl">
          <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-20 text-right">
            إجراءات قيد التحميل
          </p>
          <ConformerActionList
            actions={pendingActions}
            onSave={onSaveAction}
            onConfirm={onConfirmAction}
            onCancel={onCancelAction}
          />
        </div>
      ) : null}

      {isAwaitingAssistant ? (
        <div className="space-y-2">
          <ThinkingMotion />
          <ReadingMotion />
        </div>
      ) : null}
    </div>
  );
}
