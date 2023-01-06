import { DeploymentSummaryModel } from '.';

import { ComponentSummaryModelNormalizer } from '../component-summary/normalizer';
import { ModelNormalizerType } from '../model-types';
import {
  arrayNormalizer,
  dateNormalizer,
  filterUndefinedFields,
} from '../model-utils';

/**
 * Create a DeploymentSummaryModel object
 */
export const DeploymentSummaryModelNormalizer: ModelNormalizerType<
  DeploymentSummaryModel
> = (props) => {
  const normalized = { ...(props as DeploymentSummaryModel) };

  normalized.components = arrayNormalizer(
    normalized.components,
    ComponentSummaryModelNormalizer
  );
  normalized.activeFrom = dateNormalizer(normalized.activeFrom);
  normalized.activeTo = dateNormalizer(normalized.activeTo);

  return Object.freeze(filterUndefinedFields(normalized));
};
