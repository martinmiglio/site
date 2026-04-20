/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: 'martin-site',
      removal: input?.stage === 'production' ? 'retain' : 'remove',
      protect: ['production'].includes(input?.stage),
      home: 'aws',
      providers: {
        aws: process.env.CI ? { region: 'us-east-1' } : { profile: 'martinm', region: 'us-east-1' }
      }
    }
  },
  async run() {
    const stage = $app.stage
    const isProduction = stage === 'production'

    const baseDomain = isProduction ? 'martinmiglio.dev' : `${stage}.martinmiglio.dev`

    const dns = sst.aws.dns({
      zone: 'Z00930942RK5CDM0O5SAH' // martinmiglio.dev
    })

    const router = new sst.aws.Router('ApiRouter', {
      domain: {
        name: baseDomain,
        aliases: isProduction ? [`www.${baseDomain}`] : undefined,
        dns
      }
    })

    const app = new sst.aws.TanStackStart('MartinSite', {
      warm: isProduction ? 1 : undefined,
      server: {
        architecture: 'arm64',
        runtime: 'nodejs22.x'
      },
      router: {
        instance: router
      }
    })

    return {
      url: `https://${baseDomain}`,
      appUrl: app.url
    }
  }
})
