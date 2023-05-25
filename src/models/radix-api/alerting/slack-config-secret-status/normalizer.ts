import { SlackConfigSecretStatusModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create a SlackConfigSecretStatusModel object
 */
export const SlackConfigSecretStatusModelNormalizer: ModelNormalizerType<
  SlackConfigSecretStatusModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({ ...(props as SlackConfigSecretStatusModel) })
  );
