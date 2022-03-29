import { HorizontalScalingSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';

/**
 * Create a HorizontalScalingSummaryModel object
 */
export const HorizontalScalingSummaryModelNormalizer: ModelNormalizerType<
  HorizontalScalingSummaryModel
> = (props) => Object.freeze({ ...(props as HorizontalScalingSummaryModel) });
