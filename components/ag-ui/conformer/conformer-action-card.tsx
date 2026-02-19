"use client";

import { useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { FieldInput, StatusChip, SurfaceCard } from "@/components/ag-ui/solid";
import type { DwsAction } from "@/components/ws/types";

type Props = {
  action: DwsAction;
  onSave: (actionId: DwsAction["_id"], payload: unknown) => Promise<void>;
  onConfirm: (actionId: DwsAction["_id"], payload?: unknown) => Promise<void>;
  onCancel: (actionId: DwsAction["_id"]) => Promise<void>;
};

function toDraft(payload: unknown): Record<string, unknown> {
  if (payload && typeof payload === "object" && !Array.isArray(payload)) {
    return payload as Record<string, unknown>;
  }
  return {};
}

function statusTone(status: DwsAction["status"]) {
  if (status === "pending") return "pending" as const;
  if (status === "executed") return "success" as const;
  if (status === "failed" || status === "cancelled") return "danger" as const;
  return "info" as const;
}

function statusLabel(status: DwsAction["status"]) {
  if (status === "pending") return "بانتظار التأكيد";
  if (status === "confirmed") return "تم التأكيد";
  if (status === "executed") return "تم التنفيذ";
  if (status === "cancelled") return "ملغي";
  if (status === "failed") return "فشل";
  return status;
}

export function ConformerActionCard({ action, onSave, onConfirm, onCancel }: Props) {
  const [draft, setDraft] = useState<Record<string, unknown>>(toDraft(action.editablePayload));
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    setDraft(toDraft(action.editablePayload));
  }, [action._id, action.editablePayload]);

  const keys = useMemo(() => Object.keys(draft), [draft]);

  return (
    <SurfaceCard className="space-y-4" tone="soft">
      <div className="flex items-start justify-between gap-3">
        <div className="space-y-1">
          <p className="text-sm font-black">{action.title}</p>
          <p className="text-[10px] font-black uppercase tracking-[0.16em] text-[var(--subtle)]/60">
            {action.actionType}
          </p>
        </div>
        <StatusChip tone={statusTone(action.status)}>{statusLabel(action.status)}</StatusChip>
      </div>

      {keys.length > 0 ? (
        <div className="grid gap-3 md:grid-cols-2">
          {keys.map((key) => (
            <FieldInput
              key={key}
              label={key}
              value={draft[key] == null ? "" : String(draft[key])}
              onChange={(event) =>
                setDraft((previous) => ({ ...previous, [key]: event.target.value }))
              }
              disabled={action.status !== "pending"}
            />
          ))}
        </div>
      ) : null}

      {action.status === "pending" ? (
        <div className="flex flex-wrap gap-2">
          <Button
            size="sm"
            variant="outline"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await onSave(action._id, draft);
              } finally {
                setBusy(false);
              }
            }}
          >
            حفظ الحقول
          </Button>
          <Button
            size="sm"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await onConfirm(action._id, draft);
              } finally {
                setBusy(false);
              }
            }}
          >
            تأكيد التنفيذ
          </Button>
          <Button
            size="sm"
            variant="ghost"
            disabled={busy}
            onClick={async () => {
              setBusy(true);
              try {
                await onCancel(action._id);
              } finally {
                setBusy(false);
              }
            }}
            className="text-red-600 hover:bg-red-500/10 hover:text-red-700"
          >
            إلغاء
          </Button>
        </div>
      ) : action.executionResult ? (
        <pre className="overflow-auto rounded-2xl border border-[var(--border)] bg-[var(--surface)] p-3 text-[10px] text-[var(--subtle)]">
          {JSON.stringify(action.executionResult, null, 2)}
        </pre>
      ) : null}
    </SurfaceCard>
  );
}
