# Anan Developers

Starter template for building Agentic UI applications with Next.js + Convex.

## Core Architecture

- **DWS (Developer Workspace)** — Contains everything
- **Chat** — Core unit within DWS
- Solid/shareable components for every screen
- Actions appear in chat with confirm/cancel

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/ws/chat/new` | New chat |
| `/ws/chat/[id]` | Chat by ID |
| `/auth/login?next=...` | Login with redirect |
| `/profile` | Profile management |
| `/showcase` | Component showcase |

## Design System

- `components/ag-ui/solid` — Static UI components
- `components/ag-ui/conformer` — Action confirmation
- `components/ag-ui/motion` — Loading/thinking states
- `components/ag-ui/skeleton` — Skeleton loaders

## Run

```bash
bun dev
```

Or:

```bash
npm run dev
```

Runs at [http://localhost:3003](http://localhost:3003)

## Environment

```bash
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_SITE_URL=http://localhost:3003
```

## Quality

```bash
npx tsc --noEmit
npm run lint
```

See `docs/STARTER_TEMPLATE.md` for onboarding checklist.
