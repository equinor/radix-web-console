import { SecretModel } from '.';

import { SecretStatus } from '../secret-status';
import { SecretType } from '../secret-type';
import { testData as TLSCertificateData } from '../tls-certificate/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<SecretModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    id: 'id',
    displayName: 'displayName',
    type: SecretType.SecretTypeGeneric,
    resource: 'resource',
    component: 'component',
    status: SecretStatus.Consistent,
    statusMessages: ['msg1', 'msg2'],
    tlsCertificates: [TLSCertificateData[0]],
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
    id: 'id',
    displayName: 'displayName',
    type: SecretStatus.Consistent as unknown as SecretType,
    resource: 'resource',
    component: 'component',
    status: SecretType.SecretTypeGeneric as unknown as SecretStatus,
    statusMessages: ['msg1', 'msg2'],
    tlsCertificates: [TLSCertificateData[0]],
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
