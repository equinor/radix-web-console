import { OAuthAuxiliaryResourceModel } from '.';

import { AuxiliaryResourceDeploymentModelNormalizer } from '../auxiliary-resource-deployment/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an OAuthAuxiliaryResourceModel object
 */
export const OAuthAuxiliaryResourceModelNormalizer: ModelNormalizerType<
  Readonly<OAuthAuxiliaryResourceModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      deployment: AuxiliaryResourceDeploymentModelNormalizer,
    })
  );
