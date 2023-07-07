import { PipelineRunModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create a PipelineRunModel object
 */
export const PipelineRunModelNormalizer: ModelNormalizerType<
  Readonly<PipelineRunModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<PipelineRunModel>(props, {
      started: dateNormalizer,
      ended: dateNormalizer,
    })
  );
