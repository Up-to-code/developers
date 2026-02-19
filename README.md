# Anan Developers Starter Template

قالب جاهز لبناء تطبيقات Agentic UI باستخدام Next.js + Convex.

## Core Architecture

- `DWS (Developer Workspace)` يحتوي كل شيء.
- `Chat` هو الوحدة الأساسية داخل `DWS`.
- كل شاشة مبنية من `solid/shareable components`.
- الإجراءات (Actions) تعرض داخل المحادثة مع `confirm/cancel`.

## Routes

- `/` صفحة البداية (Landing).
- `/ws/chat/new` محادثة جديدة.
- `/ws/chat/[id]` محادثة حسب `chatId`.
- `/auth/login?next=...` تسجيل الدخول ثم الرجوع للمسار المطلوب.
- `/profile` إدارة الملف الشخصي.
- `/showcase` استعراض مكونات النظام.

## Design System Folders

- `components/ag-ui/solid` مكونات واجهة ثابتة عبر props.
- `components/ag-ui/conformer` مكونات تأكيد الإجراءات.
- `components/ag-ui/motion` حالات التفكير/القراءة/الإنجاز.
- `components/ag-ui/skeleton` تحميلات متناسقة.

## App Feature Folders

- `components/ws` مكونات الشات الأساسية.
- `components/ws/shell` تقسيم هيكل شاشة الشات.
- `components/landing/sections` أقسام صفحة البداية.
- `components/profile` مكونات صفحة الملف الشخصي.

## Run

```bash
bun dev
```

أو:

```bash
npm run dev:developers
```

## Environment

```bash
NEXT_PUBLIC_CONVEX_URL=your_convex_url
NEXT_PUBLIC_SITE_URL=http://localhost:3003
```

## Quality Gates

```bash
npx tsc --noEmit
npm run lint
```

Starter onboarding checklist: `docs/STARTER_TEMPLATE.md`.
