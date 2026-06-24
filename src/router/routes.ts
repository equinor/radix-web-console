import ApplicationLayout from '../layouts/application/ApplicationLayout'
import AboutPage from '../pages/about/AboutPage'
import ActiveComponentPage from '../pages/active-component/ActiveComponentPage'
import ActiveJobComponentPage from '../pages/active-job-component/ActiveJobComponentPage'
import AppOverviewPage from '../pages/app-overview/AppOverviewPage'
import ApplicationsPage from '../pages/applications/ApplicationsPage'
import ConfigurationPage from '../pages/configuration/ConfigurationPage'
import DeploymentPage from '../pages/deployment/DeploymentPage'
import DeploymentComponentPage from '../pages/deployment-component/DeploymentComponentPage'
import DeploymentJobComponentPage from '../pages/deployment-job-component/DeploymentJobComponentPage'
import DeploymentsPage from '../pages/deployments/DeploymentsPage'
import EnvironmentPage from '../pages/environment/EnvironmentPage'
import EnvironmentsPage from '../pages/environments/EnvironmentsPage'
import OAuthAuxiliaryReplicaPage from '../pages/oauth-auxiliary-replica/OAuthAuxiliaryReplicaPage'
import PipelineJobPage from '../pages/pipeline-job/PipelineJobPage'
import PipelineJobNewPage from '../pages/pipeline-job-new/PipelineJobNewPage'
import PipelineJobsPage from '../pages/pipeline-jobs/PipelineJobsPage'
import PipelineRunTaskStepPage from '../pages/pipeline-run-task-step/PipelineRunTaskStepPage'
import ReplicaPage from '../pages/replica/ReplicaPage'
import ScheduledBatchPage from '../pages/scheduled-batch/ScheduledBatchPage'
import ScheduledJobPage from '../pages/scheduled-job/ScheduledJobPage'
import SessionExpiredPage from '../pages/session-expired/SessionExpiredPage'
import StepPage from '../pages/step/StepPage'
import type { RouteTree, StaticRoutes } from './router.types'
import { buildPathMap } from './routes.utils'

/**
 * Tree of routes mounted under the React Router root layout.
 *
 * To add a route, insert a node with a unique `key` and a relative `path`.
 * Both the `routes` map and the React Router config are derived from this tree.
 *
 * @internal - this constant should not be imported directly, use `routes` instead which includes static routes as well.
 */
export const routeTree = [
  { key: 'about', path: 'about', Component: AboutPage },
  { key: 'sessionExpired', path: 'session-expired', Component: SessionExpiredPage },
  {
    key: 'apps',
    path: 'applications',
    index: ApplicationsPage,
    children: [
      {
        key: 'app',
        path: ':appName',
        Component: ApplicationLayout,
        index: AppOverviewPage,
        children: [
          { key: 'appConfig', path: 'config', Component: ConfigurationPage },
          {
            key: 'appDeployments',
            path: 'deployments',
            index: DeploymentsPage,
            children: [
              {
                key: 'appDeployment',
                path: ':deploymentName',
                index: DeploymentPage,
                children: [
                  { key: 'appComponent', path: 'component/:componentName', Component: DeploymentComponentPage },
                  {
                    key: 'appJobComponent',
                    path: 'jobcomponent/:jobComponentName',
                    Component: DeploymentJobComponentPage,
                  },
                ],
              },
            ],
          },
          {
            key: 'appEnvironments',
            path: 'envs',
            index: EnvironmentsPage,
            children: [
              {
                key: 'appEnvironment',
                path: ':envName',
                index: EnvironmentPage,
                children: [
                  {
                    key: 'appActiveComponent',
                    path: 'component/:componentName',
                    index: ActiveComponentPage,
                    children: [
                      { key: 'appReplica', path: 'replica/:replicaName', Component: ReplicaPage },
                      {
                        key: 'appOAuthAuxiliaryReplica',
                        path: 'aux/:type/replica/:replicaName',
                        Component: OAuthAuxiliaryReplicaPage,
                      },
                    ],
                  },
                  {
                    key: 'appActiveJobComponent',
                    path: 'jobcomponent/:jobComponentName',
                    index: ActiveJobComponentPage,
                    children: [
                      { key: 'appScheduledJob', path: 'scheduledjob/:scheduledJobName', Component: ScheduledJobPage },
                      {
                        key: 'appScheduledBatch',
                        path: 'scheduledbatch/:scheduledBatchName',
                        index: ScheduledBatchPage,
                        children: [
                          {
                            key: 'appScheduledBatchJob',
                            path: 'scheduledjob/:scheduledJobName',
                            Component: ScheduledJobPage,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
            ],
          },
          {
            key: 'appJobs',
            path: 'jobs',
            index: PipelineJobsPage,
            children: [
              { key: 'appJobNew', path: 'new', Component: PipelineJobNewPage },
              { key: 'appJob', path: 'view/:jobName', Component: PipelineJobPage },
              { key: 'appJobStep', path: 'view/:jobName/steps/:stepName', Component: StepPage },
              {
                key: 'appPipelineRunTaskStep',
                path: ':jobName/pipelineruns/:pipelineRunName/tasks/:taskName/steps/:stepName',
                Component: PipelineRunTaskStepPage,
              },
            ],
          },
        ],
      },
    ],
  },
] as const satisfies RouteTree

/**
 * Standalone paths that are not part of the router tree.
 * This is used for special routes that don't fit into the usual layout.
 * Normally this is not the preferred way to add routes, but it's available if needed for edge cases.
 *
 * @internal - This constant should not be imported directly, use `routes` instead which includes these and the tree routes together.
 */
const staticRoutes = {
  home: '/',
  devComponent: '/dev-component/(.*)',
  devIntegration: '/dev-integration/(.*)',
} as const satisfies StaticRoutes

/**
 * Absolute URL templates keyed by route name.
 * Used for generating links and route matching patterns throughout the app.
 *
 * @example output of `routes`:
 *     {
 *        app: '/applications/:appName',
 *        appConfig: '/applications/:appName/config',
 *        ...
 *     }
 */
export const routes = buildPathMap(routeTree, staticRoutes)
