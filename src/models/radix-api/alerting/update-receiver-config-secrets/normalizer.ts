import { UpdateReceiverConfigSecretsModel } from '.';

import { UpdateSlackConfigSecretsModelNormalizer } from '../update-slack-config-secrets/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an UpdateReceiverConfigSecretsModel object
 */
export const UpdateReceiverConfigSecretsModelNormalizer: ModelNormalizerType<
  Readonly<UpdateReceiverConfigSecretsModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      slackConfig: UpdateSlackConfigSecretsModelNormalizer,
    })
  );
