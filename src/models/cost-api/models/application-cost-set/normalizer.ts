import { ApplicationCostSetModel } from '.';

import { ApplicationCostModelNormalizer } from '../application-cost/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  filterUndefinedFields,
} from '../../../model-utils';

/**
 * Create an ApplicationCostSetModel object
 */
export const ApplicationCostSetModelNormalizer: ModelNormalizerType<
  ApplicationCostSetModel
> = (props) => {
  const normalized = { ...(props as ApplicationCostSetModel) };

  normalized.from = dateNormalizer(normalized.from);
  normalized.to = dateNormalizer(normalized.to);
  normalized.applicationCosts = arrayNormalizer(
    normalized.applicationCosts,
    ApplicationCostModelNormalizer
  );

  return Object.freeze(filterUndefinedFields(normalized));
};
