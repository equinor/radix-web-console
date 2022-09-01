import { SecretModel } from '.';
import { SecretStatus } from '../secret-status';

import { TestDependencyDataType } from '../model-types';
import { SecretType } from '../secret-type';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<SecretModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    displayName: 'displayName',
    type: SecretType.SecretTypeGeneric,
    resource: 'resource',
    component: 'component',
    status: SecretStatus.Consistent,
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    component: 'component',
    status: SecretStatus.Pending,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'name',
    displayName: 'displayName',
    type: SecretStatus.Consistent as unknown as SecretType,
    resource: 'resource',
    component: 'component',
    status: SecretType.SecretTypeGeneric as unknown as SecretStatus,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'name',
    component: ['c1', 'c2'] as unknown as string,
    status: SecretStatus.Pending,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    component: undefined,
    status: undefined,
  },
];
