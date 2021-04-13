const normalReplicas = Object.freeze([
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
]);

export const testData = [
  {
    __testDescription: 'Valid Running',
    name: 'A Job',
    created: '2018-11-19T14:31:23Z',
    ended: '2018-11-19T14:32:23Z',
    started: '2018-11-19T14:31:23Z',
    status: 'Running',
    replicaList: normalReplicas,
  },
  {
    __testDescription: 'Valid Running not ended',
    name: 'A Job',
    created: '2018-11-19T14:31:23Z',
    started: '2018-11-19T14:31:23Z',
    status: 'Running',
    replicaList: normalReplicas,
  },
];

export default testData;
