import * as PropTypes from 'prop-types';

export interface HorizontalScalingSummaryModel {
  minReplicas: number;
  maxReplicas: number;
  currentCPUUtilizationPercentage?: number;
  targetCPUUtilizationPercentage?: number;
  currentMemoryUtilizationPercentage?: number;
  targetMemoryUtilizationPercentage?: number;
}

/* PropTypes validation map for HorizontalScalingSummaryModel */
export const HorizontalScalingSummaryModelValidationMap: PropTypes.ValidationMap<HorizontalScalingSummaryModel> =
  {
    minReplicas: PropTypes.number.isRequired,
    maxReplicas: PropTypes.number.isRequired,
    currentCPUUtilizationPercentage: PropTypes.number,
    targetCPUUtilizationPercentage: PropTypes.number,
    currentMemoryUtilizationPercentage: PropTypes.number,
    targetMemoryUtilizationPercentage: PropTypes.number,
  };
