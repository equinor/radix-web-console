import { EventModel } from '.';

import { TestDependencyDataType } from '../model-types';
import { testData as ObjectStateData } from '../object-state/test-data';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<EventModel> = [
  {
    __testDescription: 'Valid full object',
    lastTimestamp: new Date('2020-12-22T14:38:36Z'),
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'www-74cb7c986-fgcrl',
    involvedObjectState: ObjectStateData[0],
    type: 'Normal',
    reason: 'Unhealthy',
    message: 'msg',
  },
  {
    __testDescription: 'Valid partial object',
    lastTimestamp: new Date('2020-12-22T14:38:36Z'),
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'www-74cb7c986-fgcrl',
    type: 'Warning',
    reason: 'Unhealthy',
    message: 'msg',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    lastTimestamp: new Date('2020-12-22T14:38:36Z'),
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'www-74cb7c986-fgcrl',
    involvedObjectState: ObjectStateData[0],
    type: 'Normal',
    reason: 'Unhealthy',
    message: ['msg1', 'msg2'] as unknown as string,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    lastTimestamp: new Date('2020-12-22T14:38:36Z'),
    involvedObjectKind: 'Pod',
    involvedObjectNamespace: 'myapp-production',
    involvedObjectName: 'www-74cb7c986-fgcrl',
    type: { type: 'Normal' } as unknown as string,
    reason: 'Unhealthy',
    message: 'msg',
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    lastTimestamp: undefined,
    involvedObjectKind: undefined,
    involvedObjectNamespace: undefined,
    involvedObjectName: undefined,
    type: undefined,
    reason: undefined,
    message: undefined,
  },
];
