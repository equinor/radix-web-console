export default {
  authAfterLogout: '/logout',
  authCallback: '/auth-callback',
  authLogout: '/logout',

  about: '/about',

  apps: '/applications',

  app: '/applications/:appName',
  appConfig: '/applications/:appName/config/',
  appComponent: '/applications/:appName/envs/:envName/component/:componentName',
  appDeployment: '/applications/:appName/deployments/:deploymentName',
  appDeployments: '/applications/:appName/deployments',
  appEnvironment: '/applications/:appName/envs/:envName',
  appEnvironments: '/applications/:appName/envs',
  appJob: '/applications/:appName/jobs/:jobName',
  appJobs: '/applications/:appName/jobs',
  appPod: '/applications/:appName/envs/:envName/component/:componentName/pod/:podName', // prettier-ignore

  appCreate: '/applications/new',

  home: '/',

  devComponent: '/dev-component/(.*)',
  devIntegration: '/dev-integration/(.*)',
};
