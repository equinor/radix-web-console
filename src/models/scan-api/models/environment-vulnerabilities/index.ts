import * as PropTypes from 'prop-types';

import {
  ImageWithLastScanModel,
  ImageWithLastScanModelValidationMap,
} from '../image-with-last-scan';

export interface EnvironmentVulnerabilitiesModel {
  name: string;
  components?: Record<string, ImageWithLastScanModel>;
  jobs?: Record<string, ImageWithLastScanModel>;
}

/* PropTypes validation map for EnvironmentVulnerabilitiesModel */
export const EnvironmentVulnerabilitiesModelValidationMap: PropTypes.ValidationMap<EnvironmentVulnerabilitiesModel> =
  {
    name: PropTypes.string.isRequired,
    components: PropTypes.objectOf<ImageWithLastScanModel>(
      PropTypes.shape(
        ImageWithLastScanModelValidationMap
      ) as PropTypes.Validator<ImageWithLastScanModel>
    ),
    jobs: PropTypes.objectOf<ImageWithLastScanModel>(
      PropTypes.shape(
        ImageWithLastScanModelValidationMap
      ) as PropTypes.Validator<ImageWithLastScanModel>
    ),
  };
