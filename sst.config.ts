/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "martin-site",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
      providers: {
        aws: {
          profile: "martinm",
          region: "us-east-1",
        },
      },
    };
  },
  async run() {
    const stage = $app.stage;
    const isProduction = stage === "production";

    const baseDomain = isProduction
      ? "martinmiglio.dev"
      : `${stage}.martinmiglio.dev`;

    const dns = sst.aws.dns({
      zone: "Z00930942RK5CDM0O5SAH", // martinmiglio.dev
    });

    const router = new sst.aws.Router("ApiRouter", {
      domain: {
        name: baseDomain,
        aliases: isProduction ? [`www.${baseDomain}`] : undefined,
        dns,
      },
    });

    new sst.aws.TanStackStart("MartinSite", {
      warm: 1,
      server: {
        architecture: "arm64",
        runtime: "nodejs22.x",
      },
      router: {
        instance: router,
      },
    });
  },
  console: {
    autodeploy: {
      target(event) {
        if (event.type === "branch" && event.action === "pushed") {
          if (event.branch === "develop") {
            return { stage: "develop" };
          }

          if (event.branch === "master") {
            return { stage: "production" };
          }
        }
      },
    },
  },
});
