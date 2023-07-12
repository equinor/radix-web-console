import { ComponentSummaryModel } from '.';

import { ComponentType } from '../component-type';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ComponentSummaryModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'component-a',
    image: 'an-image',
    type: ComponentType.component,
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'component-a',
    image: 'an-image',
    type: 'Queued' as ComponentType,
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'component-b',
    image: undefined,
    type: ComponentType.component,
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    image: undefined,
    name: undefined,
    type: undefined,
  },
];
