import { ChatComposer } from "@/components/ws/chat-composer";
import { ChatTimeline } from "@/components/ws/chat-timeline";
import type { AgentProfileId } from "@/components/ws/agent-profiles";
import type { DwsAction, DwsMessage } from "@/components/ws/types";

type ChatContentProps = {
  messages: DwsMessage[];
  pendingActions: DwsAction[];
  isLoadingChat: boolean;
  isAwaitingAssistant: boolean;
  error: string | null;
  input: string;
  isSending: boolean;
  selectedProfileId: AgentProfileId;
  onInputChange: (value: string) => void;
  onProfileChange: (profileId: AgentProfileId) => void;
  onSubmit: () => Promise<void>;
  onQuickPrompt: (prompt: string) => void;
  onClearError: () => void;
  onSaveAction: (actionId: DwsAction["_id"], payload: unknown) => Promise<void>;
  onConfirmAction: (actionId: DwsAction["_id"], payload?: unknown) => Promise<void>;
  onCancelAction: (actionId: DwsAction["_id"]) => Promise<void>;
  bottomRef: React.RefObject<HTMLDivElement | null>;
};

export function ChatContent({
  messages,
  pendingActions,
  isLoadingChat,
  isAwaitingAssistant,
  error,
  input,
  isSending,
  selectedProfileId,
  onInputChange,
  onProfileChange,
  onSubmit,
  onQuickPrompt,
  onClearError,
  onSaveAction,
  onConfirmAction,
  onCancelAction,
  bottomRef,
}: ChatContentProps) {
  return (
    <>
      <section className="min-h-0 flex-1 overflow-y-auto px-4 pb-52 pt-6 md:px-8">
        <div className="mx-auto w-full max-w-4xl space-y-6">
          <ChatTimeline
            messages={messages}
            pendingActions={pendingActions}
            isLoading={isLoadingChat}
            isAwaitingAssistant={isAwaitingAssistant}
            onQuickPrompt={(prompt) => {
              onQuickPrompt(prompt);
              onClearError();
            }}
            onSaveAction={onSaveAction}
            onConfirmAction={onConfirmAction}
            onCancelAction={onCancelAction}
          />

          {error ? (
            <div className="rounded-xl border border-red-600/20 bg-red-500/10 px-3 py-2 text-xs font-bold text-red-700">
              {error}
            </div>
          ) : null}

          <div ref={bottomRef} />
        </div>
      </section>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 px-4 pb-4 md:px-8">
        <div className="pointer-events-auto mx-auto w-full max-w-4xl">
          <ChatComposer
            value={input}
            isSending={isSending}
            selectedProfileId={selectedProfileId}
            onChange={onInputChange}
            onChangeProfile={onProfileChange}
            onSubmit={onSubmit}
          />
        </div>
      </div>
    </>
  );
}
