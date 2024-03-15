import { Typography } from '@equinor/eds-core-react';
import { isNil } from 'lodash';
import * as PropTypes from 'prop-types';
import { FunctionComponent, useEffect, useMemo, useState } from 'react';

import { JobReplicaLogAccordion } from './replica-log-accordion';

import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { Code } from '../code';
import { downloadLazyLogCb } from '../code/log-helper';
import { Replica } from '../replica';
import { ResourceRequirements } from '../resource-requirements';
import { ProgressStatusBadge, RadixJobConditionBadge } from '../status-badges';
import { Duration } from '../time/duration';
import { routes } from '../../routes';
import {
  ScheduledJobSummary,
  radixApi,
  useGetJobQuery,
  useJobLogQuery,
} from '../../store/radix-api';
import { withRouteParams } from '../../utils/router';
import { getEnvsUrl } from '../../utils/routing';
import { dataSorter, sortCompareDate } from '../../utils/sort-utils';
import { routeWithParams, smallScheduledJobName } from '../../utils/string';

import './style.css';
import { ScheduledJobOverview } from './scheduled-job-overview';
import { ScheduleJobDuration } from './duration';

const ScheduledJobState: FunctionComponent<
  Pick<ScheduledJobSummary, 'message' | 'status' | 'replicaList'>
> = ({ message, status }) => (
  <>
    {status || <RadixJobConditionBadge status={status} />}
    {message && <Code>{message}</Code>}
  </>
);

function isJobSettled(status: ScheduledJobSummary['status']): boolean {
  switch (status) {
    case 'Waiting':
    case 'Running':
    case 'Stopping':
      return false;

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
            <Typography variant="h4" as="span">
              Overview
            </Typography>
            <section className="grid grid--gap-medium overview">
              <div className="grid grid--gap-medium grid--overview-columns">
                <div className="grid grid--gap-medium">
                  <Typography>
                    Job <strong>{jobComponentName}</strong>
                  </Typography>
                  <Typography>
                    Name{' '}
                    <strong>{smallScheduledJobName(scheduledJobName)}</strong>
                  </Typography>
                  {job.jobId && (
                    <Typography>
                      Job ID <strong>{job.jobId}</strong>
                    </Typography>
                  )}
                  <Typography>
                    Backoff Limit <strong>{job.backoffLimit}</strong>
                  </Typography>
                  <Typography>
                    Time Limit{' '}
                    <strong>
                      {!isNil(job.timeLimitSeconds) ? (
                        <Duration start={0} end={job.timeLimitSeconds * 1000} />
                      ) : (
                        'Not set'
                      )}
                    </strong>
                  </Typography>
                </div>
                <div className="grid grid--gap-medium">
                  <ScheduleJobDuration job={job} />
                </div>
                <div className="grid grid--gap-medium">
                  <ResourceRequirements resources={job.resources} />
                </div>
              </div>
              <ScheduledJobState status={job.status} message={job.message} />
            </section>
            {sortedReplicas?.length > 0 ? (
              sortedReplicas.map((replica, index) => (
                <div className="grid grid--gap-medium" key={index}>
                  <Replica
                    key={replica.name}
                    header={`Job pod #${index + 1}`}
                    logState={pollLogsState}
                    replica={replica}
                    downloadCb={downloadLazyLogCb(
                      `${replica.name}.txt`,
                      getLog,
                      {
                        appName,
                        envName,
                        jobComponentName,
                        scheduledJobName,
                        file: 'true',
                      },
                      false
                    )}
                    isCollapsibleLog={sortedReplicas.length > 1}
                    isLogExpanded={index === sortedReplicas.length - 1}
                    status={<ProgressStatusBadge status={job.status} />}
                  />
                </div>
              ))
            ) : (
              <ScheduledJobOverview
                job={job}
                jobComponentName={jobComponentName}
              />
            )}

            {(job.failedCount > 0 || pollLogsState.isError) && (
              <JobReplicaLogAccordion
                title="Job Logs History"
                appName={appName}
                envName={envName}
                jobComponentName={jobComponentName}
                jobName={scheduledJobName}
                isExpanded={true}
                start={job.started}
                end={job.ended}
              />
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
