import { AuxiliaryResourceDeploymentModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { arrayNormalizer, filterUndefinedFields } from '../model-utils';
import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';

/**
 * Create a AuxiliaryResourceDeploymentModel object
 */
export const AuxiliaryResourceDeploymentModelNormalizer: ModelNormalizerType<
  AuxiliaryResourceDeploymentModel
> = (props) => {
  const normalized = { ...(props as AuxiliaryResourceDeploymentModel) };

  normalized.replicaList = arrayNormalizer(
    normalized.replicaList,
    ReplicaSummaryModelNormalizer
  );

  return Object.freeze(filterUndefinedFields(normalized));
};
