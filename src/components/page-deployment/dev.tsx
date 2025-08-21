import { Server } from 'miragejs';
import type {
  Deployment,
  GetDeploymentApiResponse,
} from '../../store/radix-api';
import { DeploymentOverview } from './deployment-overview';

const testData: Array<
  Parameters<typeof DeploymentOverview>[0] & { deployment: Deployment }
> = [
  {
    appName: 'my-app-1',
    deploymentName: 'qa-qkpww-kipvksuj',
    deployment: {
      name: 'qa-qkpww-kipvksuj',
      namespace: 'ns',
      repository: 'repo',
      createdByJob: 'radix-pipeline-20210617132936-qkpww',
      environment: 'qa',
      activeFrom: '2021-06-17T13:34:56.000Z',
      components: [
        {
          image: 'radixdev.azurecr.io/my-app-server:qkpww',
          name: 'server',
          type: 'component',
          status: 'Reconciling',
          ports: [{ name: 'http', port: 5005, isPublic: true }],
          replicaList: [
            {
              name: 'server-68f6cc7984-sw9zv',
              created: '2021-07-27T06:14:00.000Z',
              replicaStatus: { status: 'Pending' },
            },
            {
              name: 'server-7478cf786c-5qbsl',
              created: '2021-07-28T06:33:34.000Z',
              replicaStatus: { status: 'Pending' },
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
          type: 'component',
          status: 'Reconciling',
          ports: [{ name: 'http', port: 8000, isPublic: true }],
          replicaList: [
            {
              name: 'auth-proxy-79db7d5668-nsz8c',
              created: '2021-07-27T06:22:59.000Z',
              statusMessage:
                "couldn't find key OAUTH2_PROXY_CLIENT_SECRET in Secret my-app-qa/auth-proxy-gcufgtth",
              replicaStatus: { status: 'Failed' },
            },
            {
              name: 'auth-proxy-85f5f8474c-5n972',
              created: '2021-07-27T06:23:00.000Z',
              statusMessage:
                "couldn't find key OAUTH2_PROXY_CLIENT_SECRET in Secret my-app-qa/auth-proxy-gcufgtth",
              replicaStatus: { status: 'Failed' },
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
          type: 'component',
          status: 'Consistent',
          ports: [{ name: 'redis', port: 6379, isPublic: true }],
          replicaList: [
            {
              name: 'auth-state-6dbd7cfb4c-g7qsn',
              created: '2021-07-27T06:23:01.000Z',
              replicaStatus: { status: 'Running' },
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
          type: 'job',
          status: 'Consistent',
          ports: [{ name: 'http', port: 8000, isPublic: true }],
          schedulerPort: 8080,
          scheduledJobPayloadPath: '/compute/payload',
          replicaList: [
            {
              name: 'compute-6c6db9695-c8bqq',
              created: '2021-07-27T06:23:02.000Z',
              replicaStatus: { status: 'Running' },
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
  },
  {
    appName: 'my-app-2',
    deploymentName: 'prod-qkpww-kipvksuj',
    deployment: {
      name: 'prod-qkpww-kipvksuj',
      namespace: 'ns',
      repository: 'repo',
      createdByJob: 'radix-pipeline-20210617132936-qkpww',
      environment: 'qa',
      activeFrom: '2021-06-17T13:34:56.000Z',
      activeTo: '2021-06-18T13:34:56.000Z',
      components: [
        {
          image: 'radixdev.azurecr.io/my-app-server:qkpww',
          name: 'server',
          type: 'component',
          status: 'Reconciling',
          ports: [{ name: 'http', port: 5005, isPublic: true }],
          replicaList: [
            {
              name: 'server-68f6cc7984-sw9zv',
              created: '2021-07-27T06:14:00.000Z',
              replicaStatus: { status: 'Pending' },
            },
            {
              name: 'server-7478cf786c-5qbsl',
              created: '2021-07-28T06:33:34.000Z',
              replicaStatus: { status: 'Pending' },
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
          type: 'component',
          status: 'Reconciling',
          ports: [{ name: 'http', port: 8000, isPublic: true }],
          replicaList: [
            {
              name: 'auth-proxy-79db7d5668-nsz8c',
              created: '2021-07-27T06:22:59.000Z',
              statusMessage:
                "couldn't find key OAUTH2_PROXY_CLIENT_SECRET in Secret my-app-qa/auth-proxy-gcufgtth",
              replicaStatus: { status: 'Failed' },
            },
            {
              name: 'auth-proxy-85f5f8474c-5n972',
              created: '2021-07-27T06:23:00.000Z',
              statusMessage:
                "couldn't find key OAUTH2_PROXY_CLIENT_SECRET in Secret my-app-qa/auth-proxy-gcufgtth",
              replicaStatus: { status: 'Failed' },
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
          type: 'component',
          status: 'Consistent',
          ports: [{ name: 'redis', port: 6379, isPublic: true }],
          replicaList: [
            {
              name: 'auth-state-6dbd7cfb4c-g7qsn',
              created: '2021-07-27T06:23:01.000Z',
              replicaStatus: { status: 'Running' },
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
  },
});

export default (
  <div
    className="grid grid--gap-large"
    style={{
      backgroundColor: 'var(--eds_ui_background__default)',
      padding: 'var(--eds_spacing_large)',
    }}
  >
    {testData.map(({ appName, deploymentName }, i) => (
      <div
        key={i}
        style={{
          border: 'solid 2px gray',
          borderRadius: 'var(--eds_shape_corners_border_radius)',
          margin: '4px',
        }}
      >
        <div style={{ padding: '10px' }}>
          <DeploymentOverview {...{ appName, deploymentName }} />
        </div>
      </div>
    ))}
  </div>
);
