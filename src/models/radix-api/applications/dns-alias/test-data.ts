import { DNSAliasModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<DNSAliasModel> = [
  {
    __testDescription: 'Valid full object',
    url: 'url',
    componentName: 'componentName',
    environmentName: 'environmentName',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    url: 'url',
    componentName: ['componentName'] as unknown as string,
    environmentName: 'environmentName',
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    url: undefined,
    componentName: undefined,
    environmentName: undefined,
  },
];
