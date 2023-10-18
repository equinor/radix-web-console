import { ApplicationRegistrationPatchModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

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
      readerAdGroups: ['readerGroup1', 'readerGroup2'],
      owner: "lil' U",
      repository: 'repo',
      wbs: 'money',
      configBranch: 'branch',
      radixConfigFullName: 'radixconfig.yaml',
      configurationItem: 'configurationItem',
    },
    {
      __testDescription: 'Valid empty object',
    },
    {
      __testDescription: 'Invalid full object',
      __testIsInvalidSample: true,
      adGroups: 'group1, group2' as unknown as Array<string>,
      readerAdGroups: ['readerGroup1', 'readerGroup2'],
      owner: "lil' U",
      repository: 'repo',
      wbs: 'money',
      configBranch: 'branch',
      radixConfigFullName: 'radixconfig.yaml',
      configurationItem: 'configurationItem',
    },
  ];
