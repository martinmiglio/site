# infra/AGENTS.md

Two SST apps live in this repo:

- `sst.config.ts` — the site. CI deploys this.
- `infra/oidc.config.ts` — one-time bootstrap for the GitHub OIDC provider and deploy role.

Stage→domain mapping, runtime, DNS zone, trust-policy `sub` list, and SST app names all live in those files. Read them — don't trust a restatement here.

## Invariants

- **CI owns `production` and `develop` deploys.** Local `sst deploy` to them works for recovery or one-offs; routine deploys should go through a PR.
- **`oidc.config.ts` rejects non-`production` stages** by design — keeps bootstrap resources in one place.
- **The deploy role's broad IAM scope is intentional** for a personal site. Don't scope it down unprompted — revisit if this ever gets collaborators or real user data.

## One-time OIDC bootstrap

Only needed per AWS account or when rotating the trust policy:

```bash
bun sst deploy --config infra/oidc.config.ts --stage production
```

Copy the printed `deployRoleArn` into the `AWS_ROLE_ARN` GitHub secret. The config is idempotent — re-running adopts the existing provider and updates the trust policy.

## Local dev auth

Local `sst` uses a named AWS profile; CI uses OIDC (no profile). Both paths are set in `sst.config.ts`'s `providers.aws`.
