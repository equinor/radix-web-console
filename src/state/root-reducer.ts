import application from './application';
import applicationAlerting from './application-alerting/reducer';
import applicationCreation from './application-creation/reducer';
import component from './component/reducer';
import deployments from './deployments';
import environmentAlerting from './environment-alerting/reducer';
import favouriteApplications from './applications-favourite';
import job from './job';
import jobCreation from './job-creation/reducer';
import oauthAuxiliaryResource from './oauth-auxiliary-resource/reducer';
import pipelineRun from './pipeline-run';
import pipelineRuns from './pipeline-runs/reducer';
import pipelineRunTask from './pipeline-run-task';
import pipelineRunTasks from './pipeline-run-tasks/reducer';
import pipelineRunTaskSteps from './pipeline-run-task-steps/reducer';
import subscriptionRefresh from './subscription-refresh';
import subscriptions from './subscriptions';

export const rootReducer = {
  application,
  applicationAlerting,
  applicationCreation,
  component,
  deployments,
  environmentAlerting,
  favouriteApplications,
  job,
  jobCreation,
  oauthAuxiliaryResource,
  pipelineRun,
  pipelineRuns,
  pipelineRunTask,
  pipelineRunTasks,
  pipelineRunTaskSteps,
  subscriptionRefresh, // TODO: Move into subscriptions reducer
  subscriptions,
};
