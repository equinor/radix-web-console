import { Response, Server } from 'miragejs';

import { PageScheduledJob } from '.';

import type { ScheduledJobSummary } from '../../store/radix-api';

const testData: Array<
  Parameters<typeof PageScheduledJob>[0] & { jobData: ScheduledJobSummary }
> = [
  {
    appName: 'succeeded-app',
    envName: 'succeeded-env',
    jobComponentName: 'succeeded-component',
    scheduledJobName: 'scd-job',
    jobData: {
      created: '2022-03-29T13:09:37.501Z',
      name: 'scd-job',
      status: 'Succeeded',
      started: '2022-03-29T13:10:52.269Z',
      ended: '2022-03-29T13:18:01.073Z',
      jobId: 'jobId',
      batchName: 'batchName',
      backoffLimit: 0,
      failedCount: 0,
      deploymentName: 'unknown-deployment',
    },
  },
  {
    appName: 'running-app',
    envName: 'running-env',
    jobComponentName: 'running-component',
    scheduledJobName: 'rng-job',
    jobData: {
      created: '2022-03-29T13:09:37.501Z',
      name: 'rng-job',
      status: 'Running',
      started: '2022-03-29T13:10:52.269Z',
      jobId: 'jobId',
      batchName: 'batchName',
      backoffLimit: 10,
      failedCount: 0,
      deploymentName: 'unknown-deployment',
    },
  },
  {
    appName: 'running-app',
    envName: 'running-env',
    jobComponentName: 'failed-component',
    scheduledJobName: 'fail-job',
    jobData: {
      name: 'fail-job',
      created: '',
      status: 'Failed',
      started: '2022-03-29T13:10:52.269Z',
      ended: '2022-03-29T13:12:01.073Z',
      jobId: 'jobId',
      batchName: 'batchName',
      message: 'some optional failure message',
      backoffLimit: 0,
      failedCount: 0,
      deploymentName: 'unknown-deployment',
    },
  },
];

// Mock API response
new Server({
  routes() {
    // Mock response for environment
    testData.forEach(({ scheduledJobName, jobData }) => {
      this.get(
        `/api/v1/applications/:appName/environments/:envName/jobcomponents/:jobComponentName/jobs/${scheduledJobName}`,
        () => jobData
      );
    });

    // Mock response for logs
    this.get(
      '/api/v1/applications/:appName/environments/:envName/jobcomponents/:jobComponentName/scheduledjobs/:scheduledJobName/logs',
      (_, { params: { scheduledJobName } }) =>
        scheduledJobName !== 'no-job'
          ? `fake log data for job ${scheduledJobName}`
          : new Response(404)
    );
  },
});

export default (
  <>
    {testData.map(
      ({ appName, envName, jobComponentName, scheduledJobName }, i) => (
        <div
          key={i}
          className="grid grid--gap-medium"
          style={{
            backgroundColor: 'var(--eds_ui_background__default)',
            marginBottom: 'var(--eds_spacing_x_large)',
            padding: 'var(--eds_spacing_medium)',
          }}
        >
          <PageScheduledJob
            {...{ appName, envName, jobComponentName, scheduledJobName }}
          />
        </div>
      )
    )}
  </>
);
