import { ApplicationRegistrationModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an ApplicationRegistrationModel object
 */
export const ApplicationRegistrationModelNormalizer: ModelNormalizerType<
  ApplicationRegistrationModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({ ...(props as ApplicationRegistrationModel) })
  );
