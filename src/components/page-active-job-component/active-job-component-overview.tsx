import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';

import { JobComponentVulnerabilityDetails } from './job-component-vulnerability-details';
import { Overview } from './overview';

import { Button, CircularProgress } from '@equinor/eds-core-react';
import { routes } from '../../routes';
import { pollingInterval } from '../../store/defaults';
import {
  useGetBatchesQuery,
  useGetEnvironmentQuery,
  useGetJobsQuery,
  useRestartComponentMutation,
} from '../../store/radix-api';
import { getEnvsUrl } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { ScheduledBatchList } from '../component/scheduled-job/scheduled-batch-list';
import { ScheduledJobList } from '../component/scheduled-job/scheduled-job-list';
import { ActiveComponentSecrets } from '../component/secrets/active-component-secrets';
import { EnvironmentVariables } from '../environment-variables';
import { handlePromiseWithToast } from '../global-top-nav/styled-toaster';
import { ComponentReplicaList } from '../page-active-component/component-replica-list';

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
  const [restartTrigger, restartState] = useRestartComponentMutation();
  const isStopped = component?.status === 'Stopped';
  const restartInProgress =
    restartState.isLoading ||
    component?.status === 'Reconciling' ||
    component?.status === 'Restarting';

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
            <div className="grid grid--gap-small">
              <div className="grid grid--gap-small grid--auto-columns">
                <Button
                  onClick={() =>
                    handlePromiseWithToast(
                      restartTrigger({
                        appName,
                        envName,
                        componentName: jobComponentName,
                      }).unwrap,
                      'Restarting component',
                      'Failed to restart component'
                    )
                  }
                  disabled={restartState.isLoading || isStopped}
                  variant="outlined"
                >
                  Restart
                </Button>
                {restartInProgress && <CircularProgress size={32} />}
              </div>
            </div>
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
                  fetchJobs={refetchJobs}
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
