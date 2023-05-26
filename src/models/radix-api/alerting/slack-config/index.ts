import * as PropTypes from 'prop-types';

export interface SlackConfigModel {
  enabled: boolean;
}

/* PropTypes validation map for SlackConfigModel */
export const SlackConfigModelValidationMap: PropTypes.ValidationMap<SlackConfigModel> =
  {
    enabled: PropTypes.bool.isRequired,
  };
