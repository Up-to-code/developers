# Starter Template Checklist

Use this checklist when cloning this project for a new agent app.

## 1. Branding

- Update app title/description in `app/layout.tsx`.
- Update landing copy in `components/landing/sections`.
- Update 404 and loading messages in `app/not-found-view.tsx` and `app/loading.tsx`.

## 2. Agent Profiles

- Edit profiles in `components/ws/agent-profiles.ts`.
- Set default profile (`DEFAULT_AGENT_PROFILE_ID`).
- Add profile-specific prompt prefix and UI labels.

## 3. Data and Actions

- Replace Convex functions used in `hooks/use-dws-chat.ts` with your domain actions.
- Keep pending action lifecycle:
  - `update payload`
  - `confirm`
  - `cancel`

## 4. Routes

- Keep route shape for compatibility:
  - `/ws/chat/new`
  - `/ws/chat/[id]`
- Keep auth callback flow:
  - `/auth/login?next=<target>`

## 5. UI Structure

- Reuse `components/ag-ui/*` primitives before adding new custom UI.
- Keep screens composed from shareable components only.
- Add new sections/components under domain folders (`components/ws`, `components/profile`, etc.).

## 6. Quality Gate (required before release)

```bash
npx tsc --noEmit
npm run lint
```
