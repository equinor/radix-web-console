import * as PropTypes from 'prop-types';

import {
  VulnerabilitySummaryModel,
  VulnerabilitySummaryModelValidationMap,
} from '../vulnerability-summary';

export interface EnvironmentComponentScanModel {
  image: string;
  baseImage: string;
  scanSuccess?: boolean;
  scanTime?: Date;
  vulnerabilitySummary?: VulnerabilitySummaryModel;
}

export interface EnvironmentScanSummaryModel {
  name: string;
  components?: Record<string, EnvironmentComponentScanModel>;
  jobs?: Record<string, EnvironmentComponentScanModel>;
}

/* PropTypes validation map for EnvironmentComponentScanModel */
export const EnvironmentComponentScanModelValidationMap: PropTypes.ValidationMap<EnvironmentComponentScanModel> =
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
    name: PropTypes.string.isRequired,
    components: PropTypes.objectOf<EnvironmentComponentScanModel>(
      PropTypes.shape(
        EnvironmentComponentScanModelValidationMap
      ) as PropTypes.Requireable<EnvironmentComponentScanModel>
    ),
    jobs: PropTypes.objectOf<EnvironmentComponentScanModel>(
      PropTypes.shape(
        EnvironmentComponentScanModelValidationMap
      ) as PropTypes.Requireable<EnvironmentComponentScanModel>
    ),
  };
