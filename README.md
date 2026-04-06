# Libiamo

Language learning app that simulates real social interactions (Reddit, Discord, email, etc.) using LLM agents. Users complete communication tasks to develop pragmatic language skills.

## Tech Stack

- Fullstack with SvelteKit (SSR, MPA architecture) and Svelte 5
- pnpm
- Biome (format + lint)
- Zod (validation)
- Drizzle ORM + PostgreSQL
- TailwindCSS v4 + shadcn-svelte
- better-auth (email/password, SMTP for signup verification emails)

## Developing

Once you've created a project and installed dependencies with `pnpm install`, start a live server:

```sh
pnpm dev
```

## Building

To create a production version of your app:

```sh
pnpm build
```

You can preview the production build with `pnpm preview`.

> To deploy your app, you may need to install an [adapter](https://svelte.dev/docs/kit/adapters) for your target environment.

## Features

### User Avatars (Cravatar Integration)
Libiamo uses [Cravatar](https://cravatar.cn) (a Gravatar alternative optimized for speed) to manage user avatars.
- **Zero Local Storage:** Avatars are dynamically generated based on the MD5 hash of the user's registered email address, saving significant server storage and database complexity.
- **Default Fallbacks:** If user's email doesn't have a linked avatar on Cravatar or Gravatar, an automatic `ident-icon` (a visually unique geometric pattern) is presented.
- **Global Sync:** Users can change their avatars globally across multiple platforms by updating it once on Cravatar or Gravatar website.
