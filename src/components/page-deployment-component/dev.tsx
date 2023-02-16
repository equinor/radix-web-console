import {
  DeploymentComponentOverview,
  DeploymentComponentOverviewProps,
} from './deployment-component-overview';

import { ComponentStatus } from '../../models/component-status';
import { ComponentType } from '../../models/component-type';
import { ReplicaStatus } from '../../models/replica-status';

const noop = () => null;

const testData: Array<DeploymentComponentOverviewProps> = [
  {
    appName: 'Consistent',
    deploymentName: 'prod-gyslp-0raq4x2c',
    componentName: 'www',
    deployment: {
      name: 'prod-gyslp-0raq4x2c',
      namespace: 'ns',
      environment: 'prod',
      createdByJob: 'radix-pipeline-20210708125435-gyslp',
      activeFrom: new Date('2021-07-08T13:01:56.000Z'),
      components: [
        {
          image: 'radixdev.azurecr.io/radix-cost-allocation-api-server:gyslp',
          name: 'www',
          type: ComponentType.component,
          status: ComponentStatus.ConsistentComponent,
          ports: [{ name: 'http', port: 3003 }],
          replicaList: [
            {
              name: 'server-6ff44564cb-f45q9',
              created: new Date('2021-07-22T06:29:12.000Z'),
              status: ReplicaStatus.Running,
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
    subscribe: noop,
    unsubscribe: noop,
  },
  {
    appName: 'Stopped',
    deploymentName: 'prod-gyslp-0raq4x2c',
    componentName: 'www',
    deployment: {
      name: 'prod-gyslp-0raq4x2c',
      namespace: 'ns',
      environment: 'prod',
      createdByJob: 'radix-pipeline-20210708125435-gyslp',
      activeFrom: new Date('2021-07-08T13:01:56.000Z'),
      components: [
        {
          image: 'radixdev.azurecr.io/radix-cost-allocation-api-server:gyslp',
          name: 'www',
          type: ComponentType.component,
          status: ComponentStatus.StoppedComponent,
          ports: [{ name: 'http', port: 3003 }],
          replicaList: [
            {
              name: 'server-6ff44564cb-f45q9',
              created: new Date('2021-07-22T06:29:12.000Z'),
              status: ReplicaStatus.Running,
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
    subscribe: noop,
    unsubscribe: noop,
  },
];

export default (
  <div
    style={{
      backgroundColor: 'var(--eds_ui_background__default)',
      padding: 'var(--eds_spacing_large)',
    }}
  >
    <div className="grid grid--gap-large" style={{ margin: '0 auto' }}>
      {testData.map((p, i) => (
        <DeploymentComponentOverview key={i} {...p} />
      ))}
    </div>
  </div>
);
