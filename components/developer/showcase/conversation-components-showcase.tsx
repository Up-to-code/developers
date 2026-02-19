"use client";

import { useState } from "react";
import type { Id } from "convex/_generated/dataModel";
import { SurfaceCard } from "@/components/ag-ui/solid";
import { ConformerActionList } from "@/components/ag-ui/conformer";
import type { DwsAction } from "@/components/ws/types";

const SAMPLE_ACTIONS: DwsAction[] = [
  {
    _id: "showcase_property_create" as Id<"developerActions">,
    title: "Create Property Listing",
    actionType: "PROPERTY_CREATE",
    status: "pending",
    editablePayload: {
      name: "District 9 Residence",
      city: "Riyadh",
      price: "4,800,000 SAR",
      beds: "4",
    },
  },
  {
    _id: "showcase_status_update" as Id<"developerActions">,
    title: "Update Property Status",
    actionType: "PROPERTY_STATUS_UPDATE",
    status: "pending",
    editablePayload: {
      propertyId: "P-2031",
      from: "Draft",
      to: "Published",
    },
  },
] as const;

export function ConversationComponentsShowcase() {
  const [actions, setActions] = useState<DwsAction[]>(SAMPLE_ACTIONS);

  return (
    <div className="space-y-4">
      <SurfaceCard className="space-y-2" tone="default">
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-[var(--subtle)]/60">
          Conversation Components
        </p>
        <h3 className="text-lg font-black">Action -&gt; Confirmation -&gt; Execution</h3>
        <p className="text-sm font-bold text-[var(--subtle)]">
          هذا الجزء يمثل مكونات المحادثة الفعلية عندما يطلب المستخدم إجراءً يحتاج تأكيدًا قبل التنفيذ.
        </p>
      </SurfaceCard>

      <ConformerActionList
        actions={actions}
        onSave={async (actionId, payload) => {
          setActions((previous) =>
            previous.map((action) =>
              action._id === actionId ? { ...action, editablePayload: payload } : action,
            ),
          );
        }}
        onConfirm={async (actionId, payload) => {
          setActions((previous) =>
            previous.map((action) =>
              action._id === actionId
                ? {
                  ...action,
                  status: "executed",
                  editablePayload: payload ?? action.editablePayload,
                  executionResult: {
                    ok: true,
                    executedAt: new Date().toISOString(),
                    summary: "Action executed from showcase preview.",
                  },
                }
                : action,
            ),
          );
        }}
        onCancel={async (actionId) => {
          setActions((previous) =>
            previous.map((action) =>
              action._id === actionId ? { ...action, status: "cancelled" } : action,
            ),
          );
        }}
      />
    </div>
  );
}
