### Phase A1

(auth) — minimal layout, no nav
/sign-in
/sign-up
/verify
/forgot-password

(app) — authenticated layout with nav + language switcher
/ — Task Hall (home)
/task/[id] — Task detail + background material

(admin) — admin role required
/admin/templates — template list (filterable)
/admin/templates/new — create template
/admin/templates/[id] — view / edit template
/admin/schedule — view + manage task scheduling

### Phase A2

(app)
/task/[id]/session — active practice session (LLM chat/write UI)
/task/[id]/session/[sessionId] — resume or review a past session
/history — user's practice session history

## Core Concepts

Roles:
- learner: browse tasks, view backgrounds, complete sessions
- admin: manage templates, schedule tasks

Template vs Task:
- Template: reusable blueprint with {{slot}} placeholders and multiple candidates
- Task: scheduled instance with slots resolved from a random candidate

Scheduled Task amount:
- weekly tasks: 3 tasks per week, date stored as Monday
- daily tasks: 3 task per day

Task types (how LLM is invoked):
- chat: real-time multi-turn conversation
- oneshot: single long response (e.g. AO3 comment)
- slow: delayed replies (email, forum)
- translate: translation exercise

UI variants (frontend layout): reddit, apple_mail, discord, imessage, ao3, translator

Auto-scheduling: when user loads tasks for a date with insufficient scheduled tasks, system auto-fills from active templates, prioritizing oldest lastScheduledAt.

## Phase A1 Scope

- Auth: signup, login, email verification, password reset
- Task Hall: display weekly/daily tasks for current active language
- Task detail: view background material and objectives
- Profile: update settings, switch active language
- Admin - Templates: list, create, edit, soft-delete (isActive=false)
- Admin - Scheduling: manual task scheduling, view scheduled tasks

## Phase A2 Scope

Practice sessions:
- Start session: create practiceSession, randomly select persona from pool
- Session UI: render platform-specific interface (imessage, reddit, etc.)
- Send message: user sends message, LLM agent responds (for chat/slow types)
- Request hint: ask tutor agent for help without consuming turns
- Complete session: mark complete, trigger evaluation
- Tutor feedback: LLM evaluates conversation against objectives
- Rewards: grant points and gems on first completion

Session states:
- in_progress: active session
- completed: user finished, awaiting evaluation
- evaluated: feedback generated
- abandoned: user left without completing

Turn counting:
- Each user message = 1 turn
- maxTurns limits total user messages
- Hints don't consume turns
