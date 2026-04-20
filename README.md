# My website

## Deployments

Three stages, two mechanisms:

| Stage        | Trigger           | Domain                     | Owner                                                   |
| ------------ | ----------------- | -------------------------- | ------------------------------------------------------- |
| `production` | push to `master`  | `martinmiglio.dev`         | SST Console autodeploy                                  |
| `develop`    | push to `develop` | `develop.martinmiglio.dev` | SST Console autodeploy                                  |
| `pr-<N>`     | open/sync PR      | `pr-<N>.martinmiglio.dev`  | GitHub Actions (`.github/workflows/deploy-preview.yml`) |

PR previews are torn down automatically when the PR closes (`destroy-preview.yml` runs `sst remove --stage pr-<N>`).

### One-time bootstrap (per AWS account)

The PR preview workflow uses GitHub OIDC to assume a deploy role in AWS. Provision it with:

```bash
bun sst deploy --config infra/oidc.config.ts --stage production
```

This creates (or reuses) the GitHub OIDC provider and a `github-actions-sst-deploy` role scoped to `repo:martinmiglio/site:*` with `AdministratorAccess`. Copy the printed `deployRoleArn` into the repo secret `AWS_ROLE_ARN` (Settings → Secrets and variables → Actions).

The config is idempotent — re-running adopts the existing OIDC provider.
