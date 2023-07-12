import { AzureIdentityModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an AzureIdentityModel object
 */
export const AzureIdentityModelNormalizer: ModelNormalizerType<
  Readonly<AzureIdentityModel>
> = (props) => Object.freeze(objectNormalizer<AzureIdentityModel>(props, {}));
