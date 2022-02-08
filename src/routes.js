// prettier-ignore
export const routes = {
  authAfterLogout: '/logout',
  authCallback: '/auth-callback',
  authLogout: '/logout',

  about: '/about',

  apps: '/applications',

  app: '/applications/:appName',
  appConfig: '/applications/:appName/config/',
  appPrivateImageHub: '/applications/:appName/config/imagehubs/:imageHubName',
  appBuildSecret: '/applications/:appName/config/buildsecrets/:secretName',
  appComponent: '/applications/:appName/deployments/:deploymentName/component/:componentName',
  appJobComponent: '/applications/:appName/deployments/:deploymentName/jobcomponent/:jobComponentName',
  appDeployment: '/applications/:appName/deployments/:deploymentName',
  appDeployments: '/applications/:appName/deployments',
  appEnvironment: '/applications/:appName/envs/:envName',
  appActiveComponent: '/applications/:appName/envs/:envName/component/:componentName',
  appActiveJobComponent: '/applications/:appName/envs/:envName/jobcomponent/:jobComponentName',
  appEnvComponent: '/applications/:appName/envs/:envName/component/:componentName',
  appEnvironments: '/applications/:appName/envs',
  appJob: '/applications/:appName/jobs/view/:jobName',
  appJobNew: '/applications/:appName/jobs/new',
  appJobs: '/applications/:appName/jobs',
  appJobStep: '/applications/:appName/jobs/view/:jobName/steps/:stepName',
  appPod: '/applications/:appName/envs/:envName/component/:componentName/pod/:podName',
  appReplica: '/applications/:appName/envs/:envName/component/:componentName/replica/:replicaName',
  appAuxiliaryReplica: '/applications/:appName/envs/:envName/component/:componentName/aux/:auxType/replica/:replicaName',
  appScheduledJob: '/applications/:appName/envs/:envName/jobcomponent/:jobComponentName/scheduledjob/:scheduledJobName',
  appSecret: '/applications/:appName/envs/:envName/component/:componentName/secret/:secretName',

  appCreate: '/applications/new',

  home: '/',

  devComponent: '/dev-component/(.*)',
  devIntegration: '/dev-integration/(.*)',
};

export default routes;
