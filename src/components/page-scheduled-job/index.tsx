import { Accordion, Typography } from '@equinor/eds-core-react';
import { type FunctionComponent, useEffect, useMemo, useState } from 'react';
import { routes } from '../../routes';
import {
  type ReplicaSummary,
  type ScheduledJobSummary,
  useGetJobQuery,
  useJobLogQuery,
} from '../../store/radix-api';
import { withRouteParams } from '../../utils/router';
import { getEnvsUrl } from '../../utils/routing';
import { dataSorter, sortCompareDate } from '../../utils/sort-utils';
import {
  routeWithParams,
  smallScheduledBatchName,
  smallScheduledJobName,
} from '../../utils/string';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { EnvironmentVariableTable } from './environment-variable-table';
import { JobReplica } from './job-replica';
import { ScheduledJobOverview } from './scheduled-job-overview';

import './style.css';

function isJobSettled(status?: ScheduledJobSummary['status']): boolean {
  switch (status) {
    case 'Failed':
    case 'Stopped':
    case 'Succeeded':
      return true;
  }
  return false;
}

export const PageScheduledJob: FunctionComponent<{
  appName: string;
  jobComponentName: string;
  envName: string;
  scheduledBatchName?: string;
  scheduledJobName: string;
}> = ({
  appName,
  envName,
  jobComponentName,
  scheduledBatchName,
  scheduledJobName,
}) => {
  const { data: job, ...scheduledJobState } = useGetJobQuery(
    { appName, envName, jobComponentName, jobName: scheduledJobName },
    {
      skip: !appName || !envName || !jobComponentName || !scheduledJobName,
      pollingInterval: 5000,
    }
  );
  const [pollingInterval, setPollingInterval] = useState(5000);
  const pollLogsState = useJobLogQuery(
    { appName, envName, jobComponentName, scheduledJobName, lines: '1000' },
    {
      skip: !appName || !envName || !jobComponentName || !scheduledJobName,
      pollingInterval,
    }
  );
  useEffect(() => {
    setPollingInterval(isJobSettled(job?.status) ? 0 : 5000);
  }, [job?.status]);

  const jobReplicas = useMemo(() => {
    return dataSorter(job?.replicaList, [
      (a, b) => sortCompareDate(a.created, b.created, 'descending'),
    ]);
  }, [job?.replicaList]);

  return (
    <main className="grid grid--gap-medium">
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Environments', to: getEnvsUrl(appName) },
          {
            label: envName,
            to: routeWithParams(routes.appEnvironment, { appName, envName }),
          },
          {
            label: jobComponentName,
            to: routeWithParams(routes.appActiveJobComponent, {
              appName,
              envName,
              jobComponentName,
            }),
          },
          {
            label: scheduledBatchName
              ? `batch ${smallScheduledBatchName(scheduledBatchName)}`
              : '',
            to: scheduledBatchName
              ? routeWithParams(routes.appScheduledBatch, {
                  appName,
                  envName,
                  jobComponentName,
                  scheduledBatchName,
                })
              : '',
          },
          { label: `job ${smallScheduledJobName(scheduledJobName)}` },
        ]}
      />

      <AsyncResource asyncState={scheduledJobState}>
        {job && (
          <>
            <ScheduledJobOverview
              job={job}
              appName={appName}
              jobComponentName={jobComponentName}
            />
            {job.variables && (
              <EnvironmentVariableTable values={job.variables} />
            )}
            {jobReplicas?.length > 0 && (
              <>
                <div className="grid grid--gap-medium">
                  <JobReplica
                    header={`Job replica ${jobReplicas?.length > 1 ? ` #${jobReplicas.length} (see failed replicas below)` : ''}`}
                    appName={appName}
                    envName={envName}
                    jobComponentName={jobComponentName}
                    scheduledJobName={scheduledJobName}
                    replica={jobReplicas[0]}
                    logState={pollLogsState}
                    isExpanded={true}
                  />
                </div>
                {jobReplicas.length == 2 && (
                  <JobReplica
                    header={'Failed replica'}
                    appName={appName}
                    envName={envName}
                    jobComponentName={jobComponentName}
                    scheduledJobName={scheduledJobName}
                    replica={jobReplicas[1]}
                    isExpanded={false}
                  />
                )}
                {jobReplicas.length > 2 && (
                  <>
                    <Accordion
                      className="accordion elevated"
                      chevronPosition="right"
                    >
                      <Accordion.Item isExpanded={false}>
                        <Accordion.Header>
                          <Accordion.HeaderTitle>
                            <Typography variant="h4">
                              Failed replica
                              {`${jobReplicas.length > 2 ? 's' : ''}`}
                              {jobReplicas.length > 2
                                ? ` (${jobReplicas.length - 1})`
                                : ''}
                            </Typography>
                          </Accordion.HeaderTitle>
                        </Accordion.Header>
                        <Accordion.Panel>
                          {jobReplicas
                            .slice(1)
                            .map((replica: ReplicaSummary, index) => (
                              <JobReplica
                                key={index}
                                header={`Replica #${jobReplicas.length - index - 1}`}
                                appName={appName}
                                envName={envName}
                                jobComponentName={jobComponentName}
                                scheduledJobName={scheduledJobName}
                                replica={replica}
                                isExpanded={false}
                              />
                            ))}
                        </Accordion.Panel>
                      </Accordion.Item>
                    </Accordion>
                  </>
                )}
              </>
            )}
          </>
        )}
      </AsyncResource>
    </main>
  );
};
export default withRouteParams(PageScheduledJob);
