import * as PropTypes from 'prop-types';

export interface ScheduledBatchRequestModel {
  deploymentName: string;
}

/* PropTypes validation map for ScheduledJobRequestModel */
export const ScheduledBatchRequestModelValidationMap: PropTypes.ValidationMap<ScheduledBatchRequestModel> =
  {
    deploymentName: PropTypes.string.isRequired,
  };
