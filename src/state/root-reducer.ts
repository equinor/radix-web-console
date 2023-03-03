import application from './application';
import applicationAlerting from './application-alerting/reducer';
import applicationCreation from './application-creation/reducer';
import component from './component/reducer';
import deployment from './deployment';
import deployments from './deployments';
import environment from './environment';
import environmentAlerting from './environment-alerting/reducer';
import environmentScheduledBatches from './environment-scheduled-batches';
import environmentScheduledJobs from './environment-scheduled-jobs';
import events from './events';
import favouriteApplications from './applications-favourite';
import job from './job';
import jobCreation from './job-creation/reducer';
import jobs from './jobs';
import oauthAuxiliaryResource from './oauth-auxiliary-resource/reducer';
import pipelineRun from './pipeline-run';
import pipelineRuns from './pipeline-runs/reducer';
import pipelineRunTask from './pipeline-run-task';
import pipelineRunTasks from './pipeline-run-tasks/reducer';
import pipelineRunTaskSteps from './pipeline-run-task-steps/reducer';
import secrets from './secrets/reducer';
import subscriptionRefresh from './subscription-refresh';
import subscriptions from './subscriptions';

export const rootReducer = {
  application,
  applicationAlerting,
  applicationCreation,
  component,
  deployment,
  deployments,
  environment,
  environmentAlerting,
  environmentScheduledBatches,
  environmentScheduledJobs,
  events,
  favouriteApplications,
  job,
  jobCreation,
  jobs,
  oauthAuxiliaryResource,
  pipelineRun,
  pipelineRuns,
  pipelineRunTask,
  pipelineRunTasks,
  pipelineRunTaskSteps,
  secrets,
  subscriptionRefresh, // TODO: Move into subscriptions reducer
  subscriptions,
};

export default rootReducer;
