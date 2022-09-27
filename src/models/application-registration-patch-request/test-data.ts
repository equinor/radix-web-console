import { TestDependencyDataType } from '../model-types';

import { ApplicationRegistrationPatchRequestModel } from '.';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationRegistrationPatchRequestModel> =
  [
    {
      __testDescription: 'Valid object with application',
      applicationRegistrationPatch: {
        adGroups: ['group1', 'group2'],
        owner: "lil' U",
        machineUser: true,
        repository: 'repo',
        wbs: 'money',
        configBranch: 'branch',
      },
    },
    {
      __testDescription: 'Valid object with acknowledgeWarnings',
      applicationRegistrationPatch: undefined,
      acknowledgeWarnings: true,
    },
    {
      __testDescription: 'Valid partial object',
      applicationRegistrationPatch: {
        repository: 'repo',
        owner: "lil' U",
        machineUser: true,
        wbs: 'money',
        configBranch: 'branch',
      },
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      applicationRegistrationPatch: {
        repository: 'repo',
        adGroups: 'group1, group2' as unknown as Array<string>,
        owner: "lil' U",
        machineUser: true,
        wbs: 'money',
        configBranch: 'branch',
      },
    },
    {
      __testDescription: 'Invalid partial object',
      __testIsInvalidSample: true,
      applicationRegistrationPatch: {
        repository: 'repo',
        owner: "lil' U",
        machineUser: 'cake' as unknown as boolean,
        wbs: 'money',
        configBranch: 'branch',
      },
    },
    {
      __testDescription: 'Invalid empty object',
      __testIsInvalidSample: true,
      applicationRegistrationPatch: {
        repository: undefined,
        owner: undefined,
        machineUser: undefined,
        wbs: undefined,
        configBranch: undefined,
      },
      acknowledgeWarnings: undefined,
    },
    {
      __testDescription: 'Invalid empty object',
      __testIsInvalidSample: true,
      applicationRegistrationPatch: undefined,
      acknowledgeWarnings: undefined,
    },
  ];
