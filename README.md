# Anan Developers

A production-ready starter template for building Agentic UI applications with **Next.js 16**, **Convex**, and **Better Auth**.

## Tech Stack

- **Next.js 16** — App Router
- **Convex** — Backend & real-time data
- **Better Auth** — Authentication
- **Tailwind CSS 4** — Styling
- **React 19** — UI
- **TypeScript** — Type safety

## Prerequisites

- Node.js 18+ or [Bun](https://bun.sh)
- A [Convex](https://convex.dev) account

## Quick Start

```bash
# Install dependencies
bun install
# or: npm install

# Copy environment template
cp .env.example .env.local

# Add your Convex URL to .env.local, then:
bun dev
# or: npm run dev
```

App runs at [http://localhost:3003](http://localhost:3003).

## Scripts

| Command | Description |
|---------|-------------|
| `bun dev` / `npm run dev` | Start dev server (port 3003) |
| `bun run build` / `npm run build` | Production build |
| `bun run start` / `npm start` | Start production server |
| `npm run lint` | Run ESLint |

## Environment

Copy `.env.example` to `.env.local` and fill in:

```bash
CONVEX_DEPLOYMENT=          # From `npx convex dev`
NEXT_PUBLIC_CONVEX_URL=     # From Convex dashboard
NEXT_PUBLIC_CONVEX_SITE_URL= # From Convex dashboard
NEXT_PUBLIC_SITE_URL=       # http://localhost:3003 (dev) or your domain (prod)
```

Run `npx convex dev` to create/link a Convex project and get these values.

## Core Architecture

- **DWS (Developer Workspace)** — Main workspace container
- **Chat** — Core unit; every screen is built from it
- **Solid components** — Reusable UI via props
- **Actions** — Shown in chat with confirm/cancel flows

## Routes

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/ws/chat/new` | New chat |
| `/ws/chat/[id]` | Chat by ID |
| `/auth/login?next=...` | Login with redirect |
| `/profile` | Profile management |
| `/showcase` | Component showcase |

## Project Structure

```
app/                  # Next.js App Router pages
components/
  ag-ui/              # Design system (solid, conformer, motion, skeleton)
  ws/                 # Chat & workspace components
  landing/            # Landing page sections
  profile/            # Profile components
convex/               # Convex functions & schema
hooks/                # React hooks
lib/                  # Utilities & config
docs/                 # Documentation
```

## Design System

- `components/ag-ui/solid` — Static UI components
- `components/ag-ui/conformer` — Action confirmation dialogs
- `components/ag-ui/motion` — Loading, thinking, done states
- `components/ag-ui/skeleton` — Skeleton loaders

## Quality

Before commit or deploy:

```bash
npx tsc --noEmit
npm run lint
```

## Documentation

- [Starter Template Checklist](docs/STARTER_TEMPLATE.md) — Onboarding for new agent apps
- [System Design](SYSTEM_DESIGN.md) — Architecture overview
