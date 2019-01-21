import React from 'react';

import { JobOverview } from '.';

const job = {
  name: 'radix-pipeline-20190118144919-d92uh',
  branch: 'master',
  commitID: '758d617b5a37f3e4f4aff14f1299f36c1c267234',
  started: '2019-01-18T14:49:19Z',
  ended: '2019-01-18T14:51:42Z',
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
      ended: '2019-01-18T14:51:41Z',
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
      ended: '2019-01-18T14:50:04Z',
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
  <JobOverview
    appName="MyApp"
    job={job}
    jobName="MyJob"
    subscribe={noop}
    unsubscribe={noop}
  />
);
