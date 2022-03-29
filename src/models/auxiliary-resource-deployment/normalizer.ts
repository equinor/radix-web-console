import { AuxiliaryResourceDeploymentModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';

/**
 * Create a AuxiliaryResourceDeploymentModel object
 */
export const AuxiliaryResourceDeploymentModelNormalizer: ModelNormalizerType<
  AuxiliaryResourceDeploymentModel
> = (props) => {
  const normalized = { ...(props as AuxiliaryResourceDeploymentModel) };

  normalized.replicaList = normalized.replicaList?.map(
    ReplicaSummaryModelNormalizer
  );

  return Object.freeze(normalized);
};
