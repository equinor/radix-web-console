import * as PropTypes from 'prop-types';

import {
  AlertConfigModel,
  AlertConfigModelValidationMap,
} from '../alert-config';
import {
  ReceiverConfigModel,
  ReceiverConfigModelValidationMap,
} from '../receiver-config';
import {
  UpdateReceiverConfigSecretsModel,
  UpdateReceiverConfigSecretsModelValidationMap,
} from '../update-receiver-config-secrets';

export interface UpdateAlertingConfigModel {
  receivers?: Record<string, ReceiverConfigModel>;
  receiverSecrets?: Record<string, UpdateReceiverConfigSecretsModel>;
  alerts: Array<AlertConfigModel>;
}

/* PropTypes validation map for UpdateAlertingConfigModel */
export const UpdateAlertingConfigModelValidationMap: PropTypes.ValidationMap<UpdateAlertingConfigModel> =
  {
    receivers: PropTypes.objectOf(
      PropTypes.shape(ReceiverConfigModelValidationMap)
    ),
    receiverSecrets: PropTypes.objectOf(
      PropTypes.shape(UpdateReceiverConfigSecretsModelValidationMap)
    ),
    alerts: PropTypes.arrayOf(
      PropTypes.shape(
        AlertConfigModelValidationMap
      ) as PropTypes.Validator<AlertConfigModel>
    ).isRequired,
  };
