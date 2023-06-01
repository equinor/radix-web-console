import { NotificationsModel } from '.';

import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<NotificationsModel> = [
  {
    __testDescription: 'Valid full object',
    webhook: 'http://api:8080',
  },
  {
    __testDescription: 'Valid partial object',
    webhook: '',
  },
  {
    __testDescription: 'Valid empty object',
  },
];
