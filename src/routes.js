export default {
  authAfterLogout: '/logout',
  authCallback: '/auth-callback',
  authLogout: '/logout',

  about: '/about',

  apps: '/applications',

  app: '/applications/:id',
  appEnvironment: '/applications/:id/env/:env',
  appEnvPod: '/applications/:id/env/:env/pod/:pod',
  appEnvSecret: '/applications/:id/env/:env/secret/:secret',

  appCreate: '/applications/new',

  home: '/',

  devComponent: '/dev-component/(.*)',
};
