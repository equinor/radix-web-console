import { PipelineRunTaskModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create a PipelineRunTaskModel object
 */
export const PipelineRunTaskModelNormalizer: ModelNormalizerType<
  Readonly<PipelineRunTaskModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<PipelineRunTaskModel>(props, {
      started: dateNormalizer,
      ended: dateNormalizer,
    })
  );
