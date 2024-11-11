import { Navigate, createBrowserRouter } from 'react-router-dom';

import { routes } from './routes';

/** Page Layouts */
import * as PageLayoutApplication from './pages/page-application';
import * as PageLayoutRoot from './pages/page-root';

import * as PageApplication from './components/app-overview';
/** Pages */
import * as PageAbout from './components/page-about';
import * as PageActiveComponent from './components/page-active-component';
import * as PageActiveJobComponent from './components/page-active-job-component';
import * as PageApplications from './components/page-applications';
import * as PageConfiguration from './components/page-configuration';
import * as PageDeployment from './components/page-deployment';
import * as PageDeploymentComponent from './components/page-deployment-component';
import * as PageDeploymentJobComponent from './components/page-deployment-job-component';
import * as PageDeployments from './components/page-deployments';
import * as PageEnvironment from './components/page-environment';
import * as PageEnvironments from './components/page-environments';
import * as PageOauthReplica from './components/page-oauth-replica';
import * as PagePipelineJob from './components/page-pipeline-job';
import * as PagePipelineJobNew from './components/page-pipeline-job-new';
import * as PagePipelineJobs from './components/page-pipeline-jobs';
import * as PagePipelineRun from './components/page-pipeline-run';
import * as PagePipelineRunTask from './components/page-pipeline-run-task';
import * as PageReplica from './components/page-replica';
import * as PageScheduledBatch from './components/page-scheduled-batch';
import * as PageScheduledJob from './components/page-scheduled-job';
import * as PageStep from './components/page-step';

/**
 * Radix Web Console page router
 *
 * Holds the data and routing table for every page within the Web Console Application
 *
 * @note
 * Every lazy loaded route object is expected to have named exports
 * matching the properties in a react-router-dom:RouteObject.
 *
 * Such components are required to export at least either a `Component`
 * or an `element` so that it can be rendered in an `<Outlet />`
 *
 * `page-generic.tsx`
 * ```jsx
 * export const Component = () => <div>PageData...</div>
 * export async function loader(args) {
 *   return args.params;
 * }
 * export const hasErrorBoundary = true;
 * ```
 */
export const router = createBrowserRouter([
  // redirect to APPLICATIONS
  { index: true, element: <Navigate to={routes.apps} replace /> },
  { path: '*', element: <Navigate to={routes.apps} replace /> },

  /* ROOT Page */
  {
    path: '',
    Component: PageLayoutRoot.default,
    children: [
      {
        // ABOUT
        path: routes.about,
        children: [
          {
            index: true,
            Component: PageAbout.default,
          },
        ],
      },
      {
        // APPLICATIONS
        path: routes.apps,
        children: [
          {
            index: true,
            Component: PageApplications.default,
          },
          {
            /* APP Page */
            path: routes.app,
            Component: PageLayoutApplication.default,
            children: [
              {
                index: true,
                Component: PageApplication.default,
              },
              {
                // CONFIGURATION
                path: routes.appConfig,
                Component: PageConfiguration.default,
              },
              {
                // DEPLOYMENTS
                path: routes.appDeployments,
                children: [
                  {
                    index: true,
                    Component: PageDeployments.default,
                  },
                  {
                    // DEPLOYMENT
                    path: routes.appDeployment,
                    children: [
                      {
                        index: true,
                        Component: PageDeployment.default,
                      },
                      {
                        path: routes.appComponent,
                        Component: PageDeploymentComponent.default,
                      },
                      {
                        path: routes.appJobComponent,
                        Component: PageDeploymentJobComponent.default,
                      },
                    ],
                  },
                ],
              },
              {
                // ENVIRONMENTS
                path: routes.appEnvironments,
                children: [
                  {
                    index: true,
                    Component: PageEnvironments.default,
                  },
                  {
                    // ENVIRONMENT
                    path: routes.appEnvironment,
                    children: [
                      {
                        index: true,
                        Component: PageEnvironment.default,
                      },
                      {
                        // ACTIVECOMPONENT
                        path: routes.appActiveComponent,
                        children: [
                          {
                            index: true,
                            Component: PageActiveComponent.default,
                          },
                          {
                            path: routes.appOAuthAuxiliaryReplica,
                            Component: PageOauthReplica.default,
                          },
                          {
                            path: routes.appReplica,
                            Component: PageReplica.default,
                          },
                        ],
                      },
                      {
                        // ACTIVEJOBCOMPONENT
                        path: routes.appActiveJobComponent,
                        children: [
                          {
                            index: true,
                            Component: PageActiveJobComponent.default,
                          },
                          {
                            path: routes.appScheduledBatch,
                            Component: PageScheduledBatch.default,
                          },
                          {
                            path: routes.appScheduledJob,
                            Component: PageScheduledJob.default,
                          },
                          {
                            path: routes.appScheduledBatchJob,
                            Component: PageScheduledJob.default,
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                // JOBS
                path: routes.appJobs,
                children: [
                  {
                    index: true,
                    Component: PagePipelineJobs.default,
                  },
                  {
                    path: routes.appJob,
                    Component: PagePipelineJob.default,
                  },
                  {
                    path: routes.appJobStep,
                    Component: PageStep.default,
                  },
                  {
                    path: routes.appJobNew,
                    Component: PagePipelineJobNew.default,
                  },
                  {
                    // PIPELINERUNS
                    path: routes.appPipelineRuns,
                    children: [
                      {
                        path: routes.appPipelineRun,
                        Component: PagePipelineRun.default,
                      },
                      {
                        path: routes.appPipelineRunTask,
                        Component: PagePipelineRunTask.default,
                      },
                    ],
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
]);
