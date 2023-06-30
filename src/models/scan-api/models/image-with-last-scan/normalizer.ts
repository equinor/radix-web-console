import { ImageWithLastScanModel } from '.';

import { ImageScanModelNormalizer } from '../image-scan/normalizer';
import { ImageModelNormalizer } from '../image/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an ImageWithLastScanModel object
 */
export const ImageWithLastScanModelNormalizer: ModelNormalizerType<
  Readonly<ImageWithLastScanModel>
> = (props) =>
  Object.freeze<ImageWithLastScanModel>(
    ImageModelNormalizer(
      ImageScanModelNormalizer(
        objectNormalizer<
          Omit<
            ImageWithLastScanModel,
            keyof (ReturnType<typeof ImageModelNormalizer> &
              ReturnType<typeof ImageScanModelNormalizer>)
          >
        >(props, {})
      )
    )
  );
