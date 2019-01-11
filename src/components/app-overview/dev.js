import React from 'react';

import EnvironmentsSummary from './environments-summary';
import LatestJobs from './latest-jobs';

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

const jobs = [
  {
    name: 'radix-pipeline-20190110143554-t3tix',
    appName: 'radix-web-console',
    branch: 'master',
    commitID: '37af2a3d841e4d4479373e467caccf550846d418',
    started: '2019-01-10T14:35:54Z',
    ended: '2019-01-10T14:51:54Z',
    status: 'Succeeded',
    pipeline: 'build-deploy',
    environments: ['qa'],
  },
  {
    name: 'radix-pipeline-20190110083646-uvdv4',
    appName: 'radix-web-console',
    branch: 'master',
    commitID: '292d36c392ccbaba32b419ae56e08dcdd92b8412',
    started: '2019-01-10T08:36:46Z',
    ended: '2019-01-10T08:39:04Z',
    status: 'Failed',
    pipeline: 'build-deploy',
  },
  {
    name: 'radix-pipeline-20190109121011-idtna',
    appName: 'radix-web-console',
    branch: 'master',
    commitID: '393cb144cd079886c076285167e23a23c2c783c4',
    started: '2019-01-09T12:10:11Z',
    ended: '2019-01-09T12:16:47Z',
    status: 'Succeeded',
    pipeline: 'build-deploy',
    environments: ['qa'],
  },
  {
    name: 'radix-pipeline-20190109085250-obek3',
    appName: 'radix-web-console',
    branch: 'master',
    commitID: 'b7b0caf4e9b06aa4b0b4b967fb6c88485029d72a',
    started: '2019-01-09T08:52:50Z',
    ended: '2019-01-09T09:00:27Z',
    status: 'Succeeded',
    pipeline: 'build-deploy',
    environments: ['qa'],
  },
  {
    name: 'radix-pipeline-20190104123104-875r3',
    appName: 'radix-web-console',
    branch: 'master',
    commitID: 'f175e3fabf74b846eedfb27a1978de7cb2f7b4a0',
    started: '2019-01-04T12:31:04Z',
    ended: '2019-01-04T12:36:32Z',
    status: 'Succeeded',
    pipeline: 'build-deploy',
    environments: ['qa'],
  },
  {
    name: 'radix-pipeline-20190104111729-mkni5',
    appName: 'radix-web-console',
    branch: 'master',
    commitID: 'ef85c7aeb7351de6918004facfda336def3a1f76',
    started: '2019-01-04T11:17:29Z',
    ended: '2019-01-04T11:22:26Z',
    status: 'Succeeded',
    pipeline: 'build-deploy',
    environments: ['qa'],
  },
];

export default (
  <div style={{ backgroundColor: 'var(--color-bright)' }}>
    <EnvironmentsSummary appName="my-app" envs={envs} />
    <hr />
    <EnvironmentsSummary appName="my-app" envs={[]} />
    <hr />
    <LatestJobs jobs={jobs} appName="my-app" />
    <hr />
    <LatestJobs jobs={[]} appName="my-app" />
  </div>
);
