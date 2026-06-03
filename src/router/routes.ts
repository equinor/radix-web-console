import PageApplication from '../components/app-overview'
import PageAbout from '../components/page-about'
import PageActiveComponent from '../components/page-active-component'
import PageActiveJobComponent from '../components/page-active-job-component'
import PageApplications from '../components/page-applications'
import PageConfiguration from '../components/page-configuration'
import PageDeployment from '../components/page-deployment'
import PageDeploymentComponent from '../components/page-deployment-component'
import PageDeploymentJobComponent from '../components/page-deployment-job-component'
import PageDeployments from '../components/page-deployments'
import PageEnvironment from '../components/page-environment'
import PageEnvironments from '../components/page-environments'
import PageOauthReplica from '../components/page-oauth-replica'
import PagePipelineJob from '../components/page-pipeline-job'
import PagePipelineJobNew from '../components/page-pipeline-job-new'
import PagePipelineJobs from '../components/page-pipeline-jobs'
import PageReplica from '../components/page-replica'
import PageScheduledBatch from '../components/page-scheduled-batch'
import PageScheduledJob from '../components/page-scheduled-job'
import PageStep from '../components/page-step'
import PipelineRunTaskStep from '../components/pipeline-run-task-step'
import PageLayoutApplication from '../pages/page-application'
import SessionExpired from '../pages/session-expired'
import { buildPathMap, type RouteNode } from './routes.internal'

/**
 * Tree of routes mounted under the React Router root layout.
 * To add a route: drop a node anywhere in the tree. The exported `routes` map
 * and the React Router config in `router.tsx` are derived from this tree.
 *
 * @internal - this constant should not be imported directly, use `routes` instead which includes static routes as well.
 */
export const routeTree = [
  { key: 'about', path: 'about', Component: PageAbout },
  { key: 'sessionExpired', path: 'session-expired', Component: SessionExpired },
  {
    key: 'apps',
    path: 'applications',
    index: PageApplications,
    children: [
      {
        key: 'app',
        path: ':appName',
        Component: PageLayoutApplication,
        index: PageApplication,
        children: [
          { key: 'appConfig', path: 'config', Component: PageConfiguration },
          {
            key: 'appDeployments',
            path: 'deployments',
            index: PageDeployments,
            children: [
              {
                key: 'appDeployment',
                path: ':deploymentName',
                index: PageDeployment,
                children: [
                  { key: 'appComponent', path: 'component/:componentName', Component: PageDeploymentComponent },
                  {
                    key: 'appJobComponent',
                    path: 'jobcomponent/:jobComponentName',
                    Component: PageDeploymentJobComponent,
                  },
                ],
              },
            ],
          },
          {
            key: 'appEnvironments',
            path: 'envs',
            index: PageEnvironments,
            children: [
              {
                key: 'appEnvironment',
                path: ':envName',
                index: PageEnvironment,
                children: [
                  {
                    key: 'appActiveComponent',
                    path: 'component/:componentName',
                    index: PageActiveComponent,
                    children: [
                      { key: 'appReplica', path: 'replica/:replicaName', Component: PageReplica },
                      {
                        key: 'appOAuthAuxiliaryReplica',
                        path: 'aux/:type/replica/:replicaName',
                        Component: PageOauthReplica,
                      },
                    ],
                  },
                  {
                    key: 'appActiveJobComponent',
                    path: 'jobcomponent/:jobComponentName',
                    index: PageActiveJobComponent,
                    children: [
                      { key: 'appScheduledJob', path: 'scheduledjob/:scheduledJobName', Component: PageScheduledJob },
                      {
                        key: 'appScheduledBatch',
                        path: 'scheduledbatch/:scheduledBatchName',
                        index: PageScheduledBatch,
                        children: [
                          {
                            key: 'appScheduledBatchJob',
                            path: 'scheduledjob/:scheduledJobName',
                            Component: PageScheduledJob,
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
            index: PagePipelineJobs,
            children: [
              { key: 'appJobNew', path: 'new', Component: PagePipelineJobNew },
              { key: 'appJob', path: 'view/:jobName', Component: PagePipelineJob },
              { key: 'appJobStep', path: 'view/:jobName/steps/:stepName', Component: PageStep },
              {
                key: 'appPipelineRunTaskStep',
                path: ':jobName/pipelineruns/:pipelineRunName/tasks/:taskName/steps/:stepName',
                Component: PipelineRunTaskStep,
              },
            ],
          },
        ],
      },
    ],
  },
] as const satisfies readonly RouteNode[] // Needed to preserve literal types for `key` and `path` for type inference in `buildPathMap`

/** Standalone paths that are not part of the router tree.
 * @internal - This constant should not be imported directly, use `routes` instead which includes these.
 */
const staticRoutes = {
  home: '/',
  devComponent: '/dev-component/(.*)',
  devIntegration: '/dev-integration/(.*)',
} as const

/** Absolute URL templates keyed by route name.
 *
 * @example
 *     {
 *        app: '/applications/:appName',
 *        appConfig: '/applications/:appName/config',
 *        ...
 *     }
 */
export const routes = buildPathMap(routeTree, staticRoutes)
