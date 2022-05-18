import { ImageHubSecretModel } from '.';

import { ImageHubSecretStatus } from '../image-hub-secret-status';
import { TestDependencyDataType } from '../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ImageHubSecretModel> = [
  {
    __testDescription: 'Valid full object',
    server: 'server_name',
    username: 'user_name',
    email: 'email',
    status: ImageHubSecretStatus.Consistent,
  },
  {
    __testDescription: 'Valid partial object',
    server: 'server_name',
    username: 'user_name',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    server: 'server_name',
    username: 'user_name',
    email: 'email',
    status: 'Failing' as unknown as ImageHubSecretStatus,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    server: 'server_name',
    username: 1234 as unknown as string,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    server: undefined,
    username: undefined,
  },
];
