import {
  DeploymentOverview,
  DeploymentOverviewProps,
} from './deployment-overview';

import { ComponentStatus } from '../../models/component-status';
import { ComponentType } from '../../models/component-type';
import { ReplicaStatus } from '../../models/replica-status';

const noop = () => null;

const testData: Array<DeploymentOverviewProps> = [
  {
    appName: 'my-app-1',
    deploymentName: 'qa-qkpww-kipvksuj',
    deployment: {
      name: 'qa-qkpww-kipvksuj',
      namespace: 'ns',
      createdByJob: 'radix-pipeline-20210617132936-qkpww',
      environment: 'qa',
      activeFrom: new Date('2021-06-17T13:34:56.000Z'),
      components: [
        {
          image: 'radixdev.azurecr.io/my-app-server:qkpww',
          name: 'server',
          type: ComponentType.component,
          status: ComponentStatus.ComponentReconciling,
          ports: [{ name: 'http', port: 5005 }],
          replicaList: [
            {
              name: 'server-68f6cc7984-sw9zv',
              created: new Date('2021-07-27T06:14:00.000Z'),
              status: ReplicaStatus.Pending,
            },
            {
              name: 'server-7478cf786c-5qbsl',
              created: new Date('2021-07-28T06:33:34.000Z'),
              status: ReplicaStatus.Pending,
            },
          ],
          secrets: [
            'server-storage1-csiazurecreds-accountkey',
            'server-storage1-csiazurecreds-accountname',
          ],
          variables: {
            ASPNETCORE_URLS: 'http://*:5005',
            COMPUTE_IMAGE_PATH: '/app/computeimages',
            JOB_SCHEDULER: 'http://compute:8080',
            RADIX_APP: 'my-app-1',
            RADIX_CLUSTERNAME: 'weekly-30',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'server',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(5005)',
            RADIX_PORT_NAMES: '(http)',
          },
        },
        {
          image: 'quay.io/pusher/oauth2_proxy:v6.1.1',
          name: 'auth-proxy',
          type: ComponentType.component,
          status: ComponentStatus.ComponentReconciling,
          ports: [{ name: 'http', port: 8000 }],
          replicaList: [
            {
              name: 'auth-proxy-79db7d5668-nsz8c',
              created: new Date('2021-07-27T06:22:59.000Z'),
              statusMessage:
                "couldn't find key OAUTH2_PROXY_CLIENT_SECRET in Secret my-app-qa/auth-proxy-gcufgtth",
              status: ReplicaStatus.Failing,
            },
            {
              name: 'auth-proxy-85f5f8474c-5n972',
              created: new Date('2021-07-27T06:23:00.000Z'),
              statusMessage:
                "couldn't find key OAUTH2_PROXY_CLIENT_SECRET in Secret my-app-qa/auth-proxy-gcufgtth",
              status: ReplicaStatus.Failing,
            },
          ],
          secrets: [
            'OAUTH2_PROXY_CLIENT_ID',
            'OAUTH2_PROXY_CLIENT_SECRET',
            'OAUTH2_PROXY_COOKIE_SECRET',
            'OAUTH2_PROXY_REDIRECT_URL',
          ],
          variables: {
            OAUTH2_PROXY_COOKIE_REFRESH: '60m',
            OAUTH2_PROXY_EMAIL_DOMAINS: '*',
            OAUTH2_PROXY_HTTP_ADDRESS: 'http://:8000',
            OAUTH2_PROXY_OIDC_ISSUER_URL:
              'https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0/v2.0',
            OAUTH2_PROXY_PASS_ACCESS_TOKEN: 'true',
            OAUTH2_PROXY_PASS_USER_HEADERS: 'false',
            OAUTH2_PROXY_PROVIDER: 'oidc',
            OAUTH2_PROXY_REDIS_CONNECTION_URL: 'redis://auth-state:6379',
            OAUTH2_PROXY_SESSION_STORE_TYPE: 'redis',
            OAUTH2_PROXY_SKIP_PROVIDER_BUTTON: 'true',
            OAUTH2_PROXY_UPSTREAMS: 'http://server:5005',
            RADIX_APP: 'my-app-1',
            RADIX_CANONICAL_DOMAIN_NAME:
              'auth-proxy-my-app-qa.weekly-30.dev.radix.equinor.com',
            RADIX_CLUSTERNAME: 'weekly-30',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'auth-proxy',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(8000)',
            RADIX_PORT_NAMES: '(http)',
            RADIX_PUBLIC_DOMAIN_NAME:
              'auth-proxy-my-app-qa.dev.radix.equinor.com',
          },
        },
        {
          image: 'bitnami/redis:latest',
          name: 'auth-state',
          type: ComponentType.component,
          status: ComponentStatus.ConsistentComponent,
          ports: [{ name: 'redis', port: 6379 }],
          replicaList: [
            {
              name: 'auth-state-6dbd7cfb4c-g7qsn',
              created: new Date('2021-07-27T06:23:01.000Z'),
              status: ReplicaStatus.Running,
            },
          ],
          secrets: [],
          variables: {
            ALLOW_EMPTY_PASSWORD: 'yes',
            RADIX_APP: 'my-app-1',
            RADIX_CLUSTERNAME: 'weekly-30',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'auth-state',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(6379)',
            RADIX_PORT_NAMES: '(redis)',
          },
        },
        {
          image: 'radixdev.azurecr.io/my-app-compute:qkpww',
          name: 'compute',
          type: ComponentType.job,
          status: ComponentStatus.ConsistentComponent,
          ports: [{ name: 'http', port: 8000 }],
          schedulerPort: 8080,
          scheduledJobPayloadPath: '/compute/payload',
          replicaList: [
            {
              name: 'compute-6c6db9695-c8bqq',
              created: new Date('2021-07-27T06:23:02.000Z'),
              status: ReplicaStatus.Running,
            },
          ],
          secrets: [],
          variables: {
            CALLBACK_ON_COMPLETE_URL: 'http://server:5005',
            COMPUTE_CONFIG: '/compute/payload/payload',
            PORT: '8000',
            RADIX_APP: 'my-app-1',
            RADIX_CLUSTERNAME: 'weekly-30',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'compute',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DEPLOYMENT: 'qa-qkpww-kipvksuj',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(8080)',
            RADIX_PORT_NAMES: '(scheduler-port)',
          },
        },
      ],
    },
    subscribe: noop,
    unsubscribe: noop,
  },

  {
    appName: 'my-app-2',
    deploymentName: 'qa-qkpww-kipvksuj',
    deployment: {
      name: 'qa-qkpww-kipvksuj',
      namespace: 'ns',
      createdByJob: 'radix-pipeline-20210617132936-qkpww',
      environment: 'qa',
      activeFrom: new Date('2021-06-17T13:34:56.000Z'),
      activeTo: new Date('2021-06-18T13:34:56.000Z'),
      components: [
        {
          image: 'radixdev.azurecr.io/my-app-server:qkpww',
          name: 'server',
          type: ComponentType.component,
          status: ComponentStatus.ComponentReconciling,
          ports: [{ name: 'http', port: 5005 }],
          replicaList: [
            {
              name: 'server-68f6cc7984-sw9zv',
              created: new Date('2021-07-27T06:14:00.000Z'),
              status: ReplicaStatus.Pending,
            },
            {
              name: 'server-7478cf786c-5qbsl',
              created: new Date('2021-07-28T06:33:34.000Z'),
              status: ReplicaStatus.Pending,
            },
          ],
          secrets: [
            'server-storage1-csiazurecreds-accountkey',
            'server-storage1-csiazurecreds-accountname',
          ],
          variables: {
            ASPNETCORE_URLS: 'http://*:5005',
            COMPUTE_IMAGE_PATH: '/app/computeimages',
            JOB_SCHEDULER: 'http://compute:8080',
            RADIX_APP: 'my-app-2',
            RADIX_CLUSTERNAME: 'weekly-30',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'server',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(5005)',
            RADIX_PORT_NAMES: '(http)',
          },
        },
        {
          image: 'quay.io/pusher/oauth2_proxy:v6.1.1',
          name: 'auth-proxy',
          type: ComponentType.component,
          status: ComponentStatus.ComponentReconciling,
          ports: [{ name: 'http', port: 8000 }],
          replicaList: [
            {
              name: 'auth-proxy-79db7d5668-nsz8c',
              created: new Date('2021-07-27T06:22:59.000Z'),
              statusMessage:
                "couldn't find key OAUTH2_PROXY_CLIENT_SECRET in Secret my-app-qa/auth-proxy-gcufgtth",
              status: ReplicaStatus.Failing,
            },
            {
              name: 'auth-proxy-85f5f8474c-5n972',
              created: new Date('2021-07-27T06:23:00.000Z'),
              statusMessage:
                "couldn't find key OAUTH2_PROXY_CLIENT_SECRET in Secret my-app-qa/auth-proxy-gcufgtth",
              status: ReplicaStatus.Failing,
            },
          ],
          secrets: [
            'OAUTH2_PROXY_CLIENT_ID',
            'OAUTH2_PROXY_CLIENT_SECRET',
            'OAUTH2_PROXY_COOKIE_SECRET',
            'OAUTH2_PROXY_REDIRECT_URL',
          ],
          variables: {
            OAUTH2_PROXY_COOKIE_REFRESH: '60m',
            OAUTH2_PROXY_EMAIL_DOMAINS: '*',
            OAUTH2_PROXY_HTTP_ADDRESS: 'http://:8000',
            OAUTH2_PROXY_OIDC_ISSUER_URL:
              'https://login.microsoftonline.com/3aa4a235-b6e2-48d5-9195-7fcf05b459b0/v2.0',
            OAUTH2_PROXY_PASS_ACCESS_TOKEN: 'true',
            OAUTH2_PROXY_PASS_USER_HEADERS: 'false',
            OAUTH2_PROXY_PROVIDER: 'oidc',
            OAUTH2_PROXY_REDIS_CONNECTION_URL: 'redis://auth-state:6379',
            OAUTH2_PROXY_SESSION_STORE_TYPE: 'redis',
            OAUTH2_PROXY_SKIP_PROVIDER_BUTTON: 'true',
            OAUTH2_PROXY_UPSTREAMS: 'http://server:5005',
            RADIX_APP: 'my-app-2',
            RADIX_CANONICAL_DOMAIN_NAME:
              'auth-proxy-my-app-qa.weekly-30.dev.radix.equinor.com',
            RADIX_CLUSTERNAME: 'weekly-30',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'auth-proxy',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(8000)',
            RADIX_PORT_NAMES: '(http)',
            RADIX_PUBLIC_DOMAIN_NAME:
              'auth-proxy-my-app-qa.dev.radix.equinor.com',
          },
        },
        {
          image: 'bitnami/redis:latest',
          name: 'auth-state',
          type: ComponentType.component,
          status: ComponentStatus.ConsistentComponent,
          ports: [{ name: 'redis', port: 6379 }],
          replicaList: [
            {
              name: 'auth-state-6dbd7cfb4c-g7qsn',
              created: new Date('2021-07-27T06:23:01.000Z'),
              status: ReplicaStatus.Running,
            },
          ],
          secrets: [],
          variables: {
            ALLOW_EMPTY_PASSWORD: 'yes',
            RADIX_APP: 'my-app-2',
            RADIX_CLUSTERNAME: 'weekly-30',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'auth-state',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(6379)',
            RADIX_PORT_NAMES: '(redis)',
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
    className="grid grid--gap-large"
    style={{
      backgroundColor: 'var(--eds_ui_background__default)',
      padding: 'var(--eds_spacing_large)',
    }}
  >
    {testData.map((data, i) => (
      <div
        key={i}
        style={{
          border: 'solid 2px gray',
          borderRadius: 'var(--eds_shape_corners_border_radius)',
          margin: '4px',
        }}
      >
        <div style={{ padding: '10px' }}>
          <DeploymentOverview {...data} />
        </div>
      </div>
    ))}
  </div>
);
