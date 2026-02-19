import { redirect } from "next/navigation";

type DwsChatPageProps = {
  searchParams: Promise<{ q?: string; profile?: string }>;
};

export default async function DwsChatPage({ searchParams }: DwsChatPageProps) {
  const { q, profile } = await searchParams;

  const query = new URLSearchParams();
  if (q?.trim()) query.set("q", q.trim());
  if (profile?.trim()) query.set("profile", profile.trim());

  const suffix = query.size > 0 ? `?${query.toString()}` : "";
  redirect(`/ws/chat/new${suffix}` as never);
}
