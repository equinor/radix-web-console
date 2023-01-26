import * as PropTypes from 'prop-types';

export interface SlackConfigModel {
  enabled: boolean;
}

export interface ReceiverConfigModel<T> {
  slackConfig?: T;
}

interface SlackConfigSecretStatusModel {
  webhookUrlConfigured: boolean;
}

interface AlertConfigModel {
  alert: string;
  receiver?: string;
}

interface UpdateSlackConfigSecretModel {
  webhookUrl?: string;
}

export interface AlertingConfigModel {
  enabled: boolean;
  ready: boolean;
  alertNames?: Array<string>;
  alerts?: Array<AlertConfigModel>;
  receivers?: Record<string, ReceiverConfigModel<SlackConfigModel>>;
  receiverSecretStatus?: Record<
    string,
    ReceiverConfigModel<SlackConfigSecretStatusModel>
  >;
}

export interface UpdateAlertingConfigModel {
  alerts: Array<AlertConfigModel>;
  receivers?: Record<string, ReceiverConfigModel<SlackConfigModel>>;
  receiverSecrets?: Record<
    string,
    ReceiverConfigModel<UpdateSlackConfigSecretModel>
  >;
}

const SlackConfigModelValidationMap: PropTypes.ValidationMap<SlackConfigModel> =
  { enabled: PropTypes.bool.isRequired };

const SlackConfigSecretStatusModelValidationMap: PropTypes.ValidationMap<SlackConfigSecretStatusModel> =
  { webhookUrlConfigured: PropTypes.bool.isRequired };

const AlertConfigModelValidationMap: PropTypes.ValidationMap<AlertConfigModel> =
  { alert: PropTypes.string.isRequired, receiver: PropTypes.string };

const UpdateSlackConfigSecretModelValidationMap: PropTypes.ValidationMap<UpdateSlackConfigSecretModel> =
  { webhookUrl: PropTypes.string };

/* PropTypes validation map for AlertingConfigModel */
export const AlertingConfigModelValidationMap: PropTypes.ValidationMap<AlertingConfigModel> =
  {
    enabled: PropTypes.bool.isRequired,
    ready: PropTypes.bool.isRequired,
    alertNames: PropTypes.arrayOf(PropTypes.string),
    alerts: PropTypes.arrayOf(
      PropTypes.shape(
        AlertConfigModelValidationMap
      ) as PropTypes.Validator<AlertConfigModel>
    ),
    receivers: PropTypes.objectOf(
      PropTypes.shape<
        PropTypes.ValidationMap<ReceiverConfigModel<SlackConfigModel>>
      >({
        slackConfig: PropTypes.shape(
          SlackConfigModelValidationMap
        ) as PropTypes.Validator<SlackConfigModel>,
      })
    ),
    receiverSecretStatus: PropTypes.objectOf(
      PropTypes.shape<
        PropTypes.ValidationMap<
          ReceiverConfigModel<SlackConfigSecretStatusModel>
        >
      >({
        slackConfig: PropTypes.shape(SlackConfigSecretStatusModelValidationMap)
          .isRequired as PropTypes.Validator<SlackConfigSecretStatusModel>,
      })
    ),
  };

/* PropTypes validation map for UpdateAlertingConfigModel */
export const UpdateAlertingConfigModelValidationMap: PropTypes.ValidationMap<UpdateAlertingConfigModel> =
  {
    alerts: PropTypes.arrayOf(
      PropTypes.shape(
        AlertConfigModelValidationMap
      ) as PropTypes.Validator<AlertConfigModel>
    ).isRequired,
    receivers: PropTypes.objectOf(
      PropTypes.shape<
        PropTypes.ValidationMap<ReceiverConfigModel<SlackConfigModel>>
      >({
        slackConfig: PropTypes.shape(
          SlackConfigModelValidationMap
        ) as PropTypes.Validator<SlackConfigModel>,
      }).isRequired
    ),
    receiverSecrets: PropTypes.objectOf(
      PropTypes.shape<
        PropTypes.ValidationMap<
          ReceiverConfigModel<UpdateSlackConfigSecretModel>
        >
      >({
        slackConfig: PropTypes.shape(UpdateSlackConfigSecretModelValidationMap)
          .isRequired,
      })
    ),
  };
