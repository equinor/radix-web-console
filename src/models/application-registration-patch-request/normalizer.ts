import { ApplicationRegistrationPatchRequestModel } from './index';

import { ApplicationRegistrationPatchModelNormalizer } from '../application-registration-patch/normalizer';
import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an ApplicationRegistrationPatchRequestModel object
 */
export const ApplicationRegistrationPatchRequestModelNormalizer: ModelNormalizerType<
  ApplicationRegistrationPatchRequestModel
> = (props) => {
  const normalized = { ...(props as ApplicationRegistrationPatchRequestModel) };

  normalized.applicationRegistrationPatch =
    normalized.applicationRegistrationPatch &&
    ApplicationRegistrationPatchModelNormalizer(
      normalized.applicationRegistrationPatch
    );

  return Object.freeze(filterUndefinedFields(normalized));
};
