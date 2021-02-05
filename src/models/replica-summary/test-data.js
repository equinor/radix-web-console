export const testData = [
  {
    __testDescription: 'Running',
    name: 'a-replica',
    replicaStatus: { status: 'Running' },
  },
  {
    __testDescription: 'Starting',
    name: 'b-replica',
    replicaStatus: { status: 'Pending' },
  },
  {
    __testDescription: 'Failing',
    name: 'c-replica',
    replicaStatus: { status: 'Failing' },
    statusMessage: 'Some error message',
  },
  {
    __testDescription: 'Wrong status',
    __testIsInvalidSample: true,
    name: 'd-replica',
    replicaStatus: { status: 'Waiting' },
  },
];

export default testData;
