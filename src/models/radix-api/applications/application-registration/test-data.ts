import { ApplicationRegistrationModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

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
    readerAdGroups: ['readerGroup1', 'readerGroup2'],
    owner: "lil' U",
    creator: 'muh dude!',
    wbs: 'money',
    configBranch: 'branch',
    radixConfigFullName: 'radixconfig.yaml',
    configurationItem: 'configurationItem',
  },
  {
    __testDescription: 'Valid partial object',
    name: 'dat app',
    repository: 'repo',
    sharedSecret: 'a1b2c3',
    owner: "lil' U",
    creator: 'muh dude!',
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
    readerAdGroups: ['readerGroup1', 'readerGroup2'],
    owner: "lil' U",
    creator: 'muh dude!',
    wbs: 'money',
    configBranch: 'branch',
    radixConfigFullName: 'radixconfig.yaml',
    configurationItem: 'configurationItem',
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'dat app',
    repository: 'repo',
    sharedSecret: 'a1b2c3',
    owner: "lil' U",
    creator: { huh: 'muh dude!' } as unknown as string,
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
    wbs: undefined,
    configBranch: undefined,
  },
];
