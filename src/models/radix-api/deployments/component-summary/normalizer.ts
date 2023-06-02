import { ComponentSummaryModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create a ComponentSummaryModel object
 */
export const ComponentSummaryModelNormalizer: ModelNormalizerType<
  ComponentSummaryModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as ComponentSummaryModel) }));
