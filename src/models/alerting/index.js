import * as PropTypes from 'prop-types';

export const AlertConfigModel = Object.freeze({
  receiver: PropTypes.string,
  alert: PropTypes.string.isRequired,
});

export const SlackConfigModel = Object.freeze({
  enabled: PropTypes.bool.isRequired,
});

export const ReceiverConfigModel = Object.freeze({
  slackConfig: PropTypes.shape(SlackConfigModel).isRequired,
});

export const SlackConfigSecretStatusModel = Object.freeze({
  webhookUrlConfigured: PropTypes.bool.isRequired,
});

export const ReceiverConfigSecretStatusModel = Object.freeze({
  slackConfig: PropTypes.shape(SlackConfigSecretStatusModel).isRequired,
});

export const AlertingConfigModel = Object.freeze({
  enabled: PropTypes.bool.isRequired,
  ready: PropTypes.bool.isRequired,
  receivers: PropTypes.objectOf(PropTypes.shape(ReceiverConfigModel)),
  receiverSecretStatus: PropTypes.objectOf(
    PropTypes.shape(ReceiverConfigSecretStatusModel)
  ),
  alerts: PropTypes.arrayOf(PropTypes.shape(AlertConfigModel)),
  alertNames: PropTypes.arrayOf(PropTypes.string),
});
