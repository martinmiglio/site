# infra/AGENTS.md

Two SST apps live in this repo:

- `sst.config.ts` — the site (`martin-site`). CI deploys this.
- `infra/oidc.config.ts` — one-time bootstrap (`martin-site-oidc`) that provisions the GitHub OIDC provider and deploy role. Production-only by design.

Stage→domain mapping, runtime, DNS zone, and the trust-policy `sub` list all live in those files. Read them — don't trust a restatement here.

## Invariants

- **Never deploy `production` or `develop` from a laptop.** CI owns them. Local `sst deploy` is for throwaway stages only.
- **`oidc.config.ts` rejects non-`production` stages** by design — keeps bootstrap resources in one place.
- **`AdministratorAccess` on the deploy role is intentional** for a personal site. Revisit if this ever gets collaborators or real user data.

## One-time OIDC bootstrap

Only needed per AWS account or when rotating the trust policy:

```bash
bun sst deploy --config infra/oidc.config.ts --stage production
```

Copy the printed `deployRoleArn` into the `AWS_ROLE_ARN` GitHub secret. The config is idempotent — re-running adopts the existing provider and updates the trust policy.

## Local dev auth

`sst dev` uses the `martinm` AWS profile locally; CI uses OIDC (no profile). Set in `sst.config.ts`'s `providers.aws`.
