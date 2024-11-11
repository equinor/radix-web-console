import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { github, trending_up } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';
import { Link } from 'react-router-dom';

import { ComponentList } from './component-list';
import EnvironmentAlerting from './environment-alerting';
import EnvironmentToolbar from './environment-toolbar';

import { routes } from '../../routes';
import { pollingInterval } from '../../store/defaults';
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
import { Alert } from '../alert';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DeploymentsList } from '../deployments-list';
import { EventsList } from '../events-list';
import { GitTagLinks } from '../git-tags/git-tag-links';
import { RelativeToNow } from '../time/relative-to-now';

import './style.css';
import useLocalStorage from '../../effects/use-local-storage';
import { DefaultAppAlias } from '../component/default-app-alias';
import { DNSAliases } from '../component/dns-aliases';
import { GitCommitTags } from '../component/git-commit-tags';

export const EnvironmentOverview: FunctionComponent<{
  appName: string;
  envName: string;
}> = ({ appName, envName }) => {
  const { data: application } = useGetApplicationQuery(
    { appName },
    { skip: !appName, pollingInterval }
  );
  const {
    data: environment,
    refetch: refetchEnv,
    ...envState
  } = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval }
  );
  const [isEventListExpanded, setIsEventListExpanded] =
    useLocalStorage<boolean>('environmentEventListExpanded', true);
  const { data: events } = useGetEnvironmentEventsQuery(
    { appName, envName },
    { skip: !appName || !envName || !isEventListExpanded, pollingInterval }
  );
  const [deleteEnvTrigger, deleteEnvState] =
    radixApi.endpoints.deleteEnvironment.useMutation();
  const { appAlias, dnsAliases, dnsExternalAliases } = application ?? {};
  const envDNSAliases = dnsAliases
    ? dnsAliases.filter((alias) => alias.environmentName == envName)
    : [];
  const envDNSExternalAliases = dnsExternalAliases
    ? dnsExternalAliases.filter((alias) => alias.environmentName == envName)
    : [];

  const isLoaded = application && environment;
  const isOrphan = environment?.status === 'Orphan';
  const deployment = isLoaded && environment.activeDeployment;
  const skippedDeployComponents =
    deployment?.components?.filter((c) => c.skipDeployment) ?? false;

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
                refetch={refetchEnv}
              />
              <Typography variant="h4">Overview</Typography>
              <div className="grid grid--gap-medium grid--overview-columns">
                <div className="grid grid--gap-medium">
                  <Typography>
                    Environment <strong>{envName}</strong>
                  </Typography>
                  {environment.branchMapping && environment.activeDeployment ? (
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
                  {skippedDeployComponents && (
                    <>
                      {skippedDeployComponents.map((component) => (
                        <Typography key={component.name}>
                          <strong>{component.name}</strong>
                          <>
                            {' keeps deployment '}
                            <GitCommitTags
                              commitID={component.commitID}
                              // gitTags={component.gitTags}
                              repository={deployment.repository}
                            />
                          </>
                        </Typography>
                      ))}
                    </>
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
            {appAlias?.environmentName == envName && (
              <DefaultAppAlias appName={appName} appAlias={appAlias} />
            )}
            {envDNSAliases?.length > 0 && (
              <DNSAliases
                appName={appName}
                dnsAliases={envDNSAliases}
                title={'DNS aliases'}
              />
            )}
            {envDNSExternalAliases?.length > 0 && (
              <DNSAliases
                appName={appName}
                dnsAliases={envDNSExternalAliases}
                title={'DNS external aliases'}
              />
            )}
            {deployment && (
              <ComponentList
                appName={appName}
                environment={environment}
                components={deployment.components ?? []}
              />
            )}
            <EventsList
              isExpanded={isEventListExpanded}
              onExpanded={setIsEventListExpanded}
              events={dataSorter(events ?? [], [
                ({ lastTimestamp: x }, { lastTimestamp: y }) =>
                  sortCompareDate(x, y, 'descending'),
              ])}
            />
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
