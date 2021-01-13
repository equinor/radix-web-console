export default [
  {
    __testDescription: 'Valid event with "started" prop',
    ready: true,
    started: true,
    restartCount: 0,
  },
  {
    __testDescription: 'Valid event without "started" prop',
    ready: false,
    restartCount: 0,
  },
  {
    __testDescription: 'Missing "ready" prop',
    __testIsInvalidSample: true,
    started: true,
    restartCount: 0,
  },
  {
    __testDescription: 'Missing "restartCount" prop',
    __testIsInvalidSample: true,
    ready: false,
    started: true,
  },
];
