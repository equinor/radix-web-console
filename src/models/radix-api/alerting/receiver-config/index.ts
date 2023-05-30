import * as PropTypes from 'prop-types';

import {
  SlackConfigModel,
  SlackConfigModelValidationMap,
} from '../slack-config';

export interface ReceiverConfigModel {
  slackConfig?: SlackConfigModel;
}

/* PropTypes validation map for ReceiverConfigModel */
export const ReceiverConfigModelValidationMap: PropTypes.ValidationMap<ReceiverConfigModel> =
  {
    slackConfig: PropTypes.shape(
      SlackConfigModelValidationMap
    ) as PropTypes.Validator<SlackConfigModel>,
  };
