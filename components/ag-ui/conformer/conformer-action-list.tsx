"use client";

import type { DwsAction } from "@/components/ws/types";
import { ConformerActionCard } from "./conformer-action-card";

type Props = {
  actions: DwsAction[];
  onSave: (actionId: DwsAction["_id"], payload: unknown) => Promise<void>;
  onConfirm: (actionId: DwsAction["_id"], payload?: unknown) => Promise<void>;
  onCancel: (actionId: DwsAction["_id"]) => Promise<void>;
};

export function ConformerActionList({ actions, onSave, onConfirm, onCancel }: Props) {
  if (actions.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {actions.map((action) => (
        <ConformerActionCard
          key={action._id}
          action={action}
          onSave={onSave}
          onConfirm={onConfirm}
          onCancel={onCancel}
        />
      ))}
    </div>
  );
}
