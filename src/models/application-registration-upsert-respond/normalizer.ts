import { ApplicationRegistrationUpsertRespondModel } from '.';
import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an ApplicationRegistrationUpsertRespondModelNormalizer object
 */
export const ApplicationRegistrationUpsertRespondModelNormalizer: ModelNormalizerType<
  ApplicationRegistrationUpsertRespondModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({
      ...(props as ApplicationRegistrationUpsertRespondModel),
    })
  );
