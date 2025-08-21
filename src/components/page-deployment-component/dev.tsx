import { Server } from 'miragejs';
import type {
  ChangeEnvVarApiResponse,
  Deployment,
  EnvVarsApiResponse,
  GetDeploymentApiResponse,
} from '../../store/radix-api';
import { DeploymentComponentOverview } from './deployment-component-overview';

const testData: Array<
  Parameters<typeof DeploymentComponentOverview>[0] & {
    deployment: Deployment;
  }
> = [
  {
    appName: 'myapp',
    deploymentName: 'prod-gyslp-0raq4x2c',
    componentName: 'www',
    deployment: {
      name: 'prod-gyslp-0raq4x2c',
      environment: 'prod',
      namespace: 'ns',
      repository: 'repo',
      createdByJob: 'radix-pipeline-20210708125435-gyslp',
      activeFrom: '2021-07-08T13:01:56.000Z',
      components: [
        {
          image: 'radixdev.azurecr.io/radix-cost-allocation-api-server:gyslp',
          name: 'www',
          type: 'component',
          status: 'Consistent',
          ports: [
            { name: 'http', port: 3003, isPublic: true },
            { name: 'metrics', port: 9000, isPublic: false },
          ],
          replicaList: [
            {
              name: 'server-6ff44564cb-f45q9',
              created: '2021-07-22T06:29:12.000Z',
              replicaStatus: { status: 'Running' },
            },
          ],
          secrets: [
            'SQL_SERVER',
            'SQL_DATABASE',
            'SQL_USER',
            'SQL_PASSWORD',
            'SUBSCRIPTION_COST_VALUE',
            'SUBSCRIPTION_COST_CURRENCY',
            'WHITELIST',
            'AD_REPORT_READERS',
            'TOKEN_ISSUER',
          ],
          variables: {
            LOG_LEVEL: 'INFO',
            PIPELINE_IMG_TAG: 'release-latest',
            RADIX_APP: 'radix-cost-allocation-api',
            RADIX_CANONICAL_DOMAIN_NAME:
              'server-radix-cost-allocation-api-prod.weekly-26.dev.radix.equinor.com',
            RADIX_CLUSTERNAME: 'weekly-26',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'server',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'prod',
            RADIX_GIT_COMMIT_HASH: '77c9312da69845b983c24925a0a691c724293720',
            RADIX_PORTS: '(3003)',
            RADIX_PORT_NAMES: '(http)',
            RADIX_PUBLIC_DOMAIN_NAME:
              'server-radix-cost-allocation-api-prod.dev.radix.equinor.com',
          },
        },
      ],
    },
  },
  {
    appName: 'myapp',
    deploymentName: 'prod-gyslp-0raq4x2d',
    componentName: 'www',
    deployment: {
      name: 'prod-gyslp-0raq4x2c',
      environment: 'prod',
      namespace: 'ns',
      repository: 'repo',
      createdByJob: 'radix-pipeline-20210708125435-gyslp',
      activeFrom: '2021-07-08T13:01:56.000Z',
      components: [
        {
          image: 'radixdev.azurecr.io/radix-cost-allocation-api-server:gyslp',
          name: 'www',
          type: 'component',
          status: 'Stopped',
          ports: [{ name: 'http', port: 3003, isPublic: true }],
          network: {
            ingress: {
              public: {
                allow: ['100.1.1.1', '200.1.1.1/32'],
              },
            },
          },
          replicaList: [
            {
              name: 'server-6ff44564cb-f45q9',
              created: '2021-07-22T06:29:12.000Z',
              replicaStatus: { status: 'Running' },
            },
          ],
          secrets: [
            'SQL_SERVER',
            'SQL_DATABASE',
            'SQL_USER',
            'SQL_PASSWORD',
            'SUBSCRIPTION_COST_VALUE',
            'SUBSCRIPTION_COST_CURRENCY',
            'WHITELIST',
            'AD_REPORT_READERS',
            'TOKEN_ISSUER',
          ],
          variables: {
            LOG_LEVEL: 'INFO',
            PIPELINE_IMG_TAG: 'release-latest',
            RADIX_APP: 'radix-cost-allocation-api',
            RADIX_CANONICAL_DOMAIN_NAME:
              'server-radix-cost-allocation-api-prod.weekly-26.dev.radix.equinor.com',
            RADIX_CLUSTERNAME: 'weekly-26',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'server',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'prod',
            RADIX_GIT_COMMIT_HASH: '77c9312da69845b983c24925a0a691c724293720',
            RADIX_PORTS: '(3003)',
            RADIX_PORT_NAMES: '(http)',
            RADIX_PUBLIC_DOMAIN_NAME:
              'server-radix-cost-allocation-api-prod.dev.radix.equinor.com',
          },
        },
      ],
    },
  },
];

// Mock API response
new Server({
  routes() {
    // Mock response for GetDeployment
    testData.forEach(({ deploymentName, deployment }) => {
      this.get<GetDeploymentApiResponse>(
        `/api/v1/applications/:appName/deployments/${deploymentName}`,
        () => deployment
      );
    });

    // Mock response for EnvVars
    this.get<EnvVarsApiResponse>(
      '/api/v1/applications/:appName/environments/:envName/components/:componentName/envvars',
      () => []
    );

    // Mock response for ChangeEnvVar
    // @ts-expect-error no idea what this should be
    this.patch<ChangeEnvVarApiResponse>(
      '/api/v1/applications/:appName/environments/:envName/components/:componentName/envvars',
      () => void 0
    );
  },
});

export default (
  <div
    style={{
      backgroundColor: 'var(--eds_ui_background__default)',
      padding: 'var(--eds_spacing_large)',
    }}
  >
    <div className="grid grid--gap-large" style={{ margin: '0 auto' }}>
      {testData.map(({ appName, componentName, deploymentName }, i) => (
        <DeploymentComponentOverview
          key={i}
          {...{ appName, componentName, deploymentName }}
        />
      ))}
    </div>
  </div>
);
