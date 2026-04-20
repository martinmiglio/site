# martinmiglio.dev

My personal site. Live at [martinmiglio.dev](https://martinmiglio.dev).

React 19 + TanStack Start, deployed to AWS via SST.

## Deployments

All deploys run in GitHub Actions via OIDC.

| Stage        | Trigger           | Domain                     | Workflow                               |
| ------------ | ----------------- | -------------------------- | -------------------------------------- |
| `production` | push to `master`  | `martinmiglio.dev`         | `.github/workflows/deploy.yml`         |
| `develop`    | push to `develop` | `develop.martinmiglio.dev` | `.github/workflows/deploy.yml`         |
| `pr-<N>`     | open/sync PR      | `pr-<N>.martinmiglio.dev`  | `.github/workflows/deploy-preview.yml` |

PR previews are torn down when the PR closes (`destroy-preview.yml`).

## Local dev

```bash
bun install
bun run dev:mono
```

See [`AGENTS.md`](./AGENTS.md) for the full dev loop and conventions, or [`infra/AGENTS.md`](./infra/AGENTS.md) for deploy internals and the one-time OIDC bootstrap.
