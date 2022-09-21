import {
  ApplicationRegistrationUpsertResultModel,
} from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an ApplicationRegistrationUpsertResultModel object
 */
export const ApplicationRegistrationUpsertResulModelNormalizer: ModelNormalizerType<
  ApplicationRegistrationUpsertResultModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({ ...(props as ApplicationRegistrationUpsertResultModel) })
  );
