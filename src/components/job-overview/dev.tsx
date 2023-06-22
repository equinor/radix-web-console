import { Divider } from '@equinor/eds-core-react';
import { Server, Response } from 'miragejs';
import { Fragment } from 'react';

import { JobOverview } from '.';

import { ComponentType } from '../../models/radix-api/deployments/component-type';
import { JobModel } from '../../models/radix-api/jobs/job';
import { RadixJobCondition } from '../../models/radix-api/jobs/radix-job-condition';

const testData: Array<JobModel> = [
  {
    name: 'radix-pipeline-20190118144919-hd92u',
    branch: 'master',
    commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
    created: new Date('2019-01-21T12:59:00Z'),
    triggeredBy: 'MrGithub',
    started: new Date('2019-01-21T12:59:00Z'),
    ended: new Date('2019-01-21T14:58:02Z'),
    status: RadixJobCondition.Succeeded,
    pipeline: 'build-deploy',
    steps: [
      {
        name: 'radix-pipeline',
        status: RadixJobCondition.Succeeded,
        started: new Date('2019-01-21T14:49:22Z'),
        ended: new Date('2019-01-21T14:58:00Z'),
      },
      {
        name: 'clone-config',
        status: RadixJobCondition.Succeeded,
        started: new Date('2019-01-21T14:49:23Z'),
        ended: new Date('2019-01-21T14:49:47Z'),
      },
      {
        name: 'prepare-pipelines',
        status: RadixJobCondition.Succeeded,
        started: new Date('2019-01-21T14:49:52Z'),
        ended: new Date('2019-01-21T14:50:26Z'),
      },
      {
        name: 'clone',
        status: RadixJobCondition.Succeeded,
        started: new Date('2019-01-21T14:50:40Z'),
        ended: new Date('2019-01-21T14:52:28Z'),
      },
      {
        name: 'build-client',
        status: RadixJobCondition.Succeeded,
        started: new Date('2019-01-21T14:52:30Z'),
        ended: new Date('2019-01-21T14:57:57Z'),
        components: ['simple-react'],
      },
      {
        name: 'build-socket-server',
        status: RadixJobCondition.Succeeded,
        started: new Date('2019-01-21T14:52:30Z'),
        ended: new Date('2019-01-21T14:54:02Z'),
      },
    ],
    deployments: [
      {
        name: 'dev-hd92u-xt6rpmbm',
        environment: 'dev',
        activeFrom: new Date('2019-01-21T14:58:15Z'),
      },
    ],
    components: [
      {
        name: 'client',
        image: 'special-image-dbo',
        type: ComponentType.component,
      },
      {
        name: 'socket-server',
        image: 'boring-image-zxf',
        type: ComponentType.component,
      },
    ],
  },
  {
    name: 'radix-pipeline-20230622064410-92uhd',
    commitID: 'df43c7f7b94b4c54b4c661c0728b3cf681fde8d8',
    created: new Date('2023-06-22T06:41:15Z'),
    triggeredBy: 'USER@equinor',
    started: new Date('2023-06-22T06:44:00Z'),
    status: RadixJobCondition.Running,
    pipeline: 'build-deploy',
    steps: [
      {
        name: 'clone-config',
        status: RadixJobCondition.Succeeded,
        started: new Date('2023-06-22T06:44:06.000Z'),
        ended: new Date('2023-06-22T06:44:07.000Z'),
      },
      {
        name: 'radix-pipeline',
        status: RadixJobCondition.Succeeded,
        started: new Date('2023-06-22T06:43:58.000Z'),
        ended: new Date('2023-06-22T06:48:04.000Z'),
      },
      {
        name: 'prepare-pipelines',
        status: RadixJobCondition.Succeeded,
        started: new Date('2023-06-22T06:44:09.000Z'),
        ended: new Date('2023-06-22T06:44:38.000Z'),
      },
      {
        name: 'run-pipelines',
        status: RadixJobCondition.Running,
        started: new Date('2023-06-22T06:44:50.000Z'),
      },
    ],
  },
  {
    name: 'radix-pipeline-20190118144919-d92uh',
    branch: 'prod',
    commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
    created: new Date('2019-01-21T12:59:00Z'),
    started: new Date('2019-01-21T12:59:00Z'),
    ended: new Date('2019-01-21T13:03:01Z'),
    status: RadixJobCondition.Failed,
    pipeline: 'build-deploy',
    steps: [
      {
        name: 'radix-pipeline',
        status: RadixJobCondition.Failed,
        started: new Date('2019-01-18T14:49:22Z'),
        ended: new Date('2019-01-18T14:52:50Z'),
      },
      {
        name: 'clone-config',
        status: RadixJobCondition.Succeeded,
        started: new Date('2019-01-18T14:49:23Z'),
        ended: new Date('2019-01-18T14:49:47Z'),
      },
      {
        name: 'prepare-pipelines',
        status: RadixJobCondition.Succeeded,
        started: new Date('2019-01-18T14:49:52Z'),
        ended: new Date('2019-01-18T14:50:26Z'),
      },
      {
        name: 'clone',
        status: RadixJobCondition.Succeeded,
        started: new Date('2019-01-18T14:50:40Z'),
        ended: new Date('2019-01-18T14:52:28Z'),
      },
      {
        name: 'build-client',
        status: RadixJobCondition.Failed,
        started: new Date('2019-01-18T14:52:30Z'),
        ended: new Date('2019-01-18T14:52:35Z'),
      },
      {
        name: 'build-socket-server',
        status: RadixJobCondition.Failed,
        started: new Date('2019-01-18T14:52:30Z'),
        ended: new Date('2019-01-18T14:52:37Z'),
      },
    ],
  },
  {
    name: 'radix-pipeline-20190118144919-uhd92',
    branch: 'prod',
    commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
    created: new Date('2019-01-21T12:59:00Z'),
    status: RadixJobCondition.Waiting,
    pipeline: 'build-deploy',
  },
  {
    name: 'radix-pipeline-20190118144919-2uhd9',
    triggeredBy: 'human@notarobot.ai',
    commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
    created: new Date('2019-01-21T12:59:00Z'),
    status: RadixJobCondition.Failed,
    pipeline: 'deploy',
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
  },
});

const notAJob: JobModel = {
  name: 'noJob',
  created: new Date(),
  status: RadixJobCondition.Waiting,
  pipeline: 'build',
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
          <JobOverview appName="MyApp" jobName={name} />
        </div>
        <div>{i < length - 1 && <Divider />}</div>
      </Fragment>
    ))}
  </div>
);
