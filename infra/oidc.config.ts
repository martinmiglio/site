/// <reference path="../.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    if (input?.stage && input.stage !== 'production') {
      throw new Error('martin-site-oidc only supports the production stage')
    }
    return {
      name: 'martin-site-oidc',
      removal: 'retain',
      protect: true,
      home: 'aws',
      providers: {
        aws: process.env.CI ? { region: 'us-east-1' } : { profile: 'martinm', region: 'us-east-1' }
      }
    }
  },
  async run() {
    const { accountId } = await aws.getCallerIdentity()
    const expectedArn = `arn:aws:iam::${accountId}:oidc-provider/token.actions.githubusercontent.com`

    let oidcProviderArn: string | $util.Output<string>
    try {
      const existing = await aws.iam.getOpenIdConnectProvider({ arn: expectedArn })
      oidcProviderArn = existing.arn
    } catch {
      const provider = new aws.iam.OpenIdConnectProvider('GithubOidc', {
        url: 'https://token.actions.githubusercontent.com',
        clientIdLists: ['sts.amazonaws.com'],
        thumbprintLists: ['1111111111deadbeefcafe00bad1deaface0ff1ce']
      })
      oidcProviderArn = provider.arn
    }

    const deployRole = new aws.iam.Role('GithubActionsDeployRole', {
      name: 'github-actions-sst-deploy-site',
      assumeRolePolicy: $jsonStringify({
        Version: '2012-10-17',
        Statement: [
          {
            Effect: 'Allow',
            Principal: { Federated: oidcProviderArn },
            Action: 'sts:AssumeRoleWithWebIdentity',
            Condition: {
              StringEquals: {
                'token.actions.githubusercontent.com:aud': 'sts.amazonaws.com',
                'token.actions.githubusercontent.com:sub': 'repo:martinmiglio/site:pull_request'
              }
            }
          }
        ]
      })
    })

    new aws.iam.RolePolicyAttachment('GithubActionsDeployPolicy', {
      role: deployRole.name,
      policyArn: 'arn:aws:iam::aws:policy/AdministratorAccess'
    })

    return {
      deployRoleArn: deployRole.arn
    }
  }
})
