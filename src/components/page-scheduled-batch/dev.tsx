import { Response, Server } from 'miragejs';

import { PageScheduledBatch, PageScheduledBatchProps } from './index';

import { ProgressStatus } from '../../models/progress-status';
import { ScheduledBatchSummaryModel } from '../../models/radix-api/deployments/scheduled-batch-summary';

const testData: Array<
  PageScheduledBatchProps & { batchData?: ScheduledBatchSummaryModel }
> = [
  {
    appName: 'succeeded-app',
    envName: 'succeeded-env',
    jobComponentName: 'succeeded-component',
    scheduledBatchName: 'scd-btch',
    batchData: {
      created: new Date('2022-03-29T13:09:37.501Z'),
      name: 'batchName',
      status: ProgressStatus.Succeeded,
      started: new Date('2022-03-29T13:10:52.269Z'),
      ended: new Date('2022-03-29T13:18:34.623Z'),
      totalJobCount: 2,
      jobList: [
        {
          created: new Date('2022-03-29T13:09:37.501Z'),
          name: 'scd-job-1',
          status: ProgressStatus.Succeeded,
          started: new Date('2022-03-29T13:10:52.354Z'),
          ended: new Date('2022-03-29T13:18:01.073Z'),
          jobId: 'job-id-1',
          batchName: 'batchName',
          backoffLimit: 0,
          failedCount: 0,
        },
        {
          created: new Date('2022-03-29T13:09:37.608Z'),
          name: 'scd-job-2',
          status: ProgressStatus.Succeeded,
          started: new Date('2022-03-29T13:18:02.894Z'),
          ended: new Date('2022-03-29T13:18:33.073Z'),
          jobId: 'job-id-2',
          batchName: 'batchName',
          backoffLimit: 0,
          failedCount: 0,
        },
      ],
    },
  },
  {
    appName: 'running-app',
    envName: 'running-env',
    jobComponentName: 'running-component',
    scheduledBatchName: 'rng-btch',
    batchData: {
      created: new Date('2022-03-29T13:09:37.501Z'),
      name: 'batchName',
      status: ProgressStatus.Running,
      started: new Date('2022-03-29T13:10:52.269Z'),
      totalJobCount: 2,
      jobList: [
        {
          created: new Date('2022-03-29T13:09:37.501Z'),
          name: 'rng-job-1',
          status: ProgressStatus.Succeeded,
          started: new Date('2022-03-29T13:10:52.354Z'),
          ended: new Date('2022-03-29T13:18:01.073Z'),
          jobId: 'job-id-1',
          batchName: 'batchName',
          backoffLimit: 0,
          failedCount: 0,
        },
        {
          created: new Date('2022-03-29T13:09:37.608Z'),
          name: 'rng-job-2',
          status: ProgressStatus.Running,
          started: new Date('2022-03-29T13:18:02.894Z'),
          jobId: 'job-id-2',
          batchName: 'batchName',
          backoffLimit: 0,
          failedCount: 0,
        },
      ],
    },
  },
  {
    appName: 'running-app',
    envName: 'running-env',
    jobComponentName: 'failed-component',
    scheduledBatchName: 'fail-btch',
    batchData: {
      created: new Date('2022-03-29T13:09:37.501Z'),
      name: 'batchName',
      status: ProgressStatus.Failed,
      started: new Date('2022-03-29T13:10:52.269Z'),
      ended: new Date('2022-03-29T13:18:34.623Z'),
      totalJobCount: 2,
      message: 'some optional failure message',
      jobList: [
        {
          created: new Date('2022-03-29T13:09:37.501Z'),
          name: 'fail-job-1',
          status: ProgressStatus.Succeeded,
          started: new Date('2022-03-29T13:10:52.354Z'),
          ended: new Date('2022-03-29T13:18:01.073Z'),
          jobId: 'job-id-1',
          batchName: 'batchName',
          backoffLimit: 0,
          failedCount: 0,
        },
        {
          created: new Date('2022-03-29T13:09:37.608Z'),
          name: 'fail-job-2',
          status: ProgressStatus.Failed,
          started: new Date('2022-03-29T13:18:02.894Z'),
          ended: new Date('2022-03-29T13:18:33.073Z'),
          jobId: 'job-id-2',
          batchName: 'batchName',
          backoffLimit: 0,
          failedCount: 0,
        },
      ],
    },
  },
  {
    appName: 'empty-app',
    envName: 'empty-env',
    jobComponentName: 'empty-component',
    scheduledBatchName: 'no-btch',
  },
];

// Mock API response
new Server({
  routes() {
    // Mock response for environment
    testData.forEach((x) => {
      this.get(
        `/api/v1/applications/:appName/environments/:envName/jobcomponents/:jobComponentName/batches/${x.scheduledBatchName}`,
        () => x.batchData
      );
    });

    // Mock response for logs
    this.get(
      '/api/v1/applications/:appName/environments/:envName/jobcomponents/:jobComponentName/scheduledjobs/:scheduledBatchName/logs',
      (_, request) =>
        request.params.scheduledBatchName !== 'no-job'
          ? `fake log data for batch ${request.params.scheduledBatchName}`
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
        <PageScheduledBatch
          appName={p.envName}
          envName={p.envName}
          jobComponentName={p.jobComponentName}
          scheduledBatchName={p.scheduledBatchName}
        />
      </div>
    ))}
  </>
);
