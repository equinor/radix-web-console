import * as PropTypes from 'prop-types';

import {
  VulnerabilitySummaryModel,
  VulnerabilitySummaryModelValidationMap,
} from '../vulnerability-summary';

export interface EnvironmentScanObjectModel {
  image: string;
  baseImage: string;
  scanSuccess?: boolean;
  scanTime?: Date;
  vulnerabilitySummary?: VulnerabilitySummaryModel;
}

export interface EnvironmentScanSummaryModel {
  components?: { [key: string]: EnvironmentScanObjectModel };
  jobs?: { [key: string]: EnvironmentScanObjectModel };
}

/* PropTypes validation map for EnvironmentScanObjectModel */
export const EnvironmentScanObjectModelValidationMap: PropTypes.ValidationMap<EnvironmentScanObjectModel> =
  {
    image: PropTypes.string.isRequired,
    baseImage: PropTypes.string.isRequired,
    scanSuccess: PropTypes.bool,
    scanTime: PropTypes.instanceOf(Date),
    vulnerabilitySummary: PropTypes.shape(
      VulnerabilitySummaryModelValidationMap
    ),
  };

/* PropTypes validation map for EnvironmentScanSummaryModel */
export const EnvironmentScanSummaryModelValidationMap: PropTypes.ValidationMap<EnvironmentScanSummaryModel> =
  {
    components: PropTypes.objectOf<EnvironmentScanObjectModel>(
      PropTypes.shape(
        EnvironmentScanObjectModelValidationMap
      ) as PropTypes.Requireable<EnvironmentScanObjectModel>
    ),
    jobs: PropTypes.objectOf<EnvironmentScanObjectModel>(
      PropTypes.shape(
        EnvironmentScanObjectModelValidationMap
      ) as PropTypes.Requireable<EnvironmentScanObjectModel>
    ),
  };
