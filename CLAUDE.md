# Project Rules — getslate.net

These rules are mandatory. Do not deviate without explicit user approval.

## What getslate.net Is

Marketing site for the Slate / Slate Freelance product line. The "free tools" funnel that captures leads and routes them to the paid apps. Hosts ~30 fillable production-industry templates (NDA, location release, model release, video production contract, etc.).

- **Domain:** getslate.net (and `www.getslate.net`)
- **Branch:** `main`
- **Vercel project:** `getslate` under `sdubmedias-projects`
- **Repo:** `~/getslate`

## Golden Rules

1. **Run `npx tsc -b --noEmit` before saying you're done.** Zero type errors allowed.
2. **Run `npx eslint .` before pushing.** Zero errors. Warnings OK if intentional.
3. **Run `pnpm build` before pushing.** Build must succeed (also regenerates the sitemap).
4. **Search before creating files.** ~30 template pages already exist; check `src/pages/templates/` first.
5. **Do not install new dependencies without asking.**
6. **Do not modify files in `src/components/ui/`.** Those are managed by shadcn/ui.
7. **Do not rewrite git history.** No rebase, amend, or force-push.

## Stack

- **Frontend:** React 19 + TypeScript + Vite + Tailwind CSS 4
- **Lead capture:** Supabase (`leads` table); minimal API surface in `api/capture-lead.ts` and `api/track-tool.ts`
- **Routing:** Wouter
- **UI:** shadcn/ui
- **Package Manager:** pnpm. **Delete package-lock.json if it appears.**

## Generated DB types

`src/lib/database.types.ts` (Slate's Supabase project — same DB getslate writes leads to). Regenerate: `SUPABASE_ACCESS_TOKEN=sbp_... pnpm gen:types`.

## Tools Registry

Single source of truth: `src/toolRegistry.ts`. Every free tool must be registered there. The registry powers:
- `/tools` index page
- `RelatedTools` widget on each template
- Homepage featured block
- Sitemap generation (`scripts/build-sitemap.mjs`)
- SEO metadata

Adding a new tool requires (1) a page in `src/pages/templates/`, (2) a route in `src/App.tsx`, (3) a registry entry.

## API Endpoints

```typescript
import type { VercelRequest, VercelResponse } from "@vercel/node";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") return res.status(405).json({ error: "POST required" });
  try {
    // business logic
    return res.status(200).json({ ok: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error";
    return res.status(500).json({ error: msg });
  }
}
```

**`catch (err: any)` is forbidden.** Catch `unknown` and narrow with `instanceof Error`.

**Request body destructures** must use a typed cast: `(req.body || {}) as Record<string, string | undefined>`. Never use `as any`.

## Components — Rules

- Never define React components inside other components
- Use `cn()` from `@/lib/utils` for conditional classes
- Dark theme only

## CI / Pre-commit

- GitHub Actions runs `tsc + eslint + build` on every push and PR.
- Husky pre-commit runs ESLint + tsc on staged files via `lint-staged`.

## What NOT To Do

- **Don't use `catch (err: any)`.** Catch `unknown` and narrow.
- **Don't write to refs during render.** Belongs in `useEffect`.
- **Don't `setLoading(true)` before validation.** Validate first, set loading after.
- **Don't use `window.location.href = url`.** Use `window.location.assign(url)`.
- **Don't add console.log for debugging.** Remove before committing.
- **Don't use npm.** This project uses pnpm.
- **Don't ship a tool without a registry entry.** Sitemap + metadata depend on it.
