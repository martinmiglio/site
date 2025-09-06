/// <reference path="./.sst/platform/config.d.ts" />


const defaultConfig = {
  name: "martin-site",
  tanstackStartName: "MartinSite",
  protect: false,
  removal: "remove" as "remove" | "retain" | "retain-all" | undefined,
  home: "aws" as const,
  awsProfile: "martinm",
  domain: `${$app.stage}.martinmiglio.dev`,
  dns_zone: "Z00930942RK5CDM0O5SAH",
}

const stageConfig: Record<string, Partial<typeof defaultConfig>> = {
  production: {
    removal: "retain",
    protect: true,
    domain: "martinmiglio.dev",
  }
}

const config = {
  ...defaultConfig,
  ...stageConfig[$app.stage],
}

export default $config({
  app(_input) {
    return {
      name: config.name,
      removal: config.removal,
      protect: config.protect,
      home: config.home,
      providers: {
        aws: {
          profile: config.awsProfile,
        },
      },
    };
  },
  async run() {
    new sst.aws.TanStackStart(config.tanstackStartName, {
      domain: {
        name: config.domain,
        dns: sst.aws.dns({
          zone: config.dns_zone,
        })
      },
    });
  },
});
