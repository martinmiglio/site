# infra/AGENTS.md

Deploy internals for this site. Two SST apps live in this repo:

- **`sst.config.ts`** (root) — the site itself. App name `martin-site`. This is what CI deploys.
- **`infra/oidc.config.ts`** — one-time-per-account bootstrap that provisions the GitHub OIDC provider and the deploy role. App name `martin-site-oidc`. Only deployable to the `production` stage (enforced in the config).

## Stage → domain

Logic lives in `sst.config.ts`:

- `production` → `martinmiglio.dev` (+ `www.` alias)
- any other stage (`develop`, `pr-42`, …) → `<stage>.martinmiglio.dev`

All DNS points at the hosted zone `Z00930942RK5CDM0O5SAH` (martinmiglio.dev). The zone ID is hardcoded — if the zone ever changes, update it here.

Production-only tweaks:

- `removal: 'retain'` and `protect: true` — guard against accidental teardown
- `warm: 1` on the TanStackStart app — one warm Lambda to cut cold starts

Runtime is `nodejs22.x` on `arm64` for every stage.

## Deploy flow

Deploys only run in GitHub Actions. The workflows assume the `github-actions-sst-deploy-site` IAM role via OIDC (`AWS_ROLE_ARN` repo secret).

| Workflow              | Trigger                | What it does                                         |
| --------------------- | ---------------------- | ---------------------------------------------------- |
| `deploy.yml`          | push to master/develop | `sst deploy --stage production` or `--stage develop` |
| `deploy-preview.yml`  | PR open/sync           | `sst deploy --stage pr-<N>`                          |
| `destroy-preview.yml` | PR closed              | `sst remove --stage pr-<N>`                          |
| `check.yml`           | PR                     | format + lint + typecheck                            |

Locally, `sst dev --mode mono` (via `bun run dev:mono`) uses the `martinm` AWS profile. CI uses OIDC credentials (no profile).

## One-time OIDC bootstrap

Only needed once per AWS account (or when rotating the trust policy):

```bash
bun sst deploy --config infra/oidc.config.ts --stage production
```

This:

1. Adopts or creates the GitHub OIDC provider (`token.actions.githubusercontent.com`).
2. Creates the `github-actions-sst-deploy-site` IAM role with `AdministratorAccess`.
3. Restricts the trust policy to three `sub` values:
   - `repo:martinmiglio/site:pull_request`
   - `repo:martinmiglio/site:ref:refs/heads/master`
   - `repo:martinmiglio/site:ref:refs/heads/develop`

Copy the printed `deployRoleArn` into the `AWS_ROLE_ARN` GitHub secret (Settings → Secrets and variables → Actions).

The config is idempotent — re-running adopts the existing provider and updates the trust policy.

## Gotchas

- **Never deploy `production` or `develop` from a laptop.** CI owns those stages. `sst deploy` locally should only target throwaway stages.
- **The oidc app refuses any stage other than `production`** — by design, to keep the bootstrap resources in one place.
- **`AdministratorAccess` on the deploy role is intentional** for a personal site — SST needs broad perms and scoping them down isn't worth the maintenance here. Revisit if this ever gets collaborators or handles real user data.
