export type RouteParams = {
  appName?: string;
  componentName?: string;
  deploymentName?: string;
  envName?: string;
  jobComponentName?: string;
  jobName?: string;
  pipelineRunName?: string;
  replicaName?: string;
  scheduledBatchName?: string;
  scheduledJobName?: string;
  stepName?: string;
  taskName?: string;
};

// prettier-ignore
export const routes = {
  home: '/',

  authAfterLogout: '/logout',
  authCallback: '/auth-callback',
  authLogout: '/logout',

  about: '/about',

  appsSearch: '/applications/_search',

  apps: '/applications',
  app: '/applications/:appName',
  appConfig: '/applications/:appName/config',
  appDeployments: '/applications/:appName/deployments',
  appDeployment: '/applications/:appName/deployments/:deploymentName',
  appComponent: '/applications/:appName/deployments/:deploymentName/component/:componentName',
  appJobComponent: '/applications/:appName/deployments/:deploymentName/jobcomponent/:jobComponentName',
  appEnvironments: '/applications/:appName/envs',
  appEnvironment: '/applications/:appName/envs/:envName',
  appActiveComponent: '/applications/:appName/envs/:envName/component/:componentName',
  appReplica: '/applications/:appName/envs/:envName/component/:componentName/replica/:replicaName',
  appOAuthAuxiliaryReplica: '/applications/:appName/envs/:envName/component/:componentName/aux/oauth/replica/:replicaName',
  appActiveJobComponent: '/applications/:appName/envs/:envName/jobcomponent/:jobComponentName',
  appScheduledJob: '/applications/:appName/envs/:envName/jobcomponent/:jobComponentName/scheduledjob/:scheduledJobName',
  appScheduledBatch: '/applications/:appName/envs/:envName/jobcomponent/:jobComponentName/scheduledbatch/:scheduledBatchName',
  appJobs: '/applications/:appName/jobs',
  appJob: '/applications/:appName/jobs/view/:jobName',
  appJobStep: '/applications/:appName/jobs/view/:jobName/steps/:stepName',
  appJobNew: '/applications/:appName/jobs/new',
  appPipelineRuns: '/applications/:appName/jobs/:jobName/pipelineruns',
  appPipelineRun: '/applications/:appName/jobs/:jobName/pipelineruns/view/:pipelineRunName',
  appPipelineRunTasks: '/applications/:appName/jobs/:jobName/pipelineruns/:pipelineRunName/tasks',
  appPipelineRunTask: '/applications/:appName/jobs/:jobName/pipelineruns/:pipelineRunName/tasks/view/:taskName',
  appPipelineRunTaskSteps: '/applications/:appName/jobs/:jobName/pipelineruns/:pipelineRunName/tasks/:taskName/steps',

  devComponent: '/dev-component/(.*)',
  devIntegration: '/dev-integration/(.*)',
};
