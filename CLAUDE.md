# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```sh
pnpm dev          # start dev server
pnpm build        # production build
pnpm preview      # start server on production build
pnpm check        # svelte-check + biome check --write (full type check + lint)
pnpm lint         # biome lint only
pnpm format       # biome format --write
pnpm db:push      # push schema changes to DB (no migration file)
```

## Architecture

**Libiamo** is a language learning app (en/es/fr/ja) that simulates social platforms (Reddit, Discord, email, iMessage, AO3). Users complete communication tasks to develop pragmatic language skills.

### Route Groups

- `(app)/` — authenticated user-facing pages (hall, task detail, profile). Layout redirects unauthenticated users to `/sign-in`.
- `(auth)/` — sign-in, sign-up, forgot/reset password, email verify.
- `(admin)/` — admin panel at `/admin/templates` and `/admin/schedule`.

### Server-side Code (`src/lib/server/`)

- `auth.ts` — better-auth instance with email/password, email verification, and additional user fields (`role`, `activeLanguage`, `timezone`, `nativeLanguage`, `gemsBalance`).
- `db/index.ts` — exports `db` (Drizzle client connected via `DATABASE_URL`).
- `db/schema.ts` — business tables: `userLearningProfile`, `template`, `task`. Imports and re-exports `auth.schema.ts` and `enums.ts`.
- `db/auth.schema.ts` — **auto-generated** but manually added columns to user table.
- `email.ts` — nodemailer wrapper for sending transactional email.
- `tasks.ts` — `ensureTasksForDate()` auto-schedules tasks on each page load by picking the least-recently-scheduled active templates. `scheduleTaskManually()` is used by the admin schedule page.

### Auth Flow

`hooks.server.ts` calls `auth.api.getSession()` on every request and populates `event.locals.user` and `event.locals.session`. The `(app)` layout server redirects to `/sign-in` if no user. The `App.Locals` type is declared in `src/app.d.ts`.

### Template → Task Pipeline

Templates store base content with `{{slot}}` placeholders and a `candidates` JSONB array (each candidate has `slots` for substitution and optional `context`). When tasks are needed, a random candidate is picked, slots are resolved, and a `task` row is inserted. Weekly tasks are dated to the Monday of the current week; daily tasks are dated to today.

### i18n

Custom `t(lang, key)` function in `src/lib/i18n.ts`. The user's `activeLanguage` field drives the language. No external i18n library.

### Validation

All form data is validated with Zod schemas in `src/lib/schemas.ts` — auth schemas, `profileSchema`, `switchLanguageSchema`, `templateSchema`, `scheduleManualSchema`.

### UI

- TailwindCSS v4 via `@tailwindcss/vite`. CSS entry at `src/routes/layout.css`.
- shadcn-svelte (vega style, neutral base, lucide icons). Components in `src/lib/components/ui/`.
- Non-UI components (`Navbar.svelte`, `WineGlassIcon.svelte`) live in `src/lib/components/` directly.
- `cn()` in `src/lib/utils.ts` for class merging (clsx + tailwind-merge).
- User avatars via Cravatar (MD5 of email) — computed in `(app)/+layout.server.ts`.

### Svelte 5

All `.svelte` files run in runes mode (`$state`, `$props`, `$derived`, etc.) — enforced globally in `svelte.config.js`. Do not use Svelte 4 reactive syntax (`$:`, `export let`).

## Important Notes for Claude

- Code style: Tabs for indentation, not spaces. Double quotes for JS/TS strings.
- During plan: Keep in mind that you should often use the ask for clarify tool to ask user when there are multiple good ways to implement the requested change. When introducing an external package is needed, analyze the pros and cons, ask the user and present alternatives.
- Use `frontend-design@claude-plugins-official` skill to help with visual design.
- Before finish: Use `pnpm format` and `pnpm check` to ensure code quality before marking an edit session fully completed.
- Use context7 mcp tool to look up documentation when getting stuck on problems. Only use it when it's very necessary.
- DB schema draft: See `docs/DB.md` for the full planned schema including tables not yet implemented.
- Roadmap: See `docs/ROADMAP.md` for details of each phase. The LLM/practice-session layer is Phase A2 (not yet implemented).
