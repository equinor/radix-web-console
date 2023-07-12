import { StepModel } from './index';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create a StepModel object
 */
export const StepModelNormalizer: ModelNormalizerType<Readonly<StepModel>> = (
  props
) =>
  Object.freeze(
    objectNormalizer<StepModel>(props, {
      started: dateNormalizer,
      ended: dateNormalizer,
    })
  );
