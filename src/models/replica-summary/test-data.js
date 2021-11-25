export const testData = [
  {
    __testDescription: 'Running',
    name: 'a-replica',
    replicaStatus: { status: 'Running' },
    created: '2018-11-19T14:31:23Z',
    image: 'any-image:latest',
    imageId:
      'any-image@sha256:e0e0075ad506f4c803c1c2cec0e268b046c3c1dd8ade0e5a51b51e3b122f46c9',
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
