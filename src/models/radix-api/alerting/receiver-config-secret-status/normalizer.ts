import { ReceiverConfigSecretStatusModel } from '.';

import { SlackConfigSecretStatusModelNormalizer } from '../slack-config-secret-status/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a ReceiverConfigSecretStatusModel object
 */
export const ReceiverConfigSecretStatusModelNormalizer: ModelNormalizerType<
  Readonly<ReceiverConfigSecretStatusModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      slackConfig: SlackConfigSecretStatusModelNormalizer,
    })
  );
