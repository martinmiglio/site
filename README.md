# martinmiglio.dev

My personal site. Live at [martinmiglio.dev](https://martinmiglio.dev).

TanStack Start on AWS via SST.

## Deployments

All deploys run in GitHub Actions via OIDC.

| Stage        | Trigger           | Domain                     |
| ------------ | ----------------- | -------------------------- |
| `production` | push to `master`  | `martinmiglio.dev`         |
| `develop`    | push to `develop` | `develop.martinmiglio.dev` |
| `pr-<N>`     | open/sync PR      | `pr-<N>.martinmiglio.dev`  |

Workflows live in `.github/workflows/`. PR stages are torn down automatically on close.

## Local dev

```bash
bun install
bun run dev:mono
```

For agent/contributor context see [`AGENTS.md`](./AGENTS.md). For deploy internals and the one-time OIDC bootstrap see [`infra/AGENTS.md`](./infra/AGENTS.md).
