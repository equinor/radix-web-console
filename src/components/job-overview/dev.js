import React from 'react';

import { JobOverview } from '.';

const job1 = {
  name: 'radix-pipeline-20190118144919-d92uh',
  branch: 'master',
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
      status: 'Pending',
      started: new Date('2019-01-18T14:49:30Z'),
      ended: null,
    },
  ],
  deployments: [
    {
      name: 'dev-d92uh-xt6rpmbm',
      createdByJob: 'radix-pipeline-20190118144919-d92uh',
      environment: 'dev',
      activeFrom: new Date('2019-01-18T14:51:40Z'),
    },
  ],
};

const job2 = {
  name: 'radix-pipeline-20190118144919-d92uh2',
  branch: 'master',
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
      status: 'Pending',
      started: new Date('2019-01-18T14:49:30Z'),
    },
  ],
  deployments: [
    {
      name: 'dev-d92uh-xt6rpmbm',
      createdByJob: 'radix-pipeline-20190118144919-d92uh',
      environment: 'dev',
      activeFrom: new Date('2019-01-18T14:51:40Z'),
    },
  ],
};

const job3 = {
  name: 'radix-pipeline-20190118144919-d92uh3',
  branch: 'master',
  commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
  created: new Date('2019-01-21T12:59:00Z'),
  started: null,
  ended: null,
  status: 'Waiting',
  pipeline: 'build-deploy',
  steps: null,
  deployments: null,
};

const job4 = {
  name: 'radix-pipeline-20190118144919-d92uh4',
  branch: 'master',
  commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
  created: new Date('2019-01-21T12:59:00Z'),
  started: null,
  ended: null,
  status: 'Queued',
  pipeline: 'build-deploy',
  steps: null,
  deployments: null,
};

const noop = () => {};

export default (
  <div>
    <JobOverview
      appName="MyApp"
      job={job1}
      jobName="MyJob"
      subscribe={noop}
      unsubscribe={noop}
    />
    <JobOverview
      appName="MyApp"
      job={job2}
      jobName="MyJob"
      subscribe={noop}
      unsubscribe={noop}
    />
    <JobOverview
      appName="MyApp"
      job={job3}
      jobName="MyJob"
      subscribe={noop}
      unsubscribe={noop}
    />
    <JobOverview
      appName="MyApp"
      job={job4}
      jobName="MyJob"
      subscribe={noop}
      unsubscribe={noop}
    />
  </div>
);
