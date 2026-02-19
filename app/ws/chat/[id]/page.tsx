import { DwsChatShell } from "@/components/ws/chat-shell";

type ChatPageProps = {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ q?: string; profile?: string }>;
};

export default async function ChatPage({ params, searchParams }: ChatPageProps) {
  const { id } = await params;
  const { q, profile } = await searchParams;

  return (
    <DwsChatShell
      dwsId="default"
      chatId={id}
      initialPrompt={q?.trim() || undefined}
      initialProfileId={profile?.trim() || undefined}
    />
  );
}
