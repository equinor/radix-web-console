import application from './application/reducer';
import applicationCreation from './application-creation/reducer';
import deployment from './deployment';
import deployments from './deployments';
import environment from './environment/reducer';
import environmentScheduledBatches from './environment-scheduled-batches';
import environmentScheduledJobs from './environment-scheduled-jobs';
import events from './events';
import job from './job';
import component from './component/reducer';
import jobCreation from './job-creation/reducer';
import pipelineRuns from './pipeline-runs/reducer';
import pipelineRun from './pipeline-run/reducer';
import pipelineRunTask from './pipeline-run-task/reducer';
import pipelineRunTasks from './pipeline-run-tasks/reducer';
import pipelineRunTaskSteps from './pipeline-run-task-steps/reducer';
import jobs from './jobs';
import secrets from './secrets/reducer';
import subscriptions from './subscriptions';
import subscriptionRefresh from './subscription-refresh/reducer';
import favouriteApplications from './applications-favourite';
import lastKnownApplications from './applications-lastknown';
import environmentAlerting from './environment-alerting/reducer';
import applicationAlerting from './application-alerting/reducer';
import oauthAuxiliaryResource from './oauth-auxiliary-resource/reducer';

const rootReducer = {
  application,
  applicationCreation,
  deployment,
  deployments,
  environment,
  environmentScheduledBatches,
  environmentScheduledJobs,
  events,
  component,
  job,
  jobCreation,
  pipelineRuns,
  pipelineRun,
  pipelineRunTask,
  pipelineRunTasks,
  pipelineRunTaskSteps,
  jobs,
  secrets,
  subscriptionRefresh, // TODO: Move into subscriptions reducer
  subscriptions,
  favouriteApplications,
  lastKnownApplications,
  environmentAlerting,
  applicationAlerting,
  oauthAuxiliaryResource,
};

export default rootReducer;
