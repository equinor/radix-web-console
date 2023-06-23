import * as PropTypes from 'prop-types';

import {
  VulnerabilityModel,
  VulnerabilityModelValidationMap,
} from '../vulnerability';
import {
  VulnerabilitySummaryModel,
  VulnerabilitySummaryModelValidationMap,
} from '../vulnerability-summary';

export interface ImageScanModel {
  scanTime?: Date;
  scanSuccess?: boolean;
  vulnerabilitySummary?: VulnerabilitySummaryModel;
  vulnerabilities?: Array<VulnerabilityModel>;
}

/* PropTypes validation map for ImageScanModel */
export const ImageScanModelValidationMap: PropTypes.ValidationMap<ImageScanModel> =
  {
    scanTime: PropTypes.instanceOf(Date),
    scanSuccess: PropTypes.bool,
    vulnerabilitySummary: PropTypes.shape(
      VulnerabilitySummaryModelValidationMap
    ),
    vulnerabilities: PropTypes.arrayOf(
      PropTypes.shape(
        VulnerabilityModelValidationMap
      ) as PropTypes.Validator<VulnerabilityModel>
    ),
  };
