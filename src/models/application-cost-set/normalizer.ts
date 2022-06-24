import { ApplicationCostSetModel } from '.';

import { ApplicationCostModelNormalizer } from '../application-cost/normalizer';
import { ModelNormalizerType } from '../model-types';
import { arrayNormalizer } from '../model-utils';

/**
 * Create an ApplicationCostSetModel object
 */
export const ApplicationCostSetModelNormalizer: ModelNormalizerType<
  ApplicationCostSetModel
> = (props) => {
  const normalized = { ...(props as ApplicationCostSetModel) };

  normalized.applicationCosts = arrayNormalizer(
    normalized.applicationCosts,
    ApplicationCostModelNormalizer
  );

  return Object.freeze(normalized);
};
