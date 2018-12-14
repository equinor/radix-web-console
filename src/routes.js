export default {
  authAfterLogout: '/logout',
  authCallback: '/auth-callback',
  authLogout: '/logout',

  about: '/about',

  apps: '/applications',

  app: '/applications/:appName',
  appConfig: '/applications/:appName/config/',
  appComponent: '/applications/:appName/env/:envName/component/:componentName',
  appDeployments: '/applications/:appName/deployment/',
  appEnvironment: '/applications/:appName/env/:envName',
  appEnvironments: '/applications/:appName/env/',
  appJob: '/applications/:appName/job/:jobName',
  appJobs: '/applications/:appName/job/',
  appPod: '/applications/:appName/env/:envName/component/:componentName/pod/:podName', // prettier-ignore

  appCreate: '/applications/new',

  home: '/',

  devComponent: '/dev-component/(.*)',
  devIntegration: '/dev-integration/(.*)',
};
