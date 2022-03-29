import { OAuthAuxiliaryResourceModel } from '.';

import { AuxiliaryResourceDeploymentModelNormalizer } from '../auxiliary-resource-deployment/normalizer';
import { ModelNormalizerType } from '../model-types';

/**
 * Create an OAuthAuxiliaryResourceModelNormalizer object
 */
export const OAuthAuxiliaryResourceModelNormalizer: ModelNormalizerType<
  OAuthAuxiliaryResourceModel
> = (props) => {
  const normalized = { ...(props as OAuthAuxiliaryResourceModel) };

  normalized.deployment =
    normalized.deployment &&
    AuxiliaryResourceDeploymentModelNormalizer(normalized.deployment);

  return Object.freeze(normalized);
};
