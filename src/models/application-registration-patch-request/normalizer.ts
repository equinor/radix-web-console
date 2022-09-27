import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';
import { ApplicationRegistrationPatchRequestModel } from './index';

/**
 * Create an ApplicationRegistrationRequestModelNormalizer object
 */
export const ApplicationRegistrationPatchRequestModelNormalizer: ModelNormalizerType<
  ApplicationRegistrationPatchRequestModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({
      ...(props as ApplicationRegistrationPatchRequestModel),
    })
  );
