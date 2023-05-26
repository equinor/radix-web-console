import * as PropTypes from 'prop-types';

export interface AlertConfigModel {
  alert: string;
  receiver: string;
}

/* PropTypes validation map for AlertConfigModel */
export const AlertConfigModelValidationMap: PropTypes.ValidationMap<AlertConfigModel> =
  {
    alert: PropTypes.string.isRequired,
    receiver: PropTypes.string.isRequired,
  };
