"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { AuthModal } from "@/components/auth/auth-modal";
import { useSession } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const nextTarget = searchParams.get("next")?.trim() || "/ws/chat/new";
  const { data: session, isPending } = useSession();

  useEffect(() => {
    if (isPending) return;
    if (session) {
      router.replace(nextTarget);
    }
  }, [isPending, nextTarget, router, session]);

  return (
    <AuroraBackground className="bg-transparent">
      <main className="flex min-h-screen items-center justify-center px-4" dir="rtl">
        <AuthModal
          isOpen={!session}
          onClose={() => router.replace("/")}
          callbackURL={nextTarget}
        />

        <div className="w-full max-w-md rounded-3xl border border-black/10 bg-white/70 p-5 text-center shadow-2xl backdrop-blur-2xl">
          <p className="text-sm font-black">تسجيل الدخول</p>
          <p className="mt-1 text-xs text-[var(--subtle)]">
            {session ? "تم تسجيل الدخول، يتم تحويلك..." : "استخدم نافذة التوثيق للمتابعة"}
          </p>
        </div>
      </main>
    </AuroraBackground>
  );
}
