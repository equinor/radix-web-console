export default [
  {
    __testDescription: 'No target deployment',
    commitID: '1234abcdef4321',
    name: 'A Job',
    pipeline: 'build-deploy',
    started: '2018-11-19T14:31:23Z',
    status: 'Running',
  },
  {
    __testDescription: 'One target deployment',
    commitID: '1234abcdef4321',
    ended: '2018-11-19T14:34:23Z',
    environments: ['production'],
    name: 'A Job',
    pipeline: 'build-deploy',
    started: '2018-11-19T14:31:23Z',
    status: 'Succeeded',
  },
];
