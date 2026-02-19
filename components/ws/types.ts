import type { Id } from "convex/_generated/dataModel";

export type DwsThread = {
  _id: string;
  title?: string;
  _creationTime?: number;
};

export type DwsMessage = {
  id: string;
  role: "user" | "assistant";
  text: string;
  timestamp: string;
};

export type DwsAction = {
  _id: Id<"developerActions">;
  title: string;
  actionType: string;
  status: "pending" | "confirmed" | "cancelled" | "executed" | "failed";
  editablePayload: unknown;
  executionResult?: unknown;
};
