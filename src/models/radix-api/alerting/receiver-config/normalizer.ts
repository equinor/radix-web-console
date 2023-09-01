import { ReceiverConfigModel } from '.';

import { SlackConfigModelNormalizer } from '../slack-config/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a ReceiverConfigModel object
 */
export const ReceiverConfigModelNormalizer: ModelNormalizerType<
  Readonly<ReceiverConfigModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, { slackConfig: SlackConfigModelNormalizer })
  );
