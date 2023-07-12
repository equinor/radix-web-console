import * as PropTypes from 'prop-types';

import {
  UpdateSlackConfigSecretsModel,
  UpdateSlackConfigSecretsModelValidationMap,
} from '../update-slack-config-secrets';

export interface UpdateReceiverConfigSecretsModel {
  slackConfig?: UpdateSlackConfigSecretsModel;
}

/* PropTypes validation map for UpdateReceiverConfigSecretsModel */
export const UpdateReceiverConfigSecretsModelValidationMap: PropTypes.ValidationMap<UpdateReceiverConfigSecretsModel> =
  {
    slackConfig: PropTypes.shape(UpdateSlackConfigSecretsModelValidationMap),
  };
