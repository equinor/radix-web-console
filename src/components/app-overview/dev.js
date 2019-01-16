import React from 'react';

import EnvironmentsSummary from './environments-summary';

const envs = [
  {
    name: 'qa',
    status: 'Consistent',
    activeDeployment: {
      name: 'qa-hxn4z-ugvhgj0o',
      createdByJob: 'radix-pipeline-20190111084321-hxn4z',
      environment: 'qa',
      activeFrom: '2019-01-11T08:49:44Z',
    },
    branchMapping: 'master',
  },
  {
    name: 'prod',
    status: 'Consistent',
    activeDeployment: {
      name: 'prod-srqer-ffst7fqx',
      createdByJob: 'radix-pipeline-20190104063327-srqer',
      environment: 'prod',
      activeFrom: '2019-01-04T06:39:48Z',
    },
    branchMapping: 'release',
  },
  {
    name: 'pr520',
    status: 'Orphan',
    activeDeployment: {
      name: 'pr520-qt1dm-4r9vcdtc',
      createdByJob: 'radix-pipeline-20181227122128-qt1dm',
      environment: 'pr520',
      activeFrom: '2018-12-27T12:26:34Z',
    },
  },
];

export default (
  <div style={{ backgroundColor: 'var(--color-bright)' }}>
    <EnvironmentsSummary appName="my-app" envs={envs} />
    <hr />
    <EnvironmentsSummary appName="my-app" envs={[]} />
  </div>
);
