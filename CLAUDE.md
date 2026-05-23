# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

@AGENTS.md

## Commands

Package manager is **pnpm** (see `pnpm-lock.yaml`).

- `pnpm dev` — Next dev server (uses `--webpack`, not Turbopack)
- `pnpm build` / `pnpm start` — production build / serve
- `pnpm lint` — ESLint (flat config, `eslint-config-next`)
- `npx prisma migrate dev` — apply migrations against `DATABASE_URL`
- `npx prisma db seed` — runs `tsx prisma/seed.ts` (configured in `prisma.config.ts`)
- `npx prisma generate` — regenerates client into the **custom path** `src/lib/generated/prisma` (not `node_modules/.prisma`)

There is no test runner configured.

## Architecture

**Stack:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind v4 · Prisma 6 (PostgreSQL via `@prisma/adapter-pg`) · NextAuth v5 beta · shadcn/Radix UI. Path alias `@/*` → `./src/*`.

### Multitenancy (load-bearing)

- The `Tenant` model owns `User` (nullable `tenantId` — `SUPER_ADMIN` has none) and `Course` (required `tenantId`). Other LMS models (`Module`, `Lesson`, `Enrollment`, `LessonProgress`) inherit tenancy transitively through `Course.tenantId`.
- Tenant is resolved per-request by `getTenantId()` in `src/lib/getTenant.ts`, which reads `session.user.tenantId` from the JWT and **throws if absent**. There is no global middleware enforcing this — every API route / server action that touches tenant-scoped data must call it explicitly.
- Roles: `SUPER_ADMIN` (platform-wide), `ADMIN` (tenant admin), `INSTRUCTOR`, `STUDENT`.

### Auth

- `src/lib/auth.ts` exports `{ handlers, signIn, signOut, auth }` from NextAuth v5 beta with `@auth/prisma-adapter`.
- Providers: Google, GitHub, Credentials (bcryptjs).
- **Session strategy is JWT** (not DB sessions). The `jwt`/`session` callbacks propagate `id`, `tenantId`, and `role` from the User row into every session — any new claim must be added in both callbacks.
- API entry: `src/app/api/auth/[...nextauth]/route.ts`.

### Prisma

- Client is initialized in `src/lib/prisma.ts` using `PrismaPg` adapter (pooled pg). Singleton cached on `global` outside production.
- **Generator output is `src/lib/generated/prisma`** — import the client from there, not from `@prisma/client`. After schema changes always run `npx prisma generate`.
- Seed runs via `tsx prisma/seed.ts` per `prisma.config.ts`.

### Routing

- Route groups under `src/app/`: `(auth)` (sign in / sign up), `(dashboard)` (protected course/module/lesson UI), `(marketing)` (public landing). Root `layout.tsx` wraps all groups with the AuthProvider.
- REST handlers under `src/app/api/`: `auth/`, `auth/register/`, `courses/`, `modules/`, `lessons/`.

### Next 16 specifics worth knowing

- `proxy.ts` at repo root re-exports `auth as proxy` — Next 16's `proxy.ts` has replaced/augmented `middleware.ts` for some flows; do not treat it as an unused file.
- `envConfig.ts` calls `loadEnvConfig` from `@next/env` and is imported by `prisma.config.ts` so the Prisma CLI sees `DATABASE_URL`.
- `next.config.ts` is empty; `eslint.config.mjs` is stock `next/core-web-vitals` + `next/typescript`.

### Styling

- Tailwind v4 via `@tailwindcss/postcss` — **no `tailwind.config.ts`**. Theme tokens (oklch color palette, radii, spacing) are declared in `src/app/globals.css` inside an `@theme inline` block. Dark mode is class-based (`.dark`).

## Conventions

- UI copy, seed data, and console messages are **Spanish-first** — match the existing locale when adding strings.
- Before writing code that touches Next / Prisma / NextAuth / Tailwind APIs, check `node_modules/next/dist/docs/` (or the package's own docs) — versions here are newer than the model's training cutoff for many APIs.
