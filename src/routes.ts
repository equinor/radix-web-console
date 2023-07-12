// prettier-ignore
export const routes = {
  authAfterLogout: '/logout',
  authCallback: '/auth-callback',
  authLogout: '/logout',

  about: '/about',

  apps: '/applications',
  appsSearch: '/applications/_search',

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
  appPipelineRun: '/applications/:appName/jobs/:jobName/pipelineruns/view/:pipelineRunName',
  appPipelineRunTasks: '/applications/:appName/jobs/:jobName/pipelineruns/:pipelineRunName/tasks',
  appPipelineRunTask: '/applications/:appName/jobs/:jobName/pipelineruns/:pipelineRunName/tasks/view/:taskName',
  appPipelineRunTaskSteps: '/applications/:appName/jobs/:jobName/pipelineruns/:pipelineRunName/tasks/:taskName/steps',
  appPipelineRuns: '/applications/:appName/jobs/:jobName/pipelineruns',
  appOAuthAuxiliaryReplica: '/applications/:appName/envs/:envName/component/:componentName/aux/oauth/replica/:replicaName',
  appScheduledJob: '/applications/:appName/envs/:envName/jobcomponent/:jobComponentName/scheduledjob/:scheduledJobName',
  appScheduledBatch: '/applications/:appName/envs/:envName/jobcomponent/:jobComponentName/scheduledbatch/:scheduledBatchName',
  appSecret: '/applications/:appName/envs/:envName/component/:componentName/secret/:secretName',

  appCreate: '/applications/new',

  home: '/',

  devComponent: '/dev-component/(.*)',
  devIntegration: '/dev-integration/(.*)',
};
