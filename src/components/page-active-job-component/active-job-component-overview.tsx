import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { Overview } from './overview';
import { JobComponentVulnerabilityDetails } from './job-component-vulnerability-details';

import AsyncResource from '../async-resource/another-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { ScheduledBatchList } from '../component/scheduled-job/scheduled-batch-list';
import { ScheduledJobList } from '../component/scheduled-job/scheduled-job-list';
import { ActiveComponentSecrets } from '../component/secrets/active-component-secrets';
import { Toolbar } from '../component/toolbar';
import { EnvironmentVariables } from '../environment-variables';
import { ComponentReplicaList } from '../page-active-component/component-replica-list';
import { routes } from '../../routes';
import {
  useGetBatchesQuery,
  useGetEnvironmentQuery,
  useGetJobsQuery,
} from '../../store/radix-api';
import { pollingInterval } from '../../store/defaults';
import { getEnvsUrl } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

export const ActiveJobComponentOverview: FunctionComponent<{
  appName: string;
  envName: string;
  jobComponentName: string;
}> = ({ appName, envName, jobComponentName }) => {
  const {
    data: environment,
    refetch,
    ...envState
  } = useGetEnvironmentQuery(
    { appName, envName },
    { skip: !appName || !envName, pollingInterval }
  );
  const { data: scheduledJobs, refetch: refetchJobs } = useGetJobsQuery(
    { appName, envName, jobComponentName },
    { skip: !appName || !envName || !jobComponentName, pollingInterval }
  );
  const { data: scheduledBatches, refetch: refetchBatches } =
    useGetBatchesQuery(
      { appName, envName, jobComponentName },
      {
        skip: !appName || !envName || !jobComponentName,
        pollingInterval,
      }
    );

  const deployment = environment?.activeDeployment;
  const component = deployment?.components?.find(
    ({ name }) => name === jobComponentName
  );

  return (
    <>
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Environments', to: getEnvsUrl(appName) },
          {
            label: envName,
            to: routeWithParams(routes.appEnvironment, { appName, envName }),
          },
          { label: jobComponentName },
        ]}
      />

      <AsyncResource asyncState={envState}>
        {component && (
          <>
            <Toolbar
              appName={appName}
              envName={envName}
              component={component}
              refetch={refetch}
            />
            <Overview component={component} deployment={deployment} />

            <div className="grid grid--gap-large">
              {scheduledJobs && (
                <ScheduledJobList
                  appName={appName}
                  envName={envName}
                  jobComponentName={jobComponentName}
                  scheduledJobList={scheduledJobs}
                  totalJobCount={0}
                  isDeletable
                  fethcJobs={refetchJobs}
                />
              )}

              {scheduledBatches && (
                <ScheduledBatchList
                  appName={appName}
                  envName={envName}
                  jobComponentName={jobComponentName}
                  scheduledBatchList={scheduledBatches}
                  fetchBatches={refetchBatches}
                />
              )}

              <ComponentReplicaList
                title={'Job manager'}
                appName={appName}
                envName={envName}
                componentName={jobComponentName}
                replicaList={component.replicaList}
              />

              <JobComponentVulnerabilityDetails
                appName={appName}
                envName={envName}
                componentName={jobComponentName}
              />

              <ActiveComponentSecrets
                appName={appName}
                componentName={jobComponentName}
                envName={envName}
                secretNames={component.secrets}
              />

              <EnvironmentVariables
                appName={appName}
                envName={envName}
                componentName={jobComponentName}
                componentType={component.type}
                hideRadixVars
              />
            </div>
          </>
        )}
      </AsyncResource>
    </>
  );
};

ActiveJobComponentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
};
