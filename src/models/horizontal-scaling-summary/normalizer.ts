import { HorizontalScalingSummaryModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create a HorizontalScalingSummaryModel object
 */
export const HorizontalScalingSummaryModelNormalizer: ModelNormalizerType<
  HorizontalScalingSummaryModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({ ...(props as HorizontalScalingSummaryModel) })
  );
