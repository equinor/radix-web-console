import { TestDependencyDataType } from '../model-types';

import { ApplicationRegistrationRequestModel } from '.';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationRegistrationRequestModel> =
  [
    {
      __testDescription: 'Valid object with application',
      applicationRegistration: {
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
    },
    {
      __testDescription: 'Valid object with acknowledgeWarnings',
      applicationRegistration: undefined,
      acknowledgeWarnings: true,
    },
    {
      __testDescription: 'Valid partial object',
      applicationRegistration: {
        name: 'dat app',
        repository: 'repo',
        sharedSecret: 'a1b2c3',
        owner: "lil' U",
        creator: 'muh dude!',
        machineUser: true,
        wbs: 'money',
        configBranch: 'branch',
      },
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      applicationRegistration: {
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
    },
    {
      __testDescription: 'Invalid partial object',
      __testIsInvalidSample: true,
      applicationRegistration: {
        name: 'dat app',
        repository: 'repo',
        sharedSecret: 'a1b2c3',
        owner: "lil' U",
        creator: 'muh dude!',
        machineUser: 'cake' as unknown as boolean,
        wbs: 'money',
        configBranch: 'branch',
      },
    },
    {
      __testDescription: 'Invalid empty object',
      __testIsInvalidSample: true,
      applicationRegistration: {
        name: undefined,
        repository: undefined,
        sharedSecret: undefined,
        owner: undefined,
        creator: undefined,
        machineUser: undefined,
        wbs: undefined,
        configBranch: undefined,
      },
      acknowledgeWarnings: undefined,
    },
    {
      __testDescription: 'Invalid empty object',
      __testIsInvalidSample: true,
      applicationRegistration: undefined,
      acknowledgeWarnings: undefined,
    },
  ];
