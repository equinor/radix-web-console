import * as PropTypes from 'prop-types';

export interface ScheduledJobRequestModel {
  deploymentName: string;
}

/* PropTypes validation map for ScheduledJobRequestModel */
export const ScheduledJobRequestModelValidationMap: PropTypes.ValidationMap<ScheduledJobRequestModel> =
  {
    deploymentName: PropTypes.string.isRequired,
  };
