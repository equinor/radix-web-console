import { UpdateSlackConfigSecretsModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an UpdateSlackConfigSecretsModel object
 */
export const UpdateSlackConfigSecretsModelNormalizer: ModelNormalizerType<
  Readonly<UpdateSlackConfigSecretsModel>
> = (props) => Object.freeze(objectNormalizer(props, {}));
