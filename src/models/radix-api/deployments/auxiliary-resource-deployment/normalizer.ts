import { AuxiliaryResourceDeploymentModel } from '.';

import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { arrayNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create an AuxiliaryResourceDeploymentModel object
 */
export const AuxiliaryResourceDeploymentModelNormalizer: ModelNormalizerType<
  Readonly<AuxiliaryResourceDeploymentModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<AuxiliaryResourceDeploymentModel>(props, {
      replicaList: (x: []) => arrayNormalizer(x, ReplicaSummaryModelNormalizer),
    })
  );
