import { createBrowserRouter, Navigate } from 'react-router-dom';

import { routes } from './routes';

/** Page Layouts */
import * as PageLayoutApplication from './pages/page-application';
import * as PageLayoutRoot from './pages/page-root';

/** Pages */
import * as PageAbout from './components/page-about';
import * as PageApplications from './components/page-applications';
import * as PageApplication from './components/app-overview';
import * as PageConfiguration from './components/page-configuration';
import * as PageDeployments from './components/page-deployments';
import * as PageDeployment from './components/page-deployment';
import * as PageDeploymentComponent from './components/page-deployment-component';
import * as PageDeploymentJobComponent from './components/page-deployment-job-component';
import * as PageEnvironments from './components/page-environments';
import * as PageEnvironment from './components/page-environment';
import * as PageActiveComponent from './components/page-active-component';
import * as PageOauthReplica from './components/page-oauth-replica';
import * as PageReplica from './components/page-replica';
import * as PageActiveJobComponent from './components/page-active-job-component';
import * as PageScheduledBatch from './components/page-scheduled-batch';
import * as PageScheduledJob from './components/page-scheduled-job';
import * as PagePipelineJobs from './components/page-pipeline-jobs';
import * as PagePipelineJob from './components/page-pipeline-job';
import * as PageStep from './components/page-step';
import * as PagePipelineJobNew from './components/page-pipeline-job-new';
import * as PagePipelineRun from './components/page-pipeline-run';
import * as PagePipelineRunTask from './components/page-pipeline-run-task';

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
    ...PageLayoutRoot,
    children: [
      {
        // ABOUT
        path: routes.about,
        children: [
          {
            index: true,
            ...PageAbout,
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
            ...PageApplications,
          },
          {
            /* APP Page */
            path: routes.app,
            ...PageLayoutApplication,
            children: [
              {
                index: true,
                ...PageApplication,
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
                    ...PageDeployments,
                  },
                  {
                    // DEPLOYMENT
                    path: routes.appDeployment,
                    children: [
                      {
                        index: true,
                        ...PageDeployment,
                      },
                      {
                        path: routes.appComponent,
                        ...PageDeploymentComponent,
                      },
                      {
                        path: routes.appJobComponent,
                        ...PageDeploymentJobComponent,
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
                    ...PageEnvironments,
                  },
                  {
                    // ENVIRONMENT
                    path: routes.appEnvironment,
                    children: [
                      {
                        index: true,
                        ...PageEnvironment,
                      },
                      {
                        // ACTIVECOMPONENT
                        path: routes.appActiveComponent,
                        children: [
                          {
                            index: true,
                            ...PageActiveComponent,
                          },
                          {
                            path: routes.appOAuthAuxiliaryReplica,
                            ...PageOauthReplica,
                          },
                          {
                            path: routes.appReplica,
                            ...PageReplica,
                          },
                        ],
                      },
                      {
                        // ACTIVEJOBCOMPONENT
                        path: routes.appActiveJobComponent,
                        children: [
                          {
                            index: true,
                            ...PageActiveJobComponent,
                          },
                          {
                            path: routes.appScheduledBatch,
                            ...PageScheduledBatch,
                          },
                          {
                            path: routes.appScheduledJob,
                            ...PageScheduledJob,
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
                    ...PagePipelineJobs,
                  },
                  {
                    path: routes.appJob,
                    ...PagePipelineJob,
                  },
                  {
                    path: routes.appJobStep,
                    Component: PageStep.default,
                  },
                  {
                    path: routes.appJobNew,
                    ...PagePipelineJobNew,
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
