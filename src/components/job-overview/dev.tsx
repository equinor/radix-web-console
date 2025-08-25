import { Divider } from '@equinor/eds-core-react';
import { Response, Server } from 'miragejs';
import { Fragment } from 'react';
import type { Job } from '../../store/radix-api';
import { JobOverview } from '.';

const testData: Array<Job> = [
  {
    name: 'radix-pipeline-20190118144919-hd92u',
    branch: 'master',
    commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
    created: '2019-01-21T12:59:00Z',
    triggeredBy: 'MrGithub',
    started: '2019-01-21T12:59:00Z',
    ended: '2019-01-21T14:58:02Z',
    status: 'Succeeded',
    pipeline: 'build-deploy',
    triggeredFromWebhook: false,
    steps: [
      {
        name: 'radix-pipeline',
        status: 'Succeeded',
        started: '2019-01-21T14:49:22Z',
        ended: '2019-01-21T14:58:00Z',
      },
      {
        name: 'clone-config',
        status: 'Succeeded',
        started: '2019-01-21T14:49:23Z',
        ended: '2019-01-21T14:49:47Z',
      },
      {
        name: 'prepare-pipelines',
        status: 'Succeeded',
        started: '2019-01-21T14:49:52Z',
        ended: '2019-01-21T14:50:26Z',
      },
      {
        name: 'clone',
        status: 'Succeeded',
        started: '2019-01-21T14:50:40Z',
        ended: '2019-01-21T14:52:28Z',
      },
      {
        name: 'build-client',
        status: 'Succeeded',
        started: '2019-01-21T14:52:30Z',
        ended: '2019-01-21T14:57:57Z',
        components: ['simple-react'],
      },
      {
        name: 'build-socket-server',
        status: 'Succeeded',
        started: '2019-01-21T14:52:30Z',
        ended: '2019-01-21T14:54:02Z',
      },
    ],
    deployments: [
      {
        name: 'dev-hd92u-xt6rpmbm',
        environment: 'dev',
        activeFrom: '2019-01-21T14:58:15Z',
      },
    ],
    components: [
      {
        name: 'client',
        image: 'special-image-dbo',
        type: 'component',
      },
      {
        name: 'socket-server',
        image: 'boring-image-zxf',
        type: 'component',
      },
    ],
  },
  {
    name: 'radix-pipeline-20230622064410-92uhd',
    commitID: 'df43c7f7b94b4c54b4c661c0728b3cf681fde8d8',
    created: '2023-06-22T06:41:15Z',
    triggeredBy: 'USER@equinor',
    started: '2023-06-22T06:44:00Z',
    status: 'Running',
    pipeline: 'build-deploy',
    triggeredFromWebhook: false,
    steps: [
      {
        name: 'clone-config',
        status: 'Succeeded',
        started: '2023-06-22T06:44:06.000Z',
        ended: '2023-06-22T06:44:07.000Z',
      },
      {
        name: 'radix-pipeline',
        status: 'Succeeded',
        started: '2023-06-22T06:43:58.000Z',
        ended: '2023-06-22T06:48:04.000Z',
      },
      {
        name: 'prepare-pipelines',
        status: 'Succeeded',
        started: '2023-06-22T06:44:09.000Z',
        ended: '2023-06-22T06:44:38.000Z',
      },
      {
        name: 'run-pipelines',
        status: 'Running',
        started: '2023-06-22T06:44:50.000Z',
      },
    ],
  },
  {
    name: 'radix-pipeline-20190118144919-d92uh',
    branch: 'prod',
    commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
    created: '2019-01-21T12:59:00Z',
    started: '2019-01-21T12:59:00Z',
    ended: '2019-01-21T13:03:01Z',
    status: 'Failed',
    pipeline: 'build-deploy',
    triggeredFromWebhook: false,
    steps: [
      {
        name: 'radix-pipeline',
        status: 'Failed',
        started: '2019-01-18T14:49:22Z',
        ended: '2019-01-18T14:52:50Z',
      },
      {
        name: 'clone-config',
        status: 'Succeeded',
        started: '2019-01-18T14:49:23Z',
        ended: '2019-01-18T14:49:47Z',
      },
      {
        name: 'prepare-pipelines',
        status: 'Succeeded',
        started: '2019-01-18T14:49:52Z',
        ended: '2019-01-18T14:50:26Z',
      },
      {
        name: 'clone',
        status: 'Succeeded',
        started: '2019-01-18T14:50:40Z',
        ended: '2019-01-18T14:52:28Z',
      },
      {
        name: 'build-client',
        status: 'Failed',
        started: '2019-01-18T14:52:30Z',
        ended: '2019-01-18T14:52:35Z',
      },
      {
        name: 'build-socket-server',
        status: 'Failed',
        started: '2019-01-18T14:52:30Z',
        ended: '2019-01-18T14:52:37Z',
      },
    ],
  },
  {
    name: 'radix-pipeline-20190118144919-uhd92',
    branch: 'prod',
    commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
    created: '2019-01-21T12:59:00Z',
    status: 'Waiting',
    pipeline: 'build-deploy',
    triggeredFromWebhook: false,
  },
  {
    name: 'radix-pipeline-20190118144919-2uhd9',
    triggeredBy: 'human@notarobot.ai',
    commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
    created: '2019-01-21T12:59:00Z',
    status: 'Failed',
    pipeline: 'deploy',
    triggeredFromWebhook: false,
  },
];

// Mock API responses
new Server({
  routes() {
    const rootPath = '/api/v1/applications/:appName/jobs';

    // Mock response for specific jobs
    testData.forEach((x) => this.get(`${rootPath}/${x.name}`, () => x));
    // Mock response for any job
    this.get(`${rootPath}/:jobName`, () => new Response(404));
    // Mock response for StopJob button
    this.post(`${rootPath}/:jobName/stop`, () => new Response(200));
    // Mock response for ReRun button
    this.post(`${rootPath}/:jobName/rerun`, () => new Response(200));
  },
});

const notAJob: Job = {
  name: 'noJob',
  created: new Date().toISOString(),
  status: 'Waiting',
  pipeline: 'build',
  triggeredFromWebhook: false,
};

export default (
  <div
    className="grid grid--gap-large"
    style={{
      backgroundColor: 'var(--eds_ui_background__default)',
      padding: 'var(--eds_spacing_large)',
    }}
  >
    {[...testData, notAJob].map(({ name }, i, { length }) => (
      <Fragment key={i}>
        <div
          className="grid grid--gap-large"
          style={{
            border: 'solid 2px gray',
            borderRadius: 'var(--eds_shape_corners_border_radius)',
            margin: '4px',
            padding: 'var(--eds_spacing_large)',
          }}
        >
          <JobOverview appName="MyApp" jobName={name!} />
        </div>
        <div>{i < length - 1 && <Divider />}</div>
      </Fragment>
    ))}
  </div>
);
