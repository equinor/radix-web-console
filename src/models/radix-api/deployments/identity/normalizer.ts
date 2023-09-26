import { IdentityModel } from '.';

import { AzureIdentityModelNormalizer } from '../azure-identity/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an IdentityModel object
 */
export const IdentityModelNormalizer: ModelNormalizerType<
  Readonly<IdentityModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      azure: AzureIdentityModelNormalizer,
    })
  );
