import { DeploymentModel } from '.';

import { ComponentModelNormalizer } from '../component/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  objectNormalizer,
} from '../../../model-utils';

/**
 * Create a DeploymentModel object
 */
export const DeploymentModelNormalizer: ModelNormalizerType<
  Readonly<DeploymentModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<DeploymentModel>(props, {
      components: (x: []) => arrayNormalizer(x, ComponentModelNormalizer),
      activeFrom: dateNormalizer,
      activeTo: dateNormalizer,
    })
  );
