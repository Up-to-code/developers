"use client";

import { useMemo, useState } from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { authClient } from "@/lib/auth-client";
import { useGlobalModal } from "@/components/ws/global-modal-provider";
import {
  ProfileAccountActions,
  ProfileAccountInfo,
  ProfileCard,
  ProfileHeader,
  ProfileNameEditor,
} from "@/components/profile";

const PROFILE_NAME_KEY = "anan.profile.displayName";

export default function ProfilePage() {
  const { data: session } = authClient.useSession();
  const { openModal } = useGlobalModal();

  const [savedName, setSavedName] = useState<string | null>(() =>
    typeof window !== "undefined" ? localStorage.getItem(PROFILE_NAME_KEY) : null,
  );
  const [draftName, setDraftName] = useState<string>(() =>
    typeof window !== "undefined" ? localStorage.getItem(PROFILE_NAME_KEY) ?? "" : "",
  );

  const displayName = useMemo(
    () => (savedName?.trim() || session?.user.name || "مستخدم عنان"),
    [savedName, session?.user.name],
  );

  const hasNameChange = draftName.trim().length > 0 && draftName.trim() !== (savedName ?? session?.user.name ?? "").trim();

  const handleSaveName = () => {
    const nextName = draftName.trim();
    if (!nextName) return;

    localStorage.setItem(PROFILE_NAME_KEY, nextName);
    setSavedName(nextName);
  };

  const handleLogout = () => {
    openModal({
      title: "تسجيل الخروج",
      description: "هل أنت متأكد من رغبتك في تسجيل الخروج من النظام؟",
      confirmLabel: "خروج",
      variant: "danger",
      onConfirm: async () => {
        await authClient.signOut();
        window.location.href = "/";
      },
    });
  };

  return (
    <AuroraBackground className="bg-transparent">
      <main className="mx-auto flex min-h-screen w-full max-w-5xl items-center justify-center p-4" dir="rtl">
        <section className="w-full overflow-hidden rounded-[2.5rem] border border-white/40 bg-white/55 shadow-2xl backdrop-blur-3xl">
          <ProfileHeader />

          <div className="grid gap-6 p-6 md:grid-cols-[280px_1fr]">
            <ProfileCard displayName={displayName} image={session?.user.image} />

            <div className="space-y-4">
              <ProfileNameEditor
                value={draftName}
                onChange={setDraftName}
                onSave={handleSaveName}
                canSave={hasNameChange}
                placeholder={session?.user.name ?? "اكتب الاسم الجديد"}
              />
              <ProfileAccountInfo email={session?.user.email ?? "user@anan.dev"} />
              <ProfileAccountActions onLogout={handleLogout} />
            </div>
          </div>
        </section>
      </main>
    </AuroraBackground>
  );
}
