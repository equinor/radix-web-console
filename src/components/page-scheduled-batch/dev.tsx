import { Response, Server } from 'miragejs'
import type { ScheduledBatchSummary } from '../../store/radix-api'
import { PageScheduledBatch } from './index'

const testData: Array<
  Parameters<typeof PageScheduledBatch>[0] & {
    batchData: ScheduledBatchSummary
  }
> = [
  {
    appName: 'succeeded-app',
    envName: 'succeeded-env',
    jobComponentName: 'succeeded-component',
    scheduledBatchName: 'scd-btch',
    batchData: {
      created: '2022-03-29T13:09:37.501Z',
      name: 'batchName',
      status: 'Succeeded',
      deploymentName: 'richard_did_it',
      started: '2022-03-29T13:10:52.269Z',
      ended: '2022-03-29T13:18:34.623Z',
      totalJobCount: 2,
      jobList: [
        {
          created: '2022-03-29T13:09:37.501Z',
          name: 'scd-job-1',
          status: 'Succeeded',
          started: '2022-03-29T13:10:52.354Z',
          ended: '2022-03-29T13:18:01.073Z',
          jobId: 'job-id-1',
          batchName: 'batchName',
          backoffLimit: 0,
          failedCount: 0,
          deploymentName: '',
        },
        {
          created: '2022-03-29T13:09:37.608Z',
          name: 'scd-job-2',
          status: 'Succeeded',
          started: '2022-03-29T13:18:02.894Z',
          ended: '2022-03-29T13:18:33.073Z',
          jobId: 'job-id-2',
          batchName: 'batchName',
          backoffLimit: 0,
          failedCount: 0,
          deploymentName: '',
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
      created: '2022-03-29T13:09:37.501Z',
      name: 'batchName',
      status: 'Running',
      deploymentName: 'richard_did_it',
      started: '2022-03-29T13:10:52.269Z',
      totalJobCount: 2,
      jobList: [
        {
          created: '2022-03-29T13:09:37.501Z',
          name: 'rng-job-1',
          status: 'Succeeded',
          started: '2022-03-29T13:10:52.354Z',
          ended: '2022-03-29T13:18:01.073Z',
          jobId: 'job-id-1',
          batchName: 'batchName',
          backoffLimit: 0,
          failedCount: 0,
          deploymentName: '',
        },
        {
          created: '2022-03-29T13:09:37.608Z',
          name: 'rng-job-2',
          status: 'Running',
          started: '2022-03-29T13:18:02.894Z',
          jobId: 'job-id-2',
          batchName: 'batchName',
          backoffLimit: 0,
          failedCount: 0,
          deploymentName: '',
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
      created: '2022-03-29T13:09:37.501Z',
      name: 'batchName',
      status: 'Failed',
      deploymentName: 'richard_did_it',
      started: '2022-03-29T13:10:52.269Z',
      ended: '2022-03-29T13:18:34.623Z',
      totalJobCount: 2,
      jobList: [
        {
          created: '2022-03-29T13:09:37.501Z',
          name: 'fail-job-1',
          status: 'Succeeded',
          started: '2022-03-29T13:10:52.354Z',
          ended: '2022-03-29T13:18:01.073Z',
          jobId: 'job-id-1',
          batchName: 'batchName',
          backoffLimit: 0,
          failedCount: 0,
          deploymentName: '',
        },
        {
          created: '2022-03-29T13:09:37.608Z',
          name: 'fail-job-2',
          status: 'Failed',
          started: '2022-03-29T13:18:02.894Z',
          ended: '2022-03-29T13:18:33.073Z',
          jobId: 'job-id-2',
          batchName: 'batchName',
          backoffLimit: 0,
          failedCount: 0,
          deploymentName: '',
        },
      ],
    },
  },
]

// Mock API response
new Server({
  routes() {
    // Mock response for environment
    testData.forEach(({ scheduledBatchName, batchData }) => {
      this.get(
        `/api/v1/applications/:appName/environments/:envName/jobcomponents/:jobComponentName/batches/${scheduledBatchName}`,
        () => batchData
      )
    })

    // Mock response for logs
    this.get(
      '/api/v1/applications/:appName/environments/:envName/jobcomponents/:jobComponentName/scheduledjobs/:scheduledBatchName/logs',
      (_, { params: { scheduledBatchName } }) =>
        scheduledBatchName !== 'no-job' ? `fake log data for batch ${scheduledBatchName}` : new Response(404)
    )
  },
})

export default (
  <>
    {testData.map(({ appName, envName, jobComponentName, scheduledBatchName }, i) => (
      <div
        key={i}
        className="grid grid--gap-medium"
        style={{
          backgroundColor: 'var(--eds_ui_background__default)',
          marginBottom: 'var(--eds_spacing_x_large)',
          padding: 'var(--eds_spacing_medium)',
        }}
      >
        <PageScheduledBatch {...{ appName, envName, jobComponentName, scheduledBatchName }} />
      </div>
    ))}
  </>
)
