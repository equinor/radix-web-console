import { ApplicationRegistrationPatchModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an ApplicationRegistrationPatchModel object
 */
export const ApplicationRegistrationPatchModelNormalizer: ModelNormalizerType<
  ApplicationRegistrationPatchModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({ ...(props as ApplicationRegistrationPatchModel) })
  );
