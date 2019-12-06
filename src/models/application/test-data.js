export default [
  {
    __testDescription: 'Application with job',
    name: 'My app',
    environments: [
      {
        name: 'dev',
        status: 'Consistent',
        activeDeployment: {
          name: 'a-deployment',
          environment: 'dev',
          activeFrom: '2018-11-19T14:33:23Z',
        },
      },
    ],
    registration: {
      adGroups: ['Group 1', 'Group 2'],
      name: 'name',
      repository: 'some/path/to/a/repo',
      sharedSecret: 'aSharedSecret',
      owner: 'a-user@equinor.com',
    },
    jobs: [
      {
        environments: ['an-environment'],
        name: 'some-job',
        pipeline: 'build-deploy',
        created: '2018-11-19T14:31:23Z',
        started: '2018-11-19T14:31:23Z',
        ended: '2018-11-19T14:32:23Z',
        status: 'Failed',
      },
    ],
  },
];
