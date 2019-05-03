export default [
  {
    __testDescription: 'No target deployment',
    commitID: '1234abcdef4321',
    name: 'A Job',
    pipeline: 'build-deploy',
    started: 1557000000000,
    status: 'Running',
    triggeredBy: 'Some user',
  },
  {
    __testDescription: 'Missing triggered by field',
    __testIsInvalidSample: true,
    commitID: '1234abcdef4321',
    ended: 1557000010000,
    environments: ['production'],
    name: 'A Job',
    pipeline: 'build-deploy',
    started: 1557000000000,
    status: 'Succeeded',
  },
];
