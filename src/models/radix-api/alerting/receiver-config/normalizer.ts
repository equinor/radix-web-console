import { ReceiverConfigModel } from '.';

import { SlackConfigModelNormalizer } from '../slack-config/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create a ReceiverConfigModel object
 */
export const ReceiverConfigModelNormalizer: ModelNormalizerType<
  ReceiverConfigModel
> = (props) => {
  const normalized = { ...(props as ReceiverConfigModel) };

  normalized.slackConfig =
    normalized.slackConfig &&
    SlackConfigModelNormalizer(normalized.slackConfig);

  return Object.freeze(filterUndefinedFields(normalized));
};
