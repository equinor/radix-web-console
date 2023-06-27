import { ImageWithLastScanModel } from '.';

import { ImageModelNormalizer } from '../image/normalizer';
import { ImageScanModelNormalizer } from '../image-scan/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an ImageWithLastScanModel object
 */
export const ImageWithLastScanModelNormalizer: ModelNormalizerType<
  ImageWithLastScanModel
> = (props) => {
  const normalized = ImageModelNormalizer(
    ImageScanModelNormalizer({ ...(props as {}) })
  ) as ImageWithLastScanModel;

  return Object.freeze(filterUndefinedFields(normalized));
};
