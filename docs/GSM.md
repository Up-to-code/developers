# GSM: Guiding System Manual (DWS Agent UI)

## 1) Core Domain Naming
- `DWS`: Developer Workspace scope.
- `Chat`: Conversation container under DWS.
- `chatId`: Stable identifier used in route and data access.
- Frontend uses `chatId`; backend thread IDs are mapped only in the hook boundary.

## 2) Route Contract
- Primary route: `/workspace/[chatId]`
- New chat route: `/workspace/new`
- Backward compatibility routes may redirect from old `/workspace` paths.

## 3) Architecture Boundaries
- `hooks/use-dws-chat.ts`: Data + mutations + route synchronization.
- `components/dws/*`: Chat shell and orchestration UI.
- `components/eag-ui/solid/*`: Prop-driven, shareable primitives.
- `components/eag-ui/conformer/*`: Action confirmation lifecycle UI.
- `components/eag-ui/motion/*`: Thinking/reading/resolved state visuals.
- `components/eag-ui/skeleton/*`: Sidebar and chat loading states.

## 4) Shareable Component Rules
- Solid components must be pure UI with typed props and no data fetching.
- Conversation components can own local UI state but must receive business actions via callbacks.
- Reusable components should not reference route/query APIs directly.

## 5) Action Lifecycle Standard (Conformer)
- `pending`: render editable payload + Save/Confirm/Cancel.
- `confirmed/executed`: lock fields and show execution result.
- `cancelled/failed`: show status feedback with clear tone.
- Every destructive/critical action must include explicit user confirmation.

## 6) Motion Semantics
- `ThinkingMotion`: agent planning state.
- `ReadingMotion`: context aggregation state.
- `ResolvedMotion`: completion acknowledgement.
- Never use motion without meaning; each animation should map to a real system state.

## 7) Loading Semantics
- `RailSkeleton`: loading chat list/skills rail.
- `ChatSkeleton`: loading message timeline.
- Global loading should reuse design tokens and motion components.

## 8) Data-Fetching Discipline
- Fetch and mutations are centralized in `use-dws-chat`.
- UI receives plain typed models (`DwsThread`, `DwsMessage`, `DwsAction`).
- Avoid passing Convex query objects into presentational components.

## 9) TypeScript Baseline
- Avoid `any` in UI and shared components.
- Use strict union types for statuses and profile IDs.
- Keep mapping/formatting logic in hooks, not in low-level UI primitives.

## 10) Starter Template Checklist
- New app should keep the same `workspace/chatId` route contract.
- Add domain-specific agent profiles in `components/dws/agent-profiles.ts`.
- Build feature UI from `eag-ui/solid` first, then compose into chat/timeline.
- Keep showcase split into:
  - `Solid Components`
  - `Conversation Components`
