import { Typography } from '@equinor/eds-core-react';

import { clusterBases } from '../../clusterBases';
import { pollingInterval } from '../../store/defaults';
import { useGetApplicationQuery } from '../../store/radix-api';
import { configVariables } from '../../utils/config';
import { withRouteParams } from '../../utils/router';
import { Alert } from '../alert';
import ApplicationCost from '../application-cost';
import { FutureApplicationCost } from '../application-future-cost';
import AsyncResource from '../async-resource/async-resource';
import { DefaultAppAlias } from '../component/default-app-alias';
import { DNSAliases } from '../component/dns-aliases';
import { EnvironmentsSummary } from '../environments-summary';
import { JobsList } from '../jobs-list';
import { UsedResources } from '../resources';

const LATEST_JOBS_LIMIT = 5;

export function AppOverview({ appName }: { appName: string }) {
  const isPlayground: Readonly<boolean> =
    configVariables.RADIX_CLUSTER_BASE === clusterBases.playgroundWebConsole;

  const { data: application, ...state } = useGetApplicationQuery(
    { appName },
    { skip: !appName, pollingInterval }
  );

  const { appAlias, dnsAliases, dnsExternalAliases, jobs } = application ?? {};

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
          <UsedResources appName={appName} />
        </div>

        {appAlias && <DefaultAppAlias appName={appName} appAlias={appAlias} />}
        {dnsAliases && (
          <DNSAliases
            appName={appName}
            dnsAliases={dnsAliases}
            title={'DNS aliases'}
          />
        )}
        {DNSAliases && (
          <DNSAliases
            appName={appName}
            dnsAliases={dnsExternalAliases}
            title={'DNS external aliases'}
          />
        )}
        <span className="grid grid--gap-small">
          <Typography variant="h4">Environments</Typography>
          {application && <EnvironmentsSummary application={application} />}
        </span>
        <JobsList appName={appName} jobs={jobs} limit={LATEST_JOBS_LIMIT} />
      </AsyncResource>
    </main>
  );
}
export default withRouteParams(AppOverview);
