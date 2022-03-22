import { ApplicationCostSetModel } from '.';

import { ApplicationCostModelNormalizer } from '../application-cost/normalizer';
import { ModelNormalizerType } from '../model-types';

/**
 * Create an ApplicationCostSetModel object
 */
export const ApplicationCostSetModelNormalizer: ModelNormalizerType<
  ApplicationCostSetModel
> = (props) => {
  const normalized = { ...(props as ApplicationCostSetModel) };

  normalized.applicationCosts = normalized.applicationCosts?.map(
    ApplicationCostModelNormalizer
  );

  return Object.freeze(normalized);
};
