import { ComponentSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';

/**
 * Create a ComponentSummaryModel object
 */
export const ComponentSummaryModelNormalizer: ModelNormalizerType<
  ComponentSummaryModel
> = (props) => Object.freeze({ ...(props as ComponentSummaryModel) });
