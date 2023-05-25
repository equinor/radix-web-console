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
  ReceiverConfigSecretStatusModel,
  ReceiverConfigSecretStatusModelValidationMap,
} from '../receiver-config-secret-status';

export interface AlertingConfigModel {
  enabled: boolean;
  ready: boolean;
  receivers?: Record<string, ReceiverConfigModel>;
  receiverSecretStatus?: Record<string, ReceiverConfigSecretStatusModel>;
  alerts?: Array<AlertConfigModel>;
  alertNames?: Array<string>;
}

/* PropTypes validation map for AlertingConfigModel */
export const AlertingConfigModelValidationMap: PropTypes.ValidationMap<AlertingConfigModel> =
  {
    enabled: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
    receivers: PropTypes.objectOf(
      PropTypes.shape(ReceiverConfigModelValidationMap)
    ),
    receiverSecretStatus: PropTypes.objectOf(
      PropTypes.shape(ReceiverConfigSecretStatusModelValidationMap)
    ),
    alerts: PropTypes.arrayOf(
      PropTypes.shape(
        AlertConfigModelValidationMap
      ) as PropTypes.Validator<AlertConfigModel>
    ),
    alertNames: PropTypes.arrayOf(PropTypes.string),
  };
