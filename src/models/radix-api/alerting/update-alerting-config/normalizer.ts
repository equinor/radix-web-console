import { UpdateAlertingConfigModel } from '.';

import { AlertConfigModelNormalizer } from '../alert-config/normalizer';
import { ReceiverConfigModelNormalizer } from '../receiver-config/normalizer';
import { UpdateReceiverConfigSecretsModelNormalizer } from '../update-receiver-config-secrets/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  objectNormalizer,
  recordNormalizer,
} from '../../../model-utils';

/**
 * Create an UpdateAlertingConfigModel object
 */
export const UpdateAlertingConfigModelNormalizer: ModelNormalizerType<
  Readonly<UpdateAlertingConfigModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      receivers: (x: {}) => recordNormalizer(x, ReceiverConfigModelNormalizer),
      receiverSecrets: (x: {}) =>
        recordNormalizer(x, UpdateReceiverConfigSecretsModelNormalizer),
      alerts: (x: []) => arrayNormalizer(x, AlertConfigModelNormalizer),
    })
  );
