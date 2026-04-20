# My website

## Deployments

All deploys run in GitHub Actions via OIDC. No SST Console autodeploy.

| Stage        | Trigger           | Domain                     | Workflow                               |
| ------------ | ----------------- | -------------------------- | -------------------------------------- |
| `production` | push to `master`  | `martinmiglio.dev`         | `.github/workflows/deploy.yml`         |
| `develop`    | push to `develop` | `develop.martinmiglio.dev` | `.github/workflows/deploy.yml`         |
| `pr-<N>`     | open/sync PR      | `pr-<N>.martinmiglio.dev`  | `.github/workflows/deploy-preview.yml` |

PR previews are torn down automatically when the PR closes (`destroy-preview.yml` runs `sst remove --stage pr-<N>`).

### One-time bootstrap (per AWS account)

The deploy workflows use GitHub OIDC to assume a role in AWS. Provision it with:

```bash
bun sst deploy --config infra/oidc.config.ts --stage production
```

This creates (or reuses) the GitHub OIDC provider and a `github-actions-sst-deploy-site` role. The trust policy accepts tokens from three `sub` values only:

- `repo:martinmiglio/site:pull_request`
- `repo:martinmiglio/site:ref:refs/heads/master`
- `repo:martinmiglio/site:ref:refs/heads/develop`

Copy the printed `deployRoleArn` into the repo secret `AWS_ROLE_ARN` (Settings → Secrets and variables → Actions).

The config is idempotent — re-running adopts the existing OIDC provider and updates the trust policy.
