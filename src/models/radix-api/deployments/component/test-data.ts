import { ComponentModel } from '.';

import { ComponentStatus } from '../component-status';
import { ComponentType } from '../component-type';
import { testData as HorizontalScalingSummaryData } from '../horizontal-scaling-summary/test-data';
import { testData as IdentityData } from '../identity/test-data';
import { testData as OauthAuxiliaryResourceData } from '../oauth-auxiliary-resource/test-data';
import { testData as PortData } from '../port/test-data';
import { ReplicaSummaryNormalizedModel } from '../replica-summary';
import { testData as ReplicaSummaryData } from '../replica-summary/test-data';
import { TestDependencyDataType } from '../../../model-types';

/*
 * TestData array
 *
 * Note: First object should always be valid
 */
export const testData: TestDependencyDataType<ComponentModel> = [
  {
    __testDescription: 'Valid full object',
    name: 'name',
    type: ComponentType.component,
    status: ComponentStatus.ConsistentComponent,
    image: 'image',
    ports: [PortData[0]],
    schedulerPort: 8443,
    scheduledJobPayloadPath: 'scheduledJobPayloadPath',
    secrets: ['secret1', 'secret2'],
    variables: { test: 'name', potato: 'poisonous' },
    replicaList: [
      ReplicaSummaryData[0] as unknown as ReplicaSummaryNormalizedModel,
    ],
    horizontalScalingSummary: HorizontalScalingSummaryData[0],
    oauth2: OauthAuxiliaryResourceData[0],
    identity: IdentityData[0],
  },
  {
    __testDescription: 'Valid partial object',
    name: 'name',
    type: ComponentType.component,
    status: ComponentStatus.ComponentOutdated,
    image: 'image',
  },
  {
    __testDescription: 'Invalid full object',
    __testIsInvalidSample: true,
    name: 'name',
    type: ComponentType.component,
    status: ComponentStatus.ConsistentComponent,
    image: 'image',
    ports: [PortData[0]],
    schedulerPort: 8443,
    scheduledJobPayloadPath: 'scheduledJobPayloadPath',
    secrets: ['secret1', 'secret2'],
    variables: [{ test: 'name' }, { potato: 'poisonous' }] as unknown as Record<
      string,
      string
    >,
    replicaList: [
      ReplicaSummaryData[0] as unknown as ReplicaSummaryNormalizedModel,
    ],
    horizontalScalingSummary: HorizontalScalingSummaryData[0],
    oauth2: OauthAuxiliaryResourceData[0],
  },
  {
    __testDescription: 'Invalid partial object',
    __testIsInvalidSample: true,
    name: 'name',
    type: ComponentStatus.ComponentOutdated as unknown as ComponentType,
    status: ComponentType.component as unknown as ComponentStatus,
    image: 'image',
  },
  {
    __testDescription: 'Invalid empty object',
    __testIsInvalidSample: true,
    name: undefined,
    type: undefined,
    status: undefined,
    image: undefined,
  },
];
