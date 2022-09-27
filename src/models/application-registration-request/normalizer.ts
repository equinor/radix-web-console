import { ApplicationRegistrationRequestModel } from '.';
import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an ApplicationRegistrationRequestModelNormalizer object
 */
export const ApplicationRegistrationRequestModelNormalizer: ModelNormalizerType<
  ApplicationRegistrationRequestModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({
      ...(props as ApplicationRegistrationRequestModel),
    })
  );
