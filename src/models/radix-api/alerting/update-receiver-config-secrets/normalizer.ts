import { UpdateReceiverConfigSecretsModel } from '.';

import { UpdateSlackConfigSecretsModelNormalizer } from '../update-slack-config-secrets/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an UpdateReceiverConfigSecretsModel object
 */
export const UpdateReceiverConfigSecretsModelNormalizer: ModelNormalizerType<
  UpdateReceiverConfigSecretsModel
> = (props) => {
  const normalized = { ...(props as UpdateReceiverConfigSecretsModel) };

  normalized.slackConfig =
    normalized.slackConfig &&
    UpdateSlackConfigSecretsModelNormalizer(normalized.slackConfig);

  return Object.freeze(filterUndefinedFields(normalized));
};
