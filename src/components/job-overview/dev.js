import React from 'react';

import { JobOverview } from '.';

const job1 = {
  name: 'radix-pipeline-20190118144919-d92uh',
  branch: 'master',
  commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
  started: '2019-01-21T12:59:00Z',
  ended: '2019-01-21T13:03:01Z',
  status: 'Succeeded',
  pipeline: 'build-deploy',
  steps: [
    {
      name: 'clone',
      status: 'Succeeded',
      started: '2019-01-18T14:49:27Z',
      ended: '2019-01-18T14:49:28Z',
    },
    {
      name: 'radix-pipeline',
      status: 'Running',
      started: '2019-01-18T14:49:25Z',
    },
    {
      name: 'build-client',
      status: 'Failed',
      started: '2019-01-18T14:49:30Z',
      ended: '2019-01-18T14:51:35Z',
    },
    {
      name: 'build-socket-server',
      status: 'Pending',
      started: '2019-01-18T14:49:30Z',
    },
  ],
  deployments: [
    {
      name: 'dev-d92uh-xt6rpmbm',
      createdByJob: 'radix-pipeline-20190118144919-d92uh',
      environment: 'dev',
      activeFrom: '2019-01-18T14:51:40Z',
    },
  ],
};

const job2 = {
  name: 'radix-pipeline-20190118144919-d92uh',
  branch: 'master',
  commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
  started: '2019-01-21T12:59:00Z',
  status: 'Running',
  pipeline: 'build-deploy',
  steps: [
    {
      name: 'clone',
      status: 'Succeeded',
      started: '2019-01-18T14:49:27Z',
      ended: '2019-01-18T14:49:28Z',
    },
    {
      name: 'radix-pipeline',
      status: 'Running',
      started: '2019-01-18T14:49:25Z',
    },
    {
      name: 'build-client',
      status: 'Failed',
      started: '2019-01-18T14:49:30Z',
      ended: '2019-01-18T14:51:35Z',
    },
    {
      name: 'build-socket-server',
      status: 'Pending',
      started: '2019-01-18T14:49:30Z',
    },
  ],
  deployments: [
    {
      name: 'dev-d92uh-xt6rpmbm',
      createdByJob: 'radix-pipeline-20190118144919-d92uh',
      environment: 'dev',
      activeFrom: '2019-01-18T14:51:40Z',
    },
  ],
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
  </div>
);
