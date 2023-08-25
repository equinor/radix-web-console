import { Typography } from '@equinor/eds-core-react';
import { ComponentType, FunctionComponent } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { DocumentTitle } from './components/document-title';
import * as PageApplication from './pages/page-application';
import * as PageRoot from './pages/page-root';
import { routes } from './routes';

function componentTitleWrapper<P extends object>(
  Component: ComponentType<P>,
  title: string
): FunctionComponent<P> {
  return (props) => (
    <>
      <DocumentTitle title={title} />
      <Component {...props} />
    </>
  );
}

function makeGenericPage<P extends object>(
  Component: ComponentType<P>,
  title: string
): FunctionComponent<P> {
  return (props) => (
    <div className="o-layout-single">
      <div className="o-layout-single__head">
        <Typography variant="body_short_bold">{title}</Typography>
      </div>
      <div className="o-layout-single__content">
        {componentTitleWrapper(Component, title)(props)}
      </div>
    </div>
  );
}

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
    ...PageRoot,
    children: [
      {
        // ABOUT
        path: routes.about,
        children: [
          {
            index: true,
            lazy: async () =>
              import('./components/page-about').then(
                ({ Component, ...rest }) => ({
                  Component: makeGenericPage(Component, 'About'),
                  ...rest,
                })
              ),
          },
        ],
      },
      {
        // APPLICATIONS
        path: routes.apps,
        children: [
          {
            index: true,
            lazy: async () => import('./components/page-applications'),
          },
          {
            /* APP Page */
            path: routes.app,
            ...PageApplication,
            children: [
              {
                index: true,
                lazy: async () => import('./components/app-overview'),
              },
              {
                // CONFIGURATION
                path: routes.appConfig,
                children: [
                  {
                    index: true,
                    lazy: async () => import('./components/page-configuration'),
                  },
                  {
                    path: routes.appBuildSecret,
                    lazy: async () => import('./components/page-build-secret'),
                  },
                  {
                    path: routes.appPrivateImageHub,
                    lazy: async () =>
                      import('./components/page-private-image-hub'),
                  },
                ],
              },
              {
                // DEPLOYMENTS
                path: routes.appDeployments,
                children: [
                  {
                    index: true,
                    lazy: async () => import('./components/page-deployments'),
                  },
                  {
                    // DEPLOYMENT
                    path: routes.appDeployment,
                    children: [
                      {
                        index: true,
                        lazy: async () =>
                          import('./components/page-deployment'),
                      },
                      {
                        path: routes.appComponent,
                        lazy: async () =>
                          import('./components/page-deployment-component'),
                      },
                      {
                        path: routes.appJobComponent,
                        lazy: async () =>
                          import('./components/page-deployment-job-component'),
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
                    lazy: async () => import('./components/page-environments'),
                  },
                  {
                    // ENVIRONMENT
                    path: routes.appEnvironment,
                    children: [
                      {
                        index: true,
                        lazy: async () =>
                          import('./components/page-environment'),
                      },
                      {
                        // ACTIVECOMPONENT
                        path: routes.appActiveComponent,
                        children: [
                          {
                            index: true,
                            lazy: async () =>
                              import('./components/page-active-component'),
                          },
                          {
                            path: routes.appOAuthAuxiliaryReplica,
                            lazy: async () =>
                              import('./components/page-oauth-replica'),
                          },
                          {
                            path: routes.appReplica,
                            lazy: async () =>
                              import('./components/page-replica'),
                          },
                          {
                            path: routes.appSecret,
                            lazy: async () =>
                              import('./components/page-secret'),
                          },
                        ],
                      },
                      {
                        // ACTIVEJOBCOMPONENT
                        path: routes.appActiveJobComponent,
                        children: [
                          {
                            index: true,
                            lazy: async () =>
                              import('./components/page-active-job-component'),
                          },
                          {
                            path: routes.appScheduledBatch,
                            lazy: async () =>
                              import('./components/page-scheduled-batch'),
                          },
                          {
                            path: routes.appScheduledJob,
                            lazy: async () =>
                              import('./components/page-scheduled-job'),
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
                    lazy: async () => import('./components/page-pipeline-jobs'),
                  },
                  {
                    path: routes.appJob,
                    lazy: async () => import('./components/page-pipeline-job'),
                  },
                  {
                    path: routes.appJobStep,
                    lazy: async () => import('./components/page-step'),
                  },
                  {
                    path: routes.appJobNew,
                    lazy: async () =>
                      import('./components/page-pipeline-job-new'),
                  },
                  {
                    // PIPELINERUNS
                    path: routes.appPipelineRuns,
                    children: [
                      {
                        path: routes.appPipelineRun,
                        lazy: async () =>
                          import('./components/page-pipeline-run'),
                      },
                      {
                        path: routes.appPipelineRunTask,
                        lazy: async () =>
                          import('./components/page-pipeline-run-task'),
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
