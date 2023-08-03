import { DeploymentItemModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create a DeploymentItemModel object
 */
export const DeploymentItemModelNormalizer: ModelNormalizerType<
  Readonly<DeploymentItemModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      activeFrom: dateNormalizer,
      activeTo: dateNormalizer,
    })
  );
