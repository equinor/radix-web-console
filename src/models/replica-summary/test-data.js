export const testData = [
  {
    __testDescription: 'Running',
    name: 'a-replica',
    replicaStatus: { status: 'Running' },
    created: '2018-11-19T14:31:23Z',
  },
  {
    __testDescription: 'Starting',
    name: 'b-replica',
    replicaStatus: { status: 'Pending' },
    created: '2018-11-19T14:31:23Z',
  },
  {
    __testDescription: 'Failing',
    name: 'c-replica',
    replicaStatus: { status: 'Failing' },
    statusMessage: 'Some error message',
    created: '2018-11-19T14:31:23Z',
  },
  {
    __testDescription: 'Wrong status',
    __testIsInvalidSample: true,
    name: 'd-replica',
    replicaStatus: { status: 'Waiting' },
    created: '2018-11-19T14:31:23Z',
  },
];

export default testData;
