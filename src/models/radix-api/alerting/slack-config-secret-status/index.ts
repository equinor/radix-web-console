import * as PropTypes from 'prop-types';

export interface SlackConfigSecretStatusModel {
  webhookUrlConfigured: boolean;
}

/* PropTypes validation map for SlackConfigSecretStatusModel */
export const SlackConfigSecretStatusModelValidationMap: PropTypes.ValidationMap<SlackConfigSecretStatusModel> =
  {
    webhookUrlConfigured: PropTypes.bool.isRequired,
  };
