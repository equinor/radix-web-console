import { HorizontalScalingSummaryModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a HorizontalScalingSummaryModel object
 */
export const HorizontalScalingSummaryModelNormalizer: ModelNormalizerType<
  Readonly<HorizontalScalingSummaryModel>
> = (props) =>
  Object.freeze(objectNormalizer<HorizontalScalingSummaryModel>(props, {}));
