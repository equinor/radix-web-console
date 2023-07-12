import * as PropTypes from 'prop-types';

import {
  SlackConfigSecretStatusModel,
  SlackConfigSecretStatusModelValidationMap,
} from '../slack-config-secret-status';

export interface ReceiverConfigSecretStatusModel {
  slackConfig?: SlackConfigSecretStatusModel;
}

/* PropTypes validation map for ReceiverConfigSecretStatusModel */
export const ReceiverConfigSecretStatusModelValidationMap: PropTypes.ValidationMap<ReceiverConfigSecretStatusModel> =
  {
    slackConfig: PropTypes.shape(
      SlackConfigSecretStatusModelValidationMap
    ) as PropTypes.Validator<SlackConfigSecretStatusModel>,
  };
