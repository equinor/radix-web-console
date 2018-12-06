export default [
  {
    __testDescription: 'Without public key',
    adGroups: ['Group 1', 'Group 2'],
    name: 'name',
    repository: 'some/path/to/a/repo',
    sharedSecret: 'aSharedSecret',
  },
  {
    __testDescription: 'With public key',
    adGroups: ['Group 1', 'Group 2'],
    name: 'a-name',
    publicKey: 'a-big-public-key',
    repository: 'some/path/to/a/repo',
    sharedSecret: 'aSharedSecret',
  },
];
