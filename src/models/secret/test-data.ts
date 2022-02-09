import { SecretModel } from '.';
import { ConfigurationStatus } from '../configuration-status';

import { TestDependencyDataType } from '../model-types';
import { SecretType } from '../secret-type';

export const testData: TestDependencyDataType<SecretModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    displayName: 'displayName',
    type: SecretType.SecretTypeGeneric,
    resource: 'resource',
    component: 'component',
    status: ConfigurationStatus.Consistent,
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    component: 'component',
    status: ConfigurationStatus.Pending,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'name',
    displayName: 'displayName',
    type: ConfigurationStatus.Consistent as any,
    resource: 'resource',
    component: 'component',
    status: SecretType.SecretTypeGeneric as any,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'name',
    component: 'component',
    status: SecretType.SecretTypeOrphaned as any,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    component: undefined,
    status: undefined,
  },
];
