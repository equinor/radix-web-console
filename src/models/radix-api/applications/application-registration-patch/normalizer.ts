import { ApplicationRegistrationPatchModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an ApplicationRegistrationPatchModel object
 */
export const ApplicationRegistrationPatchModelNormalizer: ModelNormalizerType<
  Readonly<ApplicationRegistrationPatchModel>
> = (props) => Object.freeze(objectNormalizer(props, {}));
