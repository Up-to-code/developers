# AG UI System Design (GSM)

**AG UI** is a "Solid" design system for agentic applications. It separates components into two distinct layers: **Solid Components** (Presentation) and **Conversation Components** (Stateful/Interactive).

## 1. Component Architecture

### Solid Components (`components/ag-ui/solid`)
- **Pure & Stateless**: Driven entirely by props. No internal side effects or complex state.
- **Shareable**: Can be used in any context (Showcase, Dashboard, Chat, Email).
- **Visuals**: High-fidelity, industrial "Zero-UI" aesthetic.
- **Examples**:
  - `SolidCard`: A glass container with no borders.
  - `SolidInput`: A floating, borderless input field.
  - `SolidButton`: High-contrast, industrial feedback button.

### Conformer Components (`components/ag-ui/conformer`)
- **Action Verification**: Components specifically designed to display a pending action and request user confirmation.
- **Pattern**: `[Action Details] -> [Confirm/Cancel]`.
- **Usage**: Used inside the chat timeline when the agent proposes a tool call.

### Motion Primitives (`components/ag-ui/motion`)
- **Weightless**: Animations that feel like they are floating in an aurora.
- **Organic**: Breathing, pulsing, and thinking states.
- **Examples**: `ThinkingMotion`, `ReadingMotion`.

### Skeleton Loaders (`components/ag-ui/skeleton`)
- **Structural Echo**: Skeletons that match the "Solid" layout.
- **Examples**: `RailSkeleton`, `ChatSkeleton`.

## 2. Directory Structure

```
components/ag-ui/
├── solid/           # Pure, shareable components
├── conformer/       # Action confirmation flows
├── motion/          # Animation primitives
└── skeleton/        # Loading states
```

## 3. Design Principles

- **Naked Purity**: Remove containers, borders, and dividers wherever possible.
- **Industrial Rhythm**: Use Cairo font with specific weights (Black, Bold) and spacing (Cairo 1.1).
- **Aether States**: Interactives should feel like they are floating.

## 4. Starter App Contract

- Route contract: `/ws/chat/new` and `/ws/chat/[id]`.
- Data contract: chat is always addressed by `chatId`; workspace identity is `dwsId`.
- Auth contract: unauthenticated access redirects to `/auth/login?next=<target>`.
- UI contract: chat shell is split into `sidebar`, `header`, `content`, `composer`, `timeline`.
- Action contract: every pending action must have edit, confirm, and cancel lifecycle in chat.
