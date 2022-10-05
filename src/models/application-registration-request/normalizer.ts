import { ApplicationRegistrationRequestModel } from '.';

import { ApplicationRegistrationModelNormalizer } from '../application-registration/normalizer';
import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an ApplicationRegistrationRequestModel object
 */
export const ApplicationRegistrationRequestModelNormalizer: ModelNormalizerType<
  ApplicationRegistrationRequestModel
> = (props) => {
  const normalized = { ...(props as ApplicationRegistrationRequestModel) };

  normalized.applicationRegistration =
    normalized.applicationRegistration &&
    ApplicationRegistrationModelNormalizer(normalized.applicationRegistration);

  return Object.freeze(filterUndefinedFields(normalized));
};
