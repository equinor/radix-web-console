import { PipelineRunTaskStepModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create a PipelineRunTaskStepModel object
 */
export const PipelineRunTaskStepModelNormalizer: ModelNormalizerType<
  Readonly<PipelineRunTaskStepModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      started: dateNormalizer,
      ended: dateNormalizer,
    })
  );
