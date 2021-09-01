import { Response, Server } from 'miragejs';

import PageScheduledJob from './index';

const props = [
  {
    appName: 'succeeded-app',
    envName: 'succeeded-env',
    jobComponentName: 'succeeded-component',
    scheduledJobList: [
      {
        name: 'scd-job',
        replicaList: [
          {
            name: 'scd-replica',
          },
        ],
      },
    ],
  },
  {
    appName: 'running-app',
    envName: 'running-env',
    jobComponentName: 'running-component',
    scheduledJobList: [
      {
        name: 'rng-job',
        replicaList: [
          {
            name: 'rng-replica',
          },
        ],
      },
    ],
  },
  {
    appName: 'empty-app',
    envName: 'empty-env',
    jobComponentName: 'empty-component',
    scheduledJobList: [
      {
        name: 'no-job',
        replicaList: [
          {
            name: 'no-replica',
          },
        ],
      },
    ],
  },
];

// Mock API response
new Server({
  // status: 'Waiting', 'Queued', 'Running', 'Succeeded', 'Stopping', 'Stopped', 'Failed'
  routes() {
    // Mock response for environment
    this.get('/api/v1/applications/:appName/environments/:envName', () => ({
      activeDeployment: {
        components: [
          {
            name: 'succeeded-component',
            scheduledJobList: [
              {
                name: 'scd-job',
                status: 'Succeeded',
                created: new Date('2021-07-28T06:33:34.000Z'),
                started: new Date('2021-07-28T07:04:57.000Z'),
                ended: new Date('2021-07-29T01:06:22.000Z'),
                replicaList: [
                  {
                    name: 'scd-replica',
                    replicaStatus: 'Succeeded',
                    created: new Date('2021-07-28T06:47:09.000Z'),
                    statusMessage: 'message',
                    restartCount: 1,
                  },
                ],
              },
            ],
          },
          {
            name: 'running-component',
            scheduledJobList: [
              {
                name: 'rng-job',
                status: 'Running',
                created: new Date('2021-08-11T13:37:00.000Z'),
                started: new Date('2021-08-11T20:13:37.000Z'),
                replicaList: [
                  {
                    name: 'rng-replica',
                    replicaStatus: 'Queued',
                    created: new Date('2021-07-28T18:05:54.000Z'),
                    restartCount: 1,
                    statusMessage: 'message',
                  },
                ],
              },
            ],
          },
          {
            name: 'empty-component',
            scheduledJobList: [],
          },
        ],
      },
    }));

    // Mock response for logs
    this.get(
      '/api/v1/applications/:appName/environments/:envName/jobcomponents/:jobComponentName/scheduledjobs/:scheduledJobName/logs',
      (_, request) =>
        request.params.scheduledJobName !== 'no-job'
          ? `fake log data for scheduled job ${request.params.scheduledJobName}`
          : new Response(404)
    );
  },
});

export default (
  <>
    {props.map((p, i) => (
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
          scheduledJobName={p.scheduledJobList[0].name}
        />
      </div>
    ))}
  </>
);
