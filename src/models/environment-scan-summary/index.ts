import * as PropTypes from 'prop-types';

import {
  VulnerabilitySummaryModel,
  VulnerabilitySummaryModelValidationMap,
} from '../vulnerability-summary';

export interface ComponentScanModel {
  image: string;
  baseImage: string;
  scanSuccess?: boolean;
  scanTime?: Date;
  vulnerabilitySummary?: VulnerabilitySummaryModel;
}

export interface EnvironmentScanSummaryModel {
  components?: { [key: string]: ComponentScanModel };
  jobs?: { [key: string]: ComponentScanModel };
}

/* PropTypes validation map for ComponentScanModel */
export const ComponentScanModelValidationMap: PropTypes.ValidationMap<ComponentScanModel> =
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
    components: PropTypes.objectOf<ComponentScanModel>(
      PropTypes.shape(
        ComponentScanModelValidationMap
      ) as PropTypes.Requireable<ComponentScanModel>
    ),
    jobs: PropTypes.objectOf<ComponentScanModel>(
      PropTypes.shape(
        ComponentScanModelValidationMap
      ) as PropTypes.Requireable<ComponentScanModel>
    ),
  };
