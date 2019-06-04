export default [
  {
    __testDescription: 'Not started',
    name: 'A step',
    status: 'Pending',
  },
  {
    __testDescription: 'Started, not finished',
    name: 'B step',
    started: 1557000000000,
    status: 'Running',
  },
  {
    __testDescription: 'Finished successfully',
    name: 'C step',
    started: 1557000000000,
    ended: 1557000100000,
    status: 'Succeeded',
  },
  {
    __testDescription: 'Finished with failure',
    name: 'D step',
    started: 1557000000000,
    ended: 1557000100000,
    status: 'Failed',
  },
];
