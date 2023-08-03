import { SlackConfigSecretStatusModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a SlackConfigSecretStatusModel object
 */
export const SlackConfigSecretStatusModelNormalizer: ModelNormalizerType<
  Readonly<SlackConfigSecretStatusModel>
> = (props) => Object.freeze(objectNormalizer(props, {}));
