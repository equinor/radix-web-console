import { Server } from 'miragejs';
import type {
  ChangeEnvVarApiResponse,
  Deployment,
  EnvVarsApiResponse,
  GetDeploymentApiResponse,
} from '../../store/radix-api';
import { DeploymentJobComponentOverview } from './deployment-job-component-overview';

const testData: Array<
  Parameters<typeof DeploymentJobComponentOverview>[0] & {
    deployment: Deployment;
  }
> = [
  {
    appName: 'radix-job-demo',
    jobComponentName: 'compute',
    deploymentName: 'qa-2svag-1ejuatkj',
    deployment: {
      name: 'qa-2svag-1ejuatkj',
      environment: 'qa',
      namespace: 'ns',
      repository: 'repo',
      components: [
        {
          image: 'radixdev.azurecr.io/radix-job-demo-api:2svag',
          name: 'api',
          type: 'component',
          status: 'Consistent',
          ports: [{ name: 'http', port: 5005, isPublic: true }],
          replicaList: [
            {
              name: 'api-587b8877c-9xr4x',
              created: '2021-07-22T13:50:35.000Z',
              restartCount: 0,
              statusMessage: '',
              replicaStatus: { status: 'Running' },
            },
          ],
          secrets: [],
          variables: {
            ASPNETCORE_URLS: 'http://*:5005',
            RADIX_APP: 'radix-job-demo',
            RADIX_CANONICAL_DOMAIN_NAME:
              'api-radix-job-demo-qa.weekly-26.dev.radix.equinor.com',
            RADIX_CLUSTERNAME: 'weekly-26',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'api',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(5005)',
            RADIX_PORT_NAMES: '(http)',
            RADIX_PUBLIC_DOMAIN_NAME:
              'api-radix-job-demo-qa.dev.radix.equinor.com',
          },
        },
        {
          image: 'quay.io/oauth2-proxy/oauth2-proxy:v7.1.1',
          name: 'auth-proxy',
          type: 'component',
          status: 'Consistent',
          ports: [{ name: 'http', port: 8000, isPublic: true }],
          replicaList: [
            {
              name: 'auth-proxy-86bb8c47c-wwhx8',
              created: '2021-07-22T06:39:24.000Z',
              restartCount: 0,
              statusMessage: '',
              replicaStatus: { status: 'Running' },
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
            OAUTH2_PROXY_PASS_AUTHORIZATION_HEADER: 'true',
            OAUTH2_PROXY_PASS_BASIC_AUTH: 'false',
            OAUTH2_PROXY_PASS_USER_HEADERS: 'false',
            OAUTH2_PROXY_PROVIDER: 'oidc',
            OAUTH2_PROXY_REDIS_CONNECTION_URL: 'redis://auth-state:6379',
            OAUTH2_PROXY_SCOPE:
              'openid email https://graph.microsoft.com/user.read',
            OAUTH2_PROXY_SESSION_STORE_TYPE: 'redis',
            OAUTH2_PROXY_SKIP_PROVIDER_BUTTON: 'true',
            OAUTH2_PROXY_UPSTREAMS: 'http://server:5005',
            RADIX_APP: 'radix-job-demo',
            RADIX_CANONICAL_DOMAIN_NAME:
              'auth-proxy-radix-job-demo-qa.weekly-26.dev.radix.equinor.com',
            RADIX_CLUSTERNAME: 'weekly-26',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'auth-proxy',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(8000)',
            RADIX_PORT_NAMES: '(http)',
            RADIX_PUBLIC_DOMAIN_NAME:
              'auth-proxy-radix-job-demo-qa.dev.radix.equinor.com',
          },
        },
        {
          image: 'radixdev.azurecr.io/radix-job-demo-auth-state:2svag',
          name: 'auth-state',
          type: 'component',
          status: 'Consistent',
          ports: [{ name: 'redis', port: 6379, isPublic: true }],
          replicaList: [
            {
              name: 'auth-state-74f5b9488b-pwm2c',
              created: '2021-07-22T13:50:36.000Z',
              restartCount: 0,
              statusMessage: '',
              replicaStatus: { status: 'Running' },
            },
          ],
          secrets: [],
          variables: {
            ALLOW_EMPTY_PASSWORD: 'yes',
            RADIX_APP: 'radix-job-demo',
            RADIX_CLUSTERNAME: 'weekly-26',
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
          image: 'radixdev.azurecr.io/radix-job-demo-multi-component:2svag',
          name: 'compute',
          type: 'job',
          status: 'Consistent',
          ports: [{ name: 'http', port: 8080, isPublic: true }],
          schedulerPort: 8080,
          scheduledJobPayloadPath: '/compute/payload',
          replicaList: [
            {
              name: 'compute-9f5f59888-v5r6n',
              created: '2021-07-22T13:50:36.000Z',
              restartCount: 0,
              statusMessage: '',
              replicaStatus: { status: 'Running' },
            },
          ],
          secrets: [
            'OAUTH2_PROXY_CLIENT_ID',
            'OAUTH2_PROXY_CLIENT_SECRET',
            'OAUTH2_PROXY_COOKIE_SECRET',
            'OAUTH2_PROXY_REDIRECT_URL',
          ],
          variables: {
            RADIX_APP: 'radix-job-demo',
            RADIX_CLUSTERNAME: 'weekly-26',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'compute',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DEPLOYMENT: 'qa-2svag-1ejuatkj',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(8080)',
            RADIX_PORT_NAMES: '(scheduler-port)',
          },
        },
        {
          image: 'radixdev.azurecr.io/radix-job-demo-multi-component:2svag',
          name: 'compute2',
          type: 'job',
          status: 'Consistent',
          ports: [{ name: 'http', port: 8080, isPublic: true }],
          schedulerPort: 8080,
          scheduledJobPayloadPath: '/compute/payload',
          replicaList: [
            {
              name: 'compute2-5949d87b6-pjbsg',
              created: '2021-07-22T13:50:37.000Z',
              restartCount: 0,
              statusMessage: '',
              replicaStatus: { status: 'Running' },
            },
          ],
          secrets: [],
          variables: {
            CALLBACK_ON_COMPLETE_URL: 'http://server:5005',
            COMPUTE_CONFIG: '/compute/payload/payload3',
            PORT: '8080',
            RADIX_APP: 'radix-job-demo',
            RADIX_CLUSTERNAME: 'weekly-26',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'compute2',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DEPLOYMENT: 'qa-2svag-1ejuatkj',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(8080)',
            RADIX_PORT_NAMES: '(scheduler-port)',
          },
        },
      ],
      activeFrom: '1970-01-01',
    },
  },
  {
    appName: 'radix-job-demo',
    jobComponentName: 'compute',
    deploymentName: 'prod-2svag-1ejuatkj',
    deployment: {
      name: 'prod-2svag-1ejuatkj',
      environment: 'prod',
      namespace: 'ns',
      repository: 'repo',
      activeFrom: '1970-01-01',
      components: [
        {
          image: 'radixdev.azurecr.io/radix-job-demo-api:2svag',
          name: 'api',
          type: 'component',
          status: 'Consistent',
          ports: [{ name: 'http', port: 5005, isPublic: true }],
          replicaList: [
            {
              name: 'api-587b8877c-9xr4x',
              created: '2021-07-22T13:50:35.000Z',
              restartCount: 0,
              statusMessage: '',
              replicaStatus: { status: 'Running' },
            },
          ],
          secrets: [],
          variables: {
            ASPNETCORE_URLS: 'http://*:5005',
            RADIX_APP: 'radix-job-demo',
            RADIX_CANONICAL_DOMAIN_NAME:
              'api-radix-job-demo-qa.weekly-26.dev.radix.equinor.com',
            RADIX_CLUSTERNAME: 'weekly-26',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'api',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(5005)',
            RADIX_PORT_NAMES: '(http)',
            RADIX_PUBLIC_DOMAIN_NAME:
              'api-radix-job-demo-qa.dev.radix.equinor.com',
          },
        },
        {
          image: 'quay.io/oauth2-proxy/oauth2-proxy:v7.1.1',
          name: 'auth-proxy',
          type: 'component',
          status: 'Consistent',
          ports: [{ name: 'http', port: 8000, isPublic: true }],
          replicaList: [
            {
              name: 'auth-proxy-86bb8c47c-wwhx8',
              created: '2021-07-22T06:39:24.000Z',
              restartCount: 0,
              statusMessage: '',
              replicaStatus: { status: 'Running' },
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
            OAUTH2_PROXY_PASS_AUTHORIZATION_HEADER: 'true',
            OAUTH2_PROXY_PASS_BASIC_AUTH: 'false',
            OAUTH2_PROXY_PASS_USER_HEADERS: 'false',
            OAUTH2_PROXY_PROVIDER: 'oidc',
            OAUTH2_PROXY_REDIS_CONNECTION_URL: 'redis://auth-state:6379',
            OAUTH2_PROXY_SCOPE:
              'openid email https://graph.microsoft.com/user.read',
            OAUTH2_PROXY_SESSION_STORE_TYPE: 'redis',
            OAUTH2_PROXY_SKIP_PROVIDER_BUTTON: 'true',
            OAUTH2_PROXY_UPSTREAMS: 'http://server:5005',
            RADIX_APP: 'radix-job-demo',
            RADIX_CANONICAL_DOMAIN_NAME:
              'auth-proxy-radix-job-demo-qa.weekly-26.dev.radix.equinor.com',
            RADIX_CLUSTERNAME: 'weekly-26',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'auth-proxy',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(8000)',
            RADIX_PORT_NAMES: '(http)',
            RADIX_PUBLIC_DOMAIN_NAME:
              'auth-proxy-radix-job-demo-qa.dev.radix.equinor.com',
          },
        },
        {
          image: 'radixdev.azurecr.io/radix-job-demo-auth-state:2svag',
          name: 'auth-state',
          type: 'component',
          status: 'Consistent',
          ports: [{ name: 'redis', port: 6379, isPublic: true }],
          replicaList: [
            {
              name: 'auth-state-74f5b9488b-pwm2c',
              created: '2021-07-22T13:50:36.000Z',
              restartCount: 0,
              statusMessage: '',
              replicaStatus: { status: 'Running' },
            },
          ],
          secrets: [],
          variables: {
            ALLOW_EMPTY_PASSWORD: 'yes',
            RADIX_APP: 'radix-job-demo',
            RADIX_CLUSTERNAME: 'weekly-26',
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
          image: 'radixdev.azurecr.io/radix-job-demo-multi-component:2svag',
          name: 'compute',
          type: 'job',
          status: 'Stopped',
          ports: [{ name: 'http', port: 8080, isPublic: true }],
          schedulerPort: 8080,
          scheduledJobPayloadPath: '/compute/payload',
          replicaList: [
            {
              name: 'compute-9f5f59888-v5r6n',
              created: '2021-07-22T13:50:36.000Z',
              restartCount: 0,
              statusMessage: '',
              replicaStatus: { status: 'Running' },
            },
          ],
          secrets: [],
          variables: {
            CALLBACK_ON_COMPLETE_URL: 'http://server:5005',
            COMPUTE_CONFIG: '/compute/payload/payload',
            PORT: '8080',
            RADIX_APP: 'radix-job-demo',
            RADIX_CLUSTERNAME: 'weekly-26',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'compute',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DEPLOYMENT: 'qa-2svag-1ejuatkj',
            RADIX_DNS_ZONE: 'dev.radix.equinor.com',
            RADIX_ENVIRONMENT: 'qa',
            RADIX_GIT_COMMIT_HASH: '',
            RADIX_PORTS: '(8080)',
            RADIX_PORT_NAMES: '(scheduler-port)',
          },
        },
        {
          image: 'radixdev.azurecr.io/radix-job-demo-multi-component:2svag',
          name: 'compute2',
          type: 'job',
          status: 'Consistent',
          ports: [{ name: 'http', port: 8080, isPublic: true }],
          schedulerPort: 8080,
          scheduledJobPayloadPath: '/compute/payload',
          replicaList: [
            {
              name: 'compute2-5949d87b6-pjbsg',
              created: '2021-07-22T13:50:37.000Z',
              restartCount: 0,
              statusMessage: '',
              replicaStatus: { status: 'Running' },
            },
          ],
          secrets: [],
          variables: {
            CALLBACK_ON_COMPLETE_URL: 'http://server:5005',
            COMPUTE_CONFIG: '/compute/payload/payload3',
            PORT: '8080',
            RADIX_APP: 'radix-job-demo',
            RADIX_CLUSTERNAME: 'weekly-26',
            RADIX_CLUSTER_TYPE: 'development',
            RADIX_COMPONENT: 'compute2',
            RADIX_CONTAINER_REGISTRY: 'radixdev.azurecr.io',
            RADIX_DEPLOYMENT: 'qa-2svag-1ejuatkj',
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
      {testData.map(({ appName, deploymentName, jobComponentName }) => (
        <DeploymentJobComponentOverview
          key={deploymentName}
          {...{ appName, deploymentName, jobComponentName }}
        />
      ))}
    </div>
  </div>
);
