import * as PropTypes from 'prop-types';

import { ImageModel, ImageModelValidationMap } from '../image';
import { ImageScanModel, ImageScanModelValidationMap } from '../image-scan';

export interface ImageWithLastScanModel extends ImageModel, ImageScanModel {}

/* PropTypes validation map for ImageWithLastScanModel */
export const ImageWithLastScanModelValidationMap: PropTypes.ValidationMap<ImageWithLastScanModel> =
  {
    ...ImageModelValidationMap,
    ...ImageScanModelValidationMap,
  };
