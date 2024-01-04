import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { DefaultAppAlias } from './default-app-alias';
import { DnsAliases } from './dns-aliases';
import { Alert } from '../alert';
import ApplicationCost from '../application-cost';
import { FutureApplicationCost } from '../application-future-cost';
import AsyncResource from '../async-resource/another-async-resource';
import { EnvironmentsSummary } from '../environments-summary';
import { JobsList } from '../jobs-list';
import { clusterBases } from '../../clusterBases';
import { useGetApplicationQuery } from '../../store/radix-api';
import { configVariables } from '../../utils/config';
import { connectRouteParams, routeParamLoader } from '../../utils/router';

const LATEST_JOBS_LIMIT = 5;

export const AppOverview: FunctionComponent<{ appName: string }> = ({
  appName,
}) => {
  const isPlayground: Readonly<boolean> =
    configVariables.RADIX_CLUSTER_BASE === clusterBases.playgroundWebConsole;

  const { data: application, ...state } = useGetApplicationQuery(
    { appName },
    { skip: !appName, pollingInterval: 15000 }
  );

  const { appAlias, dnsAliases, environments, jobs, registration } =
    application ?? {};

  return (
    <main className="grid grid--gap-medium">
      <AsyncResource asyncState={state}>
        {isPlayground && (
          <Alert type="warning">
            <Typography>
              Applications in Playground that has not had any deployments or
              been restarted in the last 7 days will be stopped. The application
              will be automatically deleted after another 21 days of inactivity.
            </Typography>
          </Alert>
        )}

        <div className="grid grid--gap-medium grid--overview-columns">
          <ApplicationCost appName={appName} />
          <FutureApplicationCost appName={appName} />
        </div>

        {appAlias && <DefaultAppAlias appName={appName} appAlias={appAlias} />}
        {dnsAliases && <DnsAliases appName={appName} dnsAliases={dnsAliases} />}
        {environments?.length > 0 && (
          <Typography variant="h4">Environments</Typography>
        )}
        <EnvironmentsSummary
          appName={appName}
          envs={environments}
          repository={registration?.repository}
        />

        {jobs?.length > 0 && (
          <Typography variant="h4">Latest pipeline jobs</Typography>
        )}
        <JobsList appName={appName} jobs={jobs} limit={LATEST_JOBS_LIMIT} />
      </AsyncResource>
    </main>
  );
};

AppOverview.propTypes = {
  appName: PropTypes.string.isRequired,
};

const Component = connectRouteParams(AppOverview);
export { Component, routeParamLoader as loader };

export default AppOverview;
