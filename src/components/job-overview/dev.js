import JobOverview from '.';
import { RequestState } from '../../state/state-utils/request-states';

const job1 = {
  name: 'radix-pipeline-20190118144919-d92uh',
  commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
  created: new Date('2019-01-21T12:59:00Z'),
  started: new Date('2019-01-21T12:59:00Z'),
  ended: new Date('2019-01-21T13:03:01Z'),
  status: 'Succeeded',
  pipeline: 'build-deploy',
  steps: [
    {
      name: 'clone-config',
      status: 'Succeeded',
      started: new Date('2019-01-18T14:49:23Z'),
      ended: new Date('2019-01-18T14:49:24Z'),
    },
    {
      name: 'radix-pipeline',
      status: 'Running',
      started: new Date('2019-01-18T14:49:25Z'),
      ended: null,
    },
    {
      name: 'clone',
      status: 'Succeeded',
      started: new Date('2019-01-18T14:49:27Z'),
      ended: new Date('2019-01-18T14:49:28Z'),
    },
    {
      name: 'build-client',
      status: 'Failed',
      started: new Date('2019-01-18T14:49:30Z'),
      ended: new Date('2019-01-18T14:51:35Z'),
    },
    {
      name: 'build-socket-server',
      status: 'Waiting',
      started: new Date('2019-01-18T14:49:30Z'),
      ended: null,
    },
  ],
  deployments: [
    {
      name: 'dev-d92uh-xt6rpmbm',
      environment: 'dev',
      activeFrom: new Date('2019-01-18T14:51:40Z'),
    },
  ],
};

const job2 = {
  name: 'radix-pipeline-20190118144919-d92uh2',
  commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
  created: new Date('2019-01-21T12:59:00Z'),
  started: new Date('2019-01-21T12:59:00Z'),
  status: 'Running',
  pipeline: 'build-deploy',
  steps: [
    {
      name: 'clone-config',
      status: 'Succeeded',
      started: new Date('2019-01-18T14:49:23Z'),
      ended: new Date('2019-01-18T14:49:24Z'),
    },
    {
      name: 'radix-pipeline',
      status: 'Running',
      started: new Date('2019-01-18T14:49:25Z'),
    },
    {
      name: 'clone',
      status: 'Succeeded',
      started: new Date('2019-01-18T14:49:27Z'),
      ended: new Date('2019-01-18T14:49:28Z'),
    },
    {
      name: 'build-client',
      status: 'Failed',
      started: new Date('2019-01-18T14:49:30Z'),
      ended: new Date('2019-01-18T14:51:35Z'),
    },
    {
      name: 'build-socket-server',
      status: 'Waiting',
      started: new Date('2019-01-18T14:49:30Z'),
    },
  ],
  deployments: [
    {
      name: 'dev-d92uh-xt6rpmbm',
      environment: 'dev',
      activeFrom: new Date('2019-01-18T14:51:40Z'),
    },
  ],
};

const job3 = {
  name: 'radix-pipeline-20190118144919-d92uh3',
  commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
  created: new Date('2019-01-21T12:59:00Z'),
  status: 'Waiting',
  pipeline: 'build-deploy',
};

const job4 = {
  name: 'radix-pipeline-20190118144919-d92uh4',
  commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
  created: new Date('2019-01-21T12:59:00Z'),
  status: 'Queued',
  pipeline: 'build-deploy',
};

const job5 = {
  name: 'radix-pipeline-20190118144919-abc123',
  commitID: '1111111aaaaaa0000000aaaaaaabbbbb22222222',
  created: new Date('2019-01-21T12:59:00Z'),
  started: new Date('2019-01-21T12:59:00Z'),
  status: 'Running',
  pipeline: 'build-deploy',
  triggeredBy: 'USER@equinor',
  steps: [
    {
      ended: new Date('2021-11-09T14:44:07.000Z'),
      name: 'clone-config',
      started: new Date('2021-11-09T14:44:06.000Z'),
      status: 'Succeeded',
      scan: null,
    },
    {
      ended: new Date('2021-11-09T14:44:09.000Z'),
      name: 'prepare-radix-tekton',
      started: new Date('2021-11-09T14:44:09.000Z'),
      status: 'Succeeded',
      scan: null,
    },
    {
      ended: new Date('2021-11-09T14:48:04.000Z'),
      name: 'radix-pipeline',
      started: new Date('2021-11-09T14:43:58.000Z'),
      status: 'Succeeded',
      scan: null,
    },
    {
      ended: new Date('2021-11-09T14:44:09.000Z'),
      name: 'run-radix-tekton',
      started: new Date('2021-11-09T14:44:09.000Z'),
      status: 'Succeeded',
      scan: null,
    },
    {
      ended: new Date('2021-11-09T14:44:20.000Z'),
      name: 'clone',
      started: new Date('2021-11-09T14:44:19.000Z'),
      status: 'Succeeded',
      scan: null,
    },
    {
      ended: new Date('2021-11-09T14:47:41.000Z'),
      name: 'build-simple-react',
      started: new Date('2021-11-09T14:44:22.000Z'),
      status: 'Succeeded',
      components: ['simple-react'],
      scan: null,
    },
    {
      ended: new Date('2021-11-09T14:48:04.000Z'),
      name: 'scan-simple-react',
      started: new Date('2021-11-09T14:47:47.000Z'),
      status: 'Succeeded',
      components: ['simple-react'],
      scan: {
        status: 'Success',
        vulnerabilities: {},
      },
    },
  ],
  deployments: null,
};

const pollJobState = {
  status: RequestState.SUCCESS,
};

export default (
  <div>
    <JobOverview
      appName="MyApp"
      jobName="MyJob"
      job={job1}
      pollJobState={pollJobState}
    />
    <JobOverview
      appName="MyApp"
      jobName="MyJob"
      job={job2}
      pollJobState={pollJobState}
    />
    <JobOverview
      appName="MyApp"
      jobName="MyJob"
      job={job3}
      pollJobState={pollJobState}
    />
    <JobOverview
      appName="MyApp"
      jobName="MyJob"
      job={job4}
      pollJobState={pollJobState}
    />
    <JobOverview
      appName="MyApp"
      jobName="MyJob"
      job={job5}
      pollJobState={pollJobState}
    />
  </div>
);
