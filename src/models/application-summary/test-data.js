export const testData = [
  {
    __testDescription: 'Latest job running',
    name: 'My app 1',
    latestJob: {
      environments: ['an-environment'],
      name: 'some-job',
      pipeline: 'build-deploy',
      created: '2018-11-19T14:31:23Z',
      started: '2018-11-19T14:31:23Z',
      status: 'Running',
    },
  },
  {
    __testDescription: 'Latest job failed',
    name: 'My app 2',
    latestJob: {
      environments: ['an-environment'],
      name: 'some-job',
      pipeline: 'build-deploy',
      created: '2018-11-19T14:31:23Z',
      started: '2018-11-19T14:31:23Z',
      ended: '2018-11-19T14:37:10Z',
      status: 'Failed',
    },
  },
];

export default testData;
