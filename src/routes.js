export default {
  authAfterLogout: '/logout',
  authCallback: '/auth-callback',
  authLogout: '/logout',

  about: '/about',

  apps: '/applications',

  app: '/applications/:appName',
  appJob: '/applications/:appName/job/:jobName',
  appEnvironment: '/applications/:appName/env/:envName',
  appComponent: '/applications/:appName/env/:envName/component/:componentName',
  appPod:
    '/applications/:appName/env/:envName/component/:componentName/pod/:podName',

  appEnvSecret: '/applications/:appName/env/:envName/secret/:secretName',
  appCreate: '/applications/new',

  home: '/',

  devComponent: '/dev-component/(.*)',
  devIntegration: '/dev-integration/(.*)',
};
