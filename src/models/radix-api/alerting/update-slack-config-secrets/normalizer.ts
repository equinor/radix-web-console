import { UpdateSlackConfigSecretsModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an UpdateSlackConfigSecretsModel object
 */
export const UpdateSlackConfigSecretsModelNormalizer: ModelNormalizerType<
  UpdateSlackConfigSecretsModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({ ...(props as UpdateSlackConfigSecretsModel) })
  );
