import { Typography } from '@equinor/eds-core-react';
import { ComponentType, FunctionComponent } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';

import { DocumentTitle } from './components/document-title';
import { routes } from './routes';

function pageTitleWrapper<P extends object>(
  Page: ComponentType<P>,
  title: string
): FunctionComponent<P> {
  return (props) => (
    <>
      <DocumentTitle title={title} />
      <Page {...props} />
    </>
  );
}

function makeGenericPage<P extends object>(
  Page: ComponentType<P>,
  title: string
): FunctionComponent<P> {
  return (props) => (
    <div className="o-layout-single">
      <div className="o-layout-single__head">
        <Typography variant="body_short_bold">{title}</Typography>
      </div>
      <div className="o-layout-single__content">
        {pageTitleWrapper(Page, title)(props)}
      </div>
    </div>
  );
}

export const router = createBrowserRouter([
  // redirect to APPLICATIONS
  { index: true, element: <Navigate to={routes.apps} replace /> },
  { path: '*', element: <Navigate to={routes.apps} replace /> },

  /* ROOT Page */
  {
    path: '',
    lazy: async () =>
      import('./pages/page-root').then(({ default: Component }) => ({
        Component,
      })),
    children: [
      {
        // ABOUT
        path: routes.about,
        children: [
          {
            index: true,
            lazy: async () =>
              import('./components/page-about').then(
                ({ default: Component }) => ({
                  Component: makeGenericPage(Component, 'About'),
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
            lazy: async () =>
              import('./components/page-applications').then(
                ({ default: Component }) => ({
                  Component: pageTitleWrapper(Component, 'Applications'),
                })
              ),
          },
          {
            /* APP Page */
            path: routes.app,
            lazy: async () =>
              import('./pages/page-application').then(
                ({ default: Component }) => ({ Component })
              ),
            children: [
              {
                index: true,
                lazy: async () =>
                  import('./components/app-overview').then(
                    ({ default: Component }) => ({ Component })
                  ),
              },
              {
                // CONFIGURATION
                path: routes.appConfig,
                lazy: async () =>
                  import('./components/page-configuration').then(
                    ({ default: Component }) => ({ Component })
                  ),
                children: [
                  {
                    path: routes.appBuildSecret,
                    lazy: async () =>
                      import('./components/page-build-secret').then(
                        ({ default: Component }) => ({ Component })
                      ),
                  },
                  {
                    path: routes.appPrivateImageHub,
                    lazy: async () =>
                      import('./components/page-private-image-hub').then(
                        ({ default: Component }) => ({ Component })
                      ),
                  },
                ],
              },
              {
                // DEPLOYMENTS
                path: routes.appDeployments,
                children: [
                  {
                    index: true,
                    lazy: async () =>
                      import('./components/page-deployments').then(
                        ({ default: Component }) => ({ Component })
                      ),
                  },
                  {
                    // DEPLOYMENT
                    path: routes.appDeployment,
                    children: [
                      {
                        index: true,
                        lazy: async () =>
                          import('./components/page-deployment').then(
                            ({ default: Component }) => ({ Component })
                          ),
                      },
                      {
                        path: routes.appComponent,
                        lazy: async () =>
                          import('./components/page-deployment-component').then(
                            ({ default: Component }) => ({ Component })
                          ),
                      },
                      {
                        path: routes.appJobComponent,
                        lazy: async () =>
                          import(
                            './components/page-deployment-job-component'
                          ).then(({ default: Component }) => ({ Component })),
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
                    lazy: async () =>
                      import('./components/page-environments').then(
                        ({ default: Component }) => ({ Component })
                      ),
                  },
                  {
                    // ENVIRONMENT
                    path: routes.appEnvironment,
                    children: [
                      {
                        index: true,
                        lazy: async () =>
                          import('./components/page-environment').then(
                            ({ default: Component }) => ({ Component })
                          ),
                      },
                      {
                        // ACTIVECOMPONENT
                        path: routes.appActiveComponent,
                        children: [
                          {
                            index: true,
                            lazy: async () =>
                              import('./components/page-active-component').then(
                                ({ default: Component }) => ({ Component })
                              ),
                          },
                          {
                            path: routes.appOAuthAuxiliaryReplica,
                            lazy: async () =>
                              import('./components/page-oauth-replica').then(
                                ({ default: Component }) => ({ Component })
                              ),
                          },
                          {
                            path: routes.appReplica,
                            lazy: async () =>
                              import('./components/page-replica').then(
                                ({ default: Component }) => ({ Component })
                              ),
                          },
                          {
                            path: routes.appSecret,
                            lazy: async () =>
                              import('./components/page-secret').then(
                                ({ default: Component }) => ({ Component })
                              ),
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
                              import(
                                './components/page-active-job-component'
                              ).then(({ default: Component }) => ({
                                Component,
                              })),
                          },
                          {
                            path: routes.appScheduledBatch,
                            lazy: async () =>
                              import('./components/page-scheduled-batch').then(
                                ({ default: Component }) => ({ Component })
                              ),
                          },
                          {
                            path: routes.appScheduledJob,
                            lazy: async () =>
                              import('./components/page-scheduled-job').then(
                                ({ default: Component }) => ({ Component })
                              ),
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
                    lazy: async () =>
                      import('./components/page-pipeline-jobs').then(
                        ({ default: Component }) => ({ Component })
                      ),
                  },
                  {
                    path: routes.appJob,
                    lazy: async () =>
                      import('./components/page-pipeline-job').then(
                        ({ default: Component }) => ({ Component })
                      ),
                  },
                  {
                    path: routes.appJobStep,
                    lazy: async () =>
                      import('./components/page-step').then(
                        ({ default: Component }) => ({ Component })
                      ),
                  },
                  {
                    path: routes.appJobNew,
                    lazy: async () =>
                      import('./components/page-pipeline-job-new').then(
                        ({ default: Component }) => ({ Component })
                      ),
                  },
                  {
                    // PIPELINERUNS
                    path: routes.appPipelineRuns,
                    children: [
                      {
                        path: routes.appPipelineRun,
                        lazy: async () =>
                          import('./components/page-pipeline-run').then(
                            ({ default: Component }) => ({ Component })
                          ),
                      },
                      {
                        path: routes.appPipelineRunTask,
                        lazy: async () =>
                          import('./components/page-pipeline-run-task').then(
                            ({ default: Component }) => ({ Component })
                          ),
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
