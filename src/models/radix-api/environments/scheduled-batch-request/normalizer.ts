import { ScheduledBatchRequestModel } from '.';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a ScheduledBatchRequestModel object
 */
export const ScheduledBatchRequestModelNormalizer: ModelNormalizerType<
  Readonly<ScheduledBatchRequestModel>
> = (props) =>
  Object.freeze(objectNormalizer<ScheduledBatchRequestModel>(props, {}));
