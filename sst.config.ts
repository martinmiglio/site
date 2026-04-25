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
      },
      transform: {
        // Forward `Accept` to the origin and key the cache on it so the
        // markdown content-negotiation middleware in src/start.ts sees the
        // header and CloudFront doesn't conflate HTML and markdown variants.
        cachePolicy: {
          parametersInCacheKeyAndForwardedToOrigin: {
            cookiesConfig: { cookieBehavior: 'none' },
            queryStringsConfig: { queryStringBehavior: 'all' },
            enableAcceptEncodingBrotli: true,
            enableAcceptEncodingGzip: true,
            headersConfig: {
              headerBehavior: 'whitelist',
              headers: { items: ['x-open-next-cache-key', 'x-forwarded-host', 'accept'] }
            }
          }
        }
      }
    })

    const app = new sst.aws.TanStackStart('MartinSite', {
      warm: isProduction ? 1 : undefined,
      server: {
        architecture: 'arm64',
        runtime: 'nodejs22.x'
      },
      // Purge stale assets so files removed from the build (e.g. the
      // prerendered /index.html shell, now disabled in vite.config.ts) are
      // dropped from the bucket and KV. Without this, `/` keeps being served
      // from a stale shell and bypasses the markdown content-negotiation
      // middleware.
      assets: {
        purge: true
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
