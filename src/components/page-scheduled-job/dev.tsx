import { Response, Server } from 'miragejs';

import { PageScheduledJob, PageScheduledJobProps } from '.';

import { ProgressStatus } from '../../models/progress-status';
import { ScheduledJobSummaryModel } from '../../models/radix-api/deployments/scheduled-job-summary';

const testData: Array<
  PageScheduledJobProps & { jobData?: ScheduledJobSummaryModel }
> = [
  {
    appName: 'succeeded-app',
    envName: 'succeeded-env',
    jobComponentName: 'succeeded-component',
    scheduledJobName: 'scd-job',
    jobData: {
      created: new Date('2022-03-29T13:09:37.501Z'),
      name: 'scd-job',
      status: ProgressStatus.Succeeded,
      started: new Date('2022-03-29T13:10:52.269Z'),
      ended: new Date('2022-03-29T13:18:01.073Z'),
      jobId: 'jobId',
      batchName: 'batchName',
      backoffLimit: 0,
      failedCount: 0,
    },
  },
  {
    appName: 'running-app',
    envName: 'running-env',
    jobComponentName: 'running-component',
    scheduledJobName: 'rng-job',
    jobData: {
      created: new Date('2022-03-29T13:09:37.501Z'),
      name: 'rng-job',
      status: ProgressStatus.Running,
      started: new Date('2022-03-29T13:10:52.269Z'),
      jobId: 'jobId',
      batchName: 'batchName',
      backoffLimit: 10,
      failedCount: 0,
    },
  },
  {
    appName: 'running-app',
    envName: 'running-env',
    jobComponentName: 'failed-component',
    scheduledJobName: 'fail-job',
    jobData: {
      name: 'fail-job',
      created: new Date(),
      status: ProgressStatus.Failed,
      started: new Date('2022-03-29T13:10:52.269Z'),
      ended: new Date('2022-03-29T13:12:01.073Z'),
      jobId: 'jobId',
      batchName: 'batchName',
      message: 'some optional failure message',
      backoffLimit: 0,
      failedCount: 0,
    },
  },
  {
    appName: 'empty-app',
    envName: 'empty-env',
    jobComponentName: 'empty-component',
    scheduledJobName: 'no-job',
  },
];

// Mock API response
new Server({
  routes() {
    // Mock response for environment
    testData.forEach((x) => {
      this.get(
        `/api/v1/applications/:appName/environments/:envName/jobcomponents/:jobComponentName/jobs/${x.scheduledJobName}`,
        () => x.jobData
      );
    });

    // Mock response for logs
    this.get(
      '/api/v1/applications/:appName/environments/:envName/jobcomponents/:jobComponentName/scheduledjobs/:scheduledJobName/logs',
      (_, request) =>
        request.params.scheduledJobName !== 'no-job'
          ? `fake log data for job ${request.params.scheduledJobName}`
          : new Response(404)
    );
  },
});

export default (
  <>
    {testData.map((p, i) => (
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
          appName={p.envName}
          envName={p.envName}
          jobComponentName={p.jobComponentName}
          scheduledJobName={p.scheduledJobName}
        />
      </div>
    ))}
  </>
);
