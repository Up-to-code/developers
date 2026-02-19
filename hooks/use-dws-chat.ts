"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { useUIMessages } from "@convex-dev/agent/react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import type { Id } from "convex/_generated/dataModel";
import { api } from "convex/_generated/api";
import { useAuth } from "@/hooks/use-auth";
import type { DwsAction, DwsMessage, DwsThread } from "@/components/ws/types";
import {
  DEFAULT_AGENT_PROFILE_ID,
  resolveAgentProfile,
  type AgentProfileId,
} from "@/components/ws/agent-profiles";

type RawUIMessage = {
  key: string;
  role?: "user" | "assistant" | "tool" | "system";
  text: string;
  _creationTime?: number;
};

type UseDwsChatArgs = {
  dwsId: string;
  chatId: string;
  initialPrompt?: string;
  initialProfileId?: string;
};

function buildChatRoute(chatId: string): Route {
  return `/ws/chat/${encodeURIComponent(chatId)}` as Route;
}

export function useDwsChat({
  dwsId,
  chatId,
  initialPrompt,
  initialProfileId,
}: UseDwsChatArgs) {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: isAuthLoading } = useAuth();

  const createThread = useMutation(
    api.features.developer.actions.createDeveloperThreadAction,
  );
  const sendMessage = useMutation(api.features.developer.actions.sendDeveloperMessage);
  const deleteThread = useMutation(api.features.developer.actions.deleteDeveloperThread);
  const updateActionPayload = useMutation(
    api.features.developer.actions.updateDeveloperActionPayload,
  );
  const confirmAction = useMutation(api.features.developer.actions.confirmDeveloperAction);
  const cancelAction = useMutation(api.features.developer.actions.cancelDeveloperAction);

  const [selectedProfileId, setSelectedProfileId] = useState<AgentProfileId>(
    (initialProfileId as AgentProfileId | undefined) ?? DEFAULT_AGENT_PROFILE_ID,
  );
  const [isSending, setIsSending] = useState(false);
  const [isAwaitingAssistant, setIsAwaitingAssistant] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeChatId = chatId === "new" ? null : chatId;

  const threadsResult = useQuery(
    api.features.developer.actions.listDeveloperThreads,
    isAuthenticated ? { paginationOpts: { numItems: 60, cursor: null } } : "skip",
  );

  const chats = useMemo(
    () => ((threadsResult?.page ?? []) as DwsThread[]),
    [threadsResult?.page],
  );

  const uiMessages = useUIMessages(
    api.features.developer.actions.getDeveloperThreadMessages,
    isAuthenticated && activeChatId ? { threadId: activeChatId } : "skip",
    { initialNumItems: 60, stream: true },
  );

  const messages = useMemo(() => {
    const raw = (uiMessages?.results ?? []) as RawUIMessage[];

    return raw
      .filter((message) => message.role === "user" || message.role === "assistant")
      .map(
        (message): DwsMessage => ({
          id: message.key,
          role: message.role as "user" | "assistant",
          text: message.text ?? "",
          timestamp: new Date(message._creationTime ?? 0).toLocaleTimeString("ar-SA", {
            hour: "2-digit",
            minute: "2-digit",
          }),
        }),
      );
  }, [uiMessages?.results]);

  const pendingActions =
    (useQuery(
      api.features.developer.actions.listDeveloperActions,
      isAuthenticated && activeChatId
        ? { threadId: activeChatId, status: "pending" }
        : "skip",
    ) as DwsAction[] | undefined) ?? [];

  const selectedProfile = useMemo(
    () => resolveAgentProfile(selectedProfileId),
    [selectedProfileId],
  );

  const goToChat = useCallback(
    (nextChatId: string) => {
      router.replace(buildChatRoute(nextChatId));
    },
    [router],
  );

  const goToNewChat = useCallback(() => {
    router.replace(buildChatRoute("new"));
  }, [router]);

  const createChat = useCallback(
    async (title?: string) => {
      if (!isAuthenticated) {
        setError("سجل الدخول أولاً لاستخدام مساحة المطورين.");
        return null;
      }

      const created = await createThread({ title: title?.trim() || "محادثة جديدة" });
      goToChat(created.threadId);
      return created.threadId;
    },
    [createThread, goToChat, isAuthenticated],
  );

  const send = useCallback(
    async (value: string) => {
      const body = value.trim();
      if (!body) return;

      if (!isAuthenticated) {
        setError("سجل الدخول أولاً لاستخدام مساحة المطورين.");
        return;
      }

      setError(null);
      setIsSending(true);
      setIsAwaitingAssistant(true);

      try {
        let nextChatId = activeChatId;
        if (!nextChatId) {
          const created = await createThread({ title: body.slice(0, 64) });
          nextChatId = created.threadId;
          goToChat(nextChatId);
        }

        const prefixedBody = selectedProfile.promptPrefix
          ? `${selectedProfile.promptPrefix}\n\n${body}`
          : body;

        await sendMessage({ threadId: nextChatId, body: prefixedBody });
      } catch (err) {
        setError(err instanceof Error ? err.message : "تعذر إرسال الرسالة.");
      } finally {
        setIsSending(false);
        setIsAwaitingAssistant(false);
      }
    },
    [
      activeChatId,
      createThread,
      goToChat,
      isAuthenticated,
      selectedProfile.promptPrefix,
      sendMessage,
    ],
  );

  const removeChat = useCallback(
    async (targetChatId: string) => {
      await deleteThread({ threadId: targetChatId });
      if (targetChatId === activeChatId) {
        goToNewChat();
      }
    },
    [activeChatId, deleteThread, goToNewChat],
  );

  const selectChat = useCallback(
    (targetChatId: string) => {
      goToChat(targetChatId);
    },
    [goToChat],
  );

  const hasDispatchedInitialPromptRef = useRef(false);
  useEffect(() => {
    if (!initialPrompt || hasDispatchedInitialPromptRef.current) return;
    hasDispatchedInitialPromptRef.current = true;
    void send(initialPrompt);
  }, [initialPrompt, send]);

  return {
    user,
    isAuthenticated,
    isAuthLoading,
    dwsId,
    chats,
    activeChatId,
    messages,
    pendingActions,
    isLoadingChat: Boolean(activeChatId) && uiMessages?.status === "LoadingFirstPage",
    isLoadingSidebar: Boolean(isAuthenticated) && threadsResult === undefined,
    isSending,
    isAwaitingAssistant,
    selectedProfile,
    selectedProfileId,
    setSelectedProfileId,
    error,
    setError,
    send,
    createChat,
    selectChat,
    removeChat,
    goToNewChat,
    saveActionPayload: async (actionId: Id<"developerActions">, payload: unknown) => {
      await updateActionPayload({ actionId, payload });
    },
    confirmPendingAction: async (
      actionId: Id<"developerActions">,
      editedPayload?: unknown,
    ) => {
      await confirmAction({ actionId, editedPayload });
    },
    cancelPendingAction: async (actionId: Id<"developerActions">) => {
      await cancelAction({ actionId });
    },
  };
}
