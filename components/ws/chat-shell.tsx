"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { ChatSidebar } from "@/components/ws/chat-sidebar";
import { useDwsChat } from "@/hooks/use-dws-chat";
import { AuthLoadingOverlay, AuthRedirectOverlay, ChatContent, ChatHeader } from "@/components/ws/shell";

type Props = {
  dwsId: string;
  chatId: string;
  initialPrompt?: string;
  initialProfileId?: string;
};

export function DwsChatShell({
  dwsId,
  chatId,
  initialPrompt,
  initialProfileId,
}: Props) {
  const router = useRouter();
  const {
    user,
    isAuthenticated,
    isAuthLoading,
    chats,
    activeChatId,
    messages,
    pendingActions,
    isLoadingChat,
    isLoadingSidebar,
    isSending,
    isAwaitingAssistant,
    selectedProfile,
    selectedProfileId,
    setSelectedProfileId,
    error,
    setError,
    send,
    selectChat,
    removeChat,
    goToNewChat,
    saveActionPayload,
    confirmPendingAction,
    cancelPendingAction,
  } = useDwsChat({ dwsId, chatId, initialPrompt, initialProfileId });

  const [input, setInput] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const bottomRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages.length, pendingActions.length, isAwaitingAssistant]);

  useEffect(() => {
    if (isAuthLoading || isAuthenticated) return;
    router.replace(`/auth/login?next=${encodeURIComponent(`/ws/chat/${chatId}`)}`);
  }, [chatId, isAuthLoading, isAuthenticated, router]);

  const activeChatTitle = useMemo(() => {
    return chats.find((chat) => chat._id === activeChatId)?.title ?? "محادثة جديدة";
  }, [activeChatId, chats]);

  const handleSubmit = async () => {
    const text = input.trim();
    if (!text) return;

    setInput("");
    await send(text);
  };

  if (isAuthLoading) {
    return <AuthLoadingOverlay />;
  }

  if (!isAuthenticated) {
    return <AuthRedirectOverlay />;
  }

  return (
    <AuroraBackground className="bg-transparent">
      <div className="flex h-screen w-full overflow-hidden font-cairo text-slate-900" dir="rtl">
        <ChatSidebar
          dwsId={dwsId}
          chats={chats}
          activeChatId={activeChatId}
          isLoading={isLoadingSidebar}
          isOpen={isSidebarOpen}
          user={user}
          onToggle={() => setIsSidebarOpen(false)}
          onNewChat={goToNewChat}
          onSelectChat={selectChat}
          onDeleteChat={(id) => void removeChat(id)}
        />

        <main className="relative flex min-w-0 flex-1 flex-col">
          <ChatHeader
            isSidebarOpen={isSidebarOpen}
            onOpenSidebar={() => setIsSidebarOpen(true)}
            title={activeChatTitle}
            subtitle={selectedProfile.title}
            onNewChat={goToNewChat}
          />

          <ChatContent
            messages={messages}
            pendingActions={pendingActions}
            isLoadingChat={isLoadingChat}
            isAwaitingAssistant={isAwaitingAssistant}
            error={error}
            input={input}
            isSending={isSending}
            selectedProfileId={selectedProfileId}
            onInputChange={setInput}
            onProfileChange={setSelectedProfileId}
            onSubmit={handleSubmit}
            onQuickPrompt={setInput}
            onClearError={() => setError(null)}
            onSaveAction={saveActionPayload}
            onConfirmAction={confirmPendingAction}
            onCancelAction={cancelPendingAction}
            bottomRef={bottomRef}
          />
        </main>
      </div>
    </AuroraBackground>
  );
}
