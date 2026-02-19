"use client";

import { useState } from "react";
import { Blocks, MessageSquareMore } from "lucide-react";
import { cn } from "@/lib/utils";
import { SolidComponentsShowcase } from "@/components/developer/showcase/solid-components-showcase";
import { ConversationComponentsShowcase } from "@/components/developer/showcase/conversation-components-showcase";

type ShowcaseTab = "solid" | "conversation";

const TABS: { id: ShowcaseTab; label: string; icon: typeof Blocks }[] = [
  { id: "solid", label: "Solid Components", icon: Blocks },
  {
    id: "conversation",
    label: "Conversation Components",
    icon: MessageSquareMore,
  },
];

export function ComponentShowcase() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("solid");

  return (
    <div className="mx-auto w-full max-w-6xl space-y-8 p-6 font-cairo md:p-10" dir="rtl">
      <header className="space-y-3">
        <p className="text-[10px] font-black uppercase tracking-[0.22em] text-[var(--subtle)]/70">
          Eag UI Showcase
        </p>
        <h1 className="text-4xl font-black">Starter Template For Agenting Apps</h1>
        <p className="max-w-3xl text-sm font-bold leading-relaxed text-[var(--subtle)]">
          تم تقسيم الواجهة إلى مكونات صلبة قابلة للمشاركة ومكونات محادثة تنفيذية تؤكد الإجراءات قبل التنفيذ.
        </p>
      </header>

      <nav className="flex flex-wrap gap-2">
        {TABS.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              "inline-flex items-center gap-2 rounded-2xl border px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] transition-colors",
              activeTab === tab.id
                ? "border-black bg-black text-white"
                : "border-black/10 bg-white/70 hover:border-black/25",
            )}
          >
            <tab.icon className="h-4 w-4" />
            {tab.label}
          </button>
        ))}
      </nav>

      {activeTab === "solid" ? (
        <SolidComponentsShowcase />
      ) : (
        <ConversationComponentsShowcase />
      )}
    </div>
  );
}
