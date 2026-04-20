# AGENTS.md

Context for AI coding agents (and humans). Keep this short — code is the source of truth.

## What this is

Personal site for Martin Miglio. Single app, not a monorepo. TanStack Start rendered on AWS Lambda via SST.

## Sources of truth (don't restate here — read these)

- Scripts, deps, Node/bun versions → `package.json`
- Lint/format config → `.oxlintrc.json`, `.oxfmtrc.json`
- Git hooks → `lefthook.yml`
- App infra (stages, domains, runtime) → `sst.config.ts`
- Deploy/CI behavior → `.github/workflows/`
- Deploy internals + OIDC bootstrap → [`infra/AGENTS.md`](./infra/AGENTS.md)

## Opinions

- **Use `bun` + `bunx`.** Don't reach for `npm`/`pnpm`/`yarn`/`npx`.
- **`oxlint` + `oxfmt` only.** Don't reach for biome, prettier, or eslint.
- **No commit co-author trailers.** Don't add Claude/Anthropic authorship.
- **Don't bypass hooks (`--no-verify`)** unless explicitly asked.

## Editing this doc

**Sharpen existing rules, don't append.** Add a new rule only when it's orthogonal to every existing one _and_ names a trap that code/configs can't express. Describe current state, never history or diffs (no "replaced", "migrated", "don't add back" — that rots the moment the old thing is forgotten). Terse and strong beats thorough and soft. Applies to all agent docs in this repo.
