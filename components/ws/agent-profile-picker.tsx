"use client";

import { useMemo } from "react";
import { type ElementType } from "react";
import {
  Building2,
  Gavel,
  LayoutGrid,
  LineChart,
  Search,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { AGENT_PROFILES, type AgentProfileId } from "./agent-profiles";

type Props = {
  value: AgentProfileId;
  onChange: (profileId: AgentProfileId) => void;
};

const PROFILE_ICONS: Record<AgentProfileId, ElementType> = {
  orchestrator: LayoutGrid,
  "deep-search": Search,
  "property-ops": Building2,
  "market-analyst": LineChart,
  "legal-compliance": Gavel,
};

export function AgentProfilePicker({ value, onChange }: Props) {
  const selectedProfile = useMemo(
    () => AGENT_PROFILES.find((p) => p.id === value),
    [value],
  );

  const isDefault = value === "orchestrator";

  if (!isDefault && selectedProfile) {
    const Icon = PROFILE_ICONS[value];
    return (
      <div className="flex items-center gap-2 mb-2 animate-in fade-in slide-in-from-bottom-2">
        <div className="flex items-center gap-2 rounded-xl bg-black px-3 py-2 text-white">
          <Icon className="h-3.5 w-3.5" />
          <span className="text-xs font-bold">{selectedProfile.title}</span>
          <button
            onClick={() => onChange("orchestrator")}
            className="mr-1 rounded-full bg-white/20 p-0.5 hover:bg-white/30 transition-colors"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-1 mb-2 overflow-x-auto pb-2 scrollbar-none mask-fade-sides">
      {AGENT_PROFILES.map((profile) => {
        const Icon = PROFILE_ICONS[profile.id];
        const isActive = value === profile.id;

        return (
          <button
            key={profile.id}
            onClick={() => onChange(profile.id)}
            className={cn(
              "group flex min-w-fit items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200",
              isActive
                ? "bg-black text-white"
                : "text-[var(--subtle)] hover:text-black hover:bg-black/5"
            )}
            title={profile.description}
          >
            <Icon className={cn("h-4 w-4", isActive ? "text-white" : "opacity-70 group-hover:opacity-100")} />
            <span className="text-xs font-bold">{profile.title}</span>
          </button>
        );
      })}
    </div>
  );
}
