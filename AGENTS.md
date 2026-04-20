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

## Opinions (non-obvious, don't second-guess)

- **`bun`, not `npm`/`pnpm`/`yarn`.** `bunx` over `npx`.
- **`oxlint` + `oxfmt`, not biome/prettier/eslint.** Don't add them back.
- **`lefthook`, not husky.** `bun install` wires it up via `prepare`.
- **No commit co-author trailers.** Don't add Claude/Anthropic authorship.
- **Don't bypass hooks (`--no-verify`)** unless explicitly asked.

## Invariants

- `production` and `develop` deploy only from CI — never `sst deploy` to them from a laptop.
- `src/routeTree.gen.ts` is generated; don't hand-edit.

## Editing this doc

When something changes, **sharpen an existing rule before adding a new one.** Merge, tighten, or delete — don't append. If a rule no longer bites, remove it. Terse and strong beats thorough and soft. Same applies to `infra/AGENTS.md`.

## Starting points

- App code: `src/`
- Infra: `sst.config.ts`, `infra/`
- CI: `.github/workflows/`
