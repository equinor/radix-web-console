import { ApplicationRegistrationModel } from '.';

import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationRegistrationModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'dat app',
    repository: 'repo',
    sharedSecret: 'a1b2c3',
    adGroups: ['group1', 'group2'],
    owner: "lil' U",
    creator: 'muh dude!',
    publicKey: 'abc123',
    privateKey: '123abc',
    machineUser: true,
    wbs: 'money',
    configBranch: 'branch',
  },
  {
    __testDescription: 'Valid partial object',
    name: 'dat app',
    repository: 'repo',
    sharedSecret: 'a1b2c3',
    owner: "lil' U",
    creator: 'muh dude!',
    machineUser: true,
    wbs: 'money',
    configBranch: 'branch',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'dat app',
    repository: 'repo',
    sharedSecret: 'a1b2c3',
    adGroups: 'group1, group2' as unknown as Array<string>,
    owner: "lil' U",
    creator: 'muh dude!',
    publicKey: 'abc123',
    privateKey: '123abc',
    machineUser: true,
    wbs: 'money',
    configBranch: 'branch',
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'dat app',
    repository: 'repo',
    sharedSecret: 'a1b2c3',
    owner: "lil' U",
    creator: 'muh dude!',
    machineUser: 'cake' as unknown as boolean,
    wbs: 'money',
    configBranch: 'branch',
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    repository: undefined,
    sharedSecret: undefined,
    owner: undefined,
    creator: undefined,
    machineUser: undefined,
    wbs: undefined,
    configBranch: undefined,
  },
];
