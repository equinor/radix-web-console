import { ReceiverConfigSecretStatusModel } from '.';

import { SlackConfigSecretStatusModelNormalizer } from '../slack-config-secret-status/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create a ReceiverConfigSecretStatusModel object
 */
export const ReceiverConfigSecretStatusModelNormalizer: ModelNormalizerType<
  ReceiverConfigSecretStatusModel
> = (props) => {
  const normalized = { ...(props as ReceiverConfigSecretStatusModel) };

  normalized.slackConfig =
    normalized.slackConfig &&
    SlackConfigSecretStatusModelNormalizer(normalized.slackConfig);

  return Object.freeze(filterUndefinedFields(normalized));
};
