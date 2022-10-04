import { ApplicationRegistrationPatchModel } from '.';

import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ApplicationRegistrationPatchModel> =
  [
    {
      __testDescription: 'Valid full object',
      adGroups: ['group1', 'group2'],
      owner: "lil' U",
      machineUser: true,
      repository: 'repo',
      wbs: 'money',
      configBranch: 'branch',
    },
    {
      __testDescription: 'Valid empty object',
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      adGroups: 'group1, group2' as unknown as Array<string>,
      owner: "lil' U",
      machineUser: true,
      repository: 'repo',
      wbs: 'money',
      configBranch: 'branch',
    },
  ];
