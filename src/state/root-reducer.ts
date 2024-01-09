import application from './application';
import applicationCreation from './application-creation/reducer';
import component from './component/reducer';
import deployments from './deployments';
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
  applicationCreation,
  component,
  deployments,
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
