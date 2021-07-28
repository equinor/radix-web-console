export const testData = [
  {
    __testDescription: 'Success status',
    status: 'Success',
    reason: 'any reason',
  },
  {
    __testDescription: 'Missing status',
    status: 'Missing',
    reason: 'any reason',
  },
  {
    __testDescription: 'Vulnerabilities is set',
    status: 'Success',
    vulnerabilities: {
      critical: 5,
    },
  },
  {
    __testDescription: 'invalid vulnerabilities prop should not fail',
    status: 'Success',
    vulnerabilities: 'a string',
  },
  {
    __testDescription: 'invalid status',
    __testIsInvalidSample: true,
    status: 'Invalid',
  },
  {
    __testDescription: 'Status not set',
    __testIsInvalidSample: true,
  },
];

export default testData;
