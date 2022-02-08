import { ApplicationRegistrationModel } from '.';

import { ModelNormalizerType } from '../model-types';

/**
 * Create an ApplicationRegistrationModel object
 */
export const ApplicationRegistrationModelNormalizer: ModelNormalizerType<
  ApplicationRegistrationModel
> = (props) => Object.freeze({ ...(props as ApplicationRegistrationModel) });
