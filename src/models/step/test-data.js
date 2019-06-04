export default [
  {
    __testDescription: 'Not started',
    name: 'A step',
    status: 'Pending',
  },
  {
    __testDescription: 'Started, not finished',
    name: 'B step',
    started: '2018-11-19T14:31:23Z',
    status: 'Running',
  },
  {
    __testDescription: 'Finished successfully',
    name: 'C step',
    started: '2018-11-19T14:31:23Z',
    ended: '2018-11-19T14:34:23Z',
    status: 'Succeeded',
  },
  {
    __testDescription: 'Finished with failure',
    name: 'D step',
    started: '2018-11-19T14:31:23Z',
    ended: '2018-11-19T14:34:23Z',
    status: 'Failed',
  },
];
