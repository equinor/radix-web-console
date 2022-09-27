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
      __testDescription: 'Valid partial object',
      owner: "lil' U",
      machineUser: true,
      configBranch: 'branch',
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
    {
      __testDescription: 'Invalid partial object',
      __testIsInvalidSample: true,
      owner: "lil' U",
      machineUser: 'cake' as unknown as boolean,
      repository: 'repo',
      wbs: 'money',
      configBranch: 'branch',
    },
    {
      __testDescription: 'Invalid empty object',
      __testIsInvalidSample: true,
      owner: undefined,
      machineUser: undefined,
      repository: undefined,
      wbs: undefined,
      configBranch: undefined,
    },
  ];
