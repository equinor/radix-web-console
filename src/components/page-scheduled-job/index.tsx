import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { downloadLazyLogCb } from '../code/log-helper';
import { Replica } from '../replica';
import { routes } from '../../routes';
import {
  radixApi,
  ReplicaSummary,
  ScheduledJobSummary,
  useGetJobQuery,
  useJobLogQuery,
} from '../../store/radix-api';
import { withRouteParams } from '../../utils/router';
import { getEnvsUrl } from '../../utils/routing';
import { dataSorter, sortCompareDate } from '../../utils/sort-utils';
import { routeWithParams, smallScheduledJobName } from '../../utils/string';
import { ScheduledJobOverview } from './scheduled-job-overview';
import { Accordion, Typography } from '@equinor/eds-core-react';
import { logApi } from '../../store/log-api';

import './style.css';

function isJobSettled(status: ScheduledJobSummary['status']): boolean {
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
  scheduledJobName: string;
}> = ({ appName, envName, jobComponentName, scheduledJobName }) => {
  const [pollingInterval, setPollingInterval] = useState(5000);
  const pollLogsState = useJobLogQuery(
    { appName, envName, jobComponentName, scheduledJobName, lines: '1000' },
    {
      skip: !appName || !envName || !jobComponentName || !scheduledJobName,
      pollingInterval,
    }
  );
  const [getLog] = radixApi.endpoints.jobLog.useLazyQuery();
  const [getHistoryLog] = logApi.endpoints.getJobReplicaLog.useLazyQuery();

  const { data: job, ...scheduledJobState } = useGetJobQuery(
    { appName, envName, jobComponentName, jobName: scheduledJobName },
    {
      skip: !appName || !envName || !jobComponentName || !scheduledJobName,
      pollingInterval: 5000,
    }
  );

  const sortedReplicas = useMemo(() => {
    return dataSorter(job?.replicaList, [
      (a, b) => sortCompareDate(a.created, b.created, 'descending'),
    ]);
  }, [job?.replicaList]);

  useEffect(() => {
    setPollingInterval(isJobSettled(job?.status) ? 0 : 5000);
  }, [job?.status]);

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
          { label: smallScheduledJobName(scheduledJobName) },
        ]}
      />

      <AsyncResource asyncState={scheduledJobState}>
        {job && (
          <>
            <ScheduledJobOverview
              job={job}
              jobComponentName={jobComponentName}
            />
            {sortedReplicas?.length > 0 && (
              <>
                <div className="grid grid--gap-medium">
                  <Replica
                    key={sortedReplicas[0].name}
                    header={`Job replica ${sortedReplicas?.length > 1 ? ' #' + sortedReplicas.length : ''}`}
                    replica={sortedReplicas[0]}
                    logState={pollLogsState}
                    downloadCb={downloadLazyLogCb(
                      `${sortedReplicas[0].name}.txt`,
                      getLog,
                      {
                        appName,
                        envName,
                        jobComponentName,
                        scheduledJobName,
                        replicaName: sortedReplicas[0].name,
                        file: 'true',
                      },
                      false
                    )}
                    getHistoryLog={async () => {
                      return await getHistoryLog({
                        appName: appName,
                        envName: envName,
                        jobComponentName: jobComponentName,
                        jobName: scheduledJobName,
                        replicaName: sortedReplicas[0].name,
                        tail: 1000,
                      }).unwrap();
                    }}
                    downloadHistoryCb={downloadLazyLogCb(
                      `${sortedReplicas[0].name}.txt`,
                      getHistoryLog,
                      {
                        appName: appName,
                        envName: envName,
                        jobComponentName: jobComponentName,
                        jobName: scheduledJobName,
                        replicaName: sortedReplicas[0].name,
                        file: 'true',
                      },
                      false
                    )}
                  />
                </div>
                {sortedReplicas.length > 1 && (
                  <>
                    <Accordion
                      className="accordion elevated"
                      chevronPosition="right"
                    >
                      <Accordion.Item>
                        <Accordion.Header>
                          <Accordion.HeaderTitle>
                            <Typography variant="h4">
                              Previously failed replica
                              {`${sortedReplicas.length > 2 ? 's' : ''}`}
                            </Typography>
                          </Accordion.HeaderTitle>
                        </Accordion.Header>
                        <Accordion.Panel>
                          {sortedReplicas
                            .slice(1)
                            .map((replica: ReplicaSummary, index) => (
                              <div
                                className="grid grid--gap-medium"
                                key={index}
                              >
                                <>
                                  <Replica
                                    header={`Job replica #${sortedReplicas.length - index - 1}`}
                                    getLog={async () => {
                                      return await getLog({
                                        appName: appName,
                                        envName: envName,
                                        jobComponentName: jobComponentName,
                                        scheduledJobName: scheduledJobName,
                                        replicaName: replica.name,
                                        lines: '1000',
                                      }).unwrap();
                                    }}
                                    replica={replica}
                                    downloadCb={downloadLazyLogCb(
                                      `${replica.name}.txt`,
                                      getLog,
                                      {
                                        appName: appName,
                                        envName: envName,
                                        jobComponentName: jobComponentName,
                                        scheduledJobName: scheduledJobName,
                                        replicaName: replica.name,
                                        file: 'true',
                                      },
                                      false
                                    )}
                                    isCollapsibleLog={sortedReplicas.length > 1}
                                    isLogExpanded={
                                      index === sortedReplicas.length - 1
                                    }
                                    getHistoryLog={async () => {
                                      return await getHistoryLog({
                                        appName: appName,
                                        envName: envName,
                                        jobComponentName: jobComponentName,
                                        jobName: scheduledJobName,
                                        replicaName: replica.name,
                                        tail: 1000,
                                      }).unwrap();
                                    }}
                                    downloadHistoryCb={downloadLazyLogCb(
                                      `${replica.name}.txt`,
                                      getHistoryLog,
                                      {
                                        appName: appName,
                                        envName: envName,
                                        jobComponentName: jobComponentName,
                                        jobName: scheduledJobName,
                                        replicaName: replica.name,
                                        file: 'true',
                                      },
                                      false
                                    )}
                                  />
                                </>
                              </div>
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

PageScheduledJob.propTypes = {
  appName: PropTypes.string.isRequired,
  jobComponentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  scheduledJobName: PropTypes.string.isRequired,
};

export default withRouteParams(PageScheduledJob);
