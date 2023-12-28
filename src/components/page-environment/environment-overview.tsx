import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { github, trending_up } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { ComponentList } from './component-list';
import EnvironmentAlerting from './environment-alerting';
import EnvironmentToolbar from './environment-toolbar';

import { Alert } from '../alert';
import AsyncResource from '../async-resource/another-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DeploymentsList } from '../deployments-list';
import { EventsList } from '../events-list';
import { GitTagLinks } from '../git-tags/git-tag-links';
import { RelativeToNow } from '../time/relative-to-now';
import { routes } from '../../routes';
import {
  radixApi,
  useGetApplicationQuery,
  useGetEnvironmentEventsQuery,
  useGetEnvironmentQuery,
} from '../../store/radix-api';
import { getFetchErrorMessage } from '../../store/utils';
import { configVariables } from '../../utils/config';
import {
  getAppDeploymentUrl,
  getAppUrl,
  getEnvsUrl,
} from '../../utils/routing';
import { dataSorter, sortCompareDate } from '../../utils/sort-utils';
import {
  linkToGitHubBranch,
  linkToGitHubCommit,
  routeWithParams,
  smallDeploymentName,
  smallGithubCommitHash,
} from '../../utils/string';

import './style.css';

export const EnvironmentOverview: FunctionComponent<{
  appName: string;
  envName: string;
}> = ({ appName, envName }) => {
  const { data: application } = useGetApplicationQuery(
    { appName },
    { skip: !appName, pollingInterval: 15000 }
  );
  const {
    data: environment,
    refetch: refetchEnv,
    ...envState
  } = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval: 15000 }
  );
  const { data: events } = useGetEnvironmentEventsQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval: 15000 }
  );
  const [deleteEnvTrigger, deleteEnvState] =
    radixApi.endpoints.deleteEnvironment.useMutation();

  const isLoaded = application && environment;
  const isOrphan = environment?.status === 'Orphan';
  const deployment = isLoaded && environment.activeDeployment;

  return (
    <>
      <Breadcrumb
        links={[
          { label: appName, to: getAppUrl(appName) },
          { label: 'Environments', to: getEnvsUrl(appName) },
          { label: envName },
        ]}
      />

      {(deleteEnvState.isSuccess || deleteEnvState.isError || isOrphan) && (
        <div className="grid grid--gap-medium">
          {deleteEnvState.isSuccess && (
            <Alert>
              Environment removal has started but it may take a while to be
              completely removed
            </Alert>
          )}
          {deleteEnvState.isError && (
            <Alert type="warning">
              Some unexpected error occurred:{' '}
              {getFetchErrorMessage(deleteEnvState.error)}
            </Alert>
          )}
          {isOrphan && (
            <Alert
              type="warning"
              actions={
                <Button
                  disabled={
                    deleteEnvState.isLoading || deleteEnvState.isSuccess
                  }
                  onClick={async () => {
                    if (
                      window.confirm(
                        `Confirm deleting '${envName}' environment.`
                      )
                    ) {
                      await deleteEnvTrigger({ appName, envName });
                    }
                  }}
                >
                  Delete environment
                </Button>
              }
            >
              <Typography>
                This environment is orphaned; it is not defined in{' '}
                <strong>radixconfig.yaml</strong>
              </Typography>
            </Alert>
          )}
        </div>
      )}

      <AsyncResource asyncState={envState}>
        {isLoaded && (
          <>
            <section className="grid grid--gap-medium">
              <EnvironmentToolbar
                appName={appName}
                environment={environment}
                startEnabled
                stopEnabled
                fethcEnvironment={refetchEnv}
              />
              <Typography variant="h4">Overview</Typography>
              <div className="grid grid--gap-medium grid--overview-columns">
                <div className="grid grid--gap-medium">
                  <Typography>
                    Environment <strong>{envName}</strong>
                  </Typography>
                  {environment.branchMapping ? (
                    <Typography>
                      Built and deployed from{' '}
                      <Typography
                        link
                        href={linkToGitHubBranch(
                          application.registration.repository,
                          environment.branchMapping
                        )}
                        token={{ textDecoration: 'none' }}
                      >
                        {environment.branchMapping} branch{' '}
                        <Icon data={github} size={24} />
                      </Typography>
                    </Typography>
                  ) : (
                    <Typography>Not automatically deployed</Typography>
                  )}
                  {deployment?.gitCommitHash && (
                    <Typography>
                      Built from commit{' '}
                      <Typography
                        link
                        href={linkToGitHubCommit(
                          application.registration.repository,
                          deployment.gitCommitHash
                        )}
                        token={{ textDecoration: 'none' }}
                      >
                        {smallGithubCommitHash(deployment.gitCommitHash)}{' '}
                        <Icon data={github} size={24} />
                      </Typography>
                    </Typography>
                  )}
                  <div>
                    <EnvironmentAlerting appName={appName} envName={envName} />
                  </div>
                </div>
                <div className="grid grid--gap-medium">
                  {deployment ? (
                    <>
                      <Typography>
                        Deployment active since{' '}
                        <strong>
                          <RelativeToNow
                            time={new Date(deployment.activeFrom)}
                          />
                        </strong>
                      </Typography>
                      <Typography>
                        Active deployment{' '}
                        <Typography
                          as={Link}
                          to={getAppDeploymentUrl(appName, deployment.name)}
                          link
                        >
                          {smallDeploymentName(deployment.name)}
                        </Typography>{' '}
                        {configVariables.FLAGS.enablePromotionPipeline && (
                          <Button
                            variant="ghost"
                            as={Link}
                            to={routeWithParams(
                              routes.appJobNew,
                              { appName: appName },
                              {
                                pipeline: 'promote',
                                deploymentName: deployment.name,
                                fromEnvironment: deployment.environment,
                              }
                            )}
                          >
                            Promote <Icon data={trending_up} />
                          </Button>
                        )}
                      </Typography>
                      {deployment.gitTags && (
                        <div className="environment-overview__tags grid grid--gap-x-small grid--auto-columns">
                          <Typography>Tags</Typography>
                          <GitTagLinks
                            gitTags={deployment.gitTags}
                            repository={application.registration.repository}
                          />
                          <Icon data={github} size={24} />
                        </div>
                      )}
                    </>
                  ) : (
                    <Typography>No active deployment</Typography>
                  )}
                </div>
              </div>
            </section>

            {deployment && (
              <ComponentList
                appName={appName}
                environment={environment}
                components={deployment.components}
              />
            )}

            {events && (
              <EventsList
                events={dataSorter(events, [
                  ({ lastTimestamp: x }, { lastTimestamp: y }) =>
                    sortCompareDate(x, y, 'descending'),
                ])}
              />
            )}

            {environment.deployments && (
              <div className="grid grid--gap-medium">
                <Typography variant="h4">Previous deployments</Typography>
                <DeploymentsList
                  inEnv
                  appName={appName}
                  deployments={environment.deployments.filter(
                    ({ activeTo }) => !!activeTo
                  )}
                />
              </div>
            )}
          </>
        )}
      </AsyncResource>
    </>
  );
};

EnvironmentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
};

export default EnvironmentOverview;
