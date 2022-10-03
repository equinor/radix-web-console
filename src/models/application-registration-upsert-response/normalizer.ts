import { ApplicationRegistrationUpsertResponseModel } from '.';
import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an ApplicationRegistrationUpsertResponseModelNormalizer object
 */
export const ApplicationRegistrationUpsertResponseModelNormalizer: ModelNormalizerType<
  ApplicationRegistrationUpsertResponseModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({
      ...(props as ApplicationRegistrationUpsertResponseModel),
    })
  );
