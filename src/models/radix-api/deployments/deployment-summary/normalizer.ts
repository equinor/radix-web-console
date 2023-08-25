import { DeploymentSummaryModel } from '.';

import { ComponentSummaryModelNormalizer } from '../component-summary/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  objectNormalizer,
} from '../../../model-utils';

/**
 * Create a DeploymentSummaryModel object
 */
export const DeploymentSummaryModelNormalizer: ModelNormalizerType<
  Readonly<DeploymentSummaryModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      components: (x) => arrayNormalizer(x, ComponentSummaryModelNormalizer),
      activeFrom: dateNormalizer,
      activeTo: dateNormalizer,
    })
  );
