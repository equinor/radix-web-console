import { ApplicationRegistrationUpsertResponseModel } from '.';

import { ApplicationRegistrationModelNormalizer } from '../application-registration/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an ApplicationRegistrationUpsertResponseModel object
 */
export const ApplicationRegistrationUpsertResponseModelNormalizer: ModelNormalizerType<
  ApplicationRegistrationUpsertResponseModel
> = (props) => {
  const normalized = {
    ...(props as ApplicationRegistrationUpsertResponseModel),
  };

  normalized.applicationRegistration =
    normalized.applicationRegistration &&
    ApplicationRegistrationModelNormalizer(normalized.applicationRegistration);

  return Object.freeze(filterUndefinedFields(normalized));
};
