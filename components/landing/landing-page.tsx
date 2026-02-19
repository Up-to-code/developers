"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Route } from "next";
import { useSession } from "@/lib/auth-client";
import { AuthModal } from "@/components/auth/auth-modal";
import { AuroraBackground } from "@/components/ui/aurora-background";
import {
  LandingFooterCta,
  LandingFeaturesGrid,
  LandingHero,
  LandingPhilosophy,
  LandingQuickLinks,
} from "@/components/landing/sections";

export function LandingPage() {
    const router = useRouter();
    const { data: session } = useSession();
    const [query, setQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        const target = `/ws/chat/new?q=${encodeURIComponent(query)}` as Route;

        if (!session) {
            setIsAuthModalOpen(true);
            return;
        }

        router.push(target);
    };

    return (
        <div className="bg-slate-50 min-h-screen overflow-y-auto">
            <AuthModal
                isOpen={isAuthModalOpen}
                onClose={() => setIsAuthModalOpen(false)}
                callbackURL={`/ws/chat/new?q=${encodeURIComponent(query.trim())}`}
            />
            <main className="relative flex flex-col items-center font-cairo text-[var(--foreground)] selection:bg-black/10">

                {/* Hero Section with Aurora */}
                <AuroraBackground className="bg-transparent w-full">
                    <LandingHero
                        query={query}
                        isFocused={isFocused}
                        onFocusChange={setIsFocused}
                        onQueryChange={setQuery}
                        onSubmit={handleSubmit}
                        footer={<LandingQuickLinks />}
                    />
                </AuroraBackground>

                {/* Content Sections - Pure White Background */}
                <div className="relative z-10 w-full max-w-6xl space-y-32 pb-32 pt-20 px-4">
                    <LandingFeaturesGrid />
                    <LandingPhilosophy />
                    <LandingFooterCta onStart={() => router.push("/ws/chat/new" as Route)} />
                </div>
            </main>
        </div>
    );
}
