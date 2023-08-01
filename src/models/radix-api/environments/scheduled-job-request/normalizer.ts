import { ScheduledJobRequestModel } from '.';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a ScheduledJobRequestModel object
 */
export const ScheduledJobRequestModelNormalizer: ModelNormalizerType<
  Readonly<ScheduledJobRequestModel>
> = (props) =>
  Object.freeze(objectNormalizer<ScheduledJobRequestModel>(props, {}));
