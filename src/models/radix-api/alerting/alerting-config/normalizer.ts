import { AlertingConfigModel } from '.';

import { AlertConfigModelNormalizer } from '../alert-config/normalizer';
import { ReceiverConfigSecretStatusModelNormalizer } from '../receiver-config-secret-status/normalizer';
import { ReceiverConfigModelNormalizer } from '../receiver-config/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  objectNormalizer,
  recordNormalizer,
} from '../../../model-utils';

/**
 * Create an AlertingConfigModel object
 */
export const AlertingConfigModelNormalizer: ModelNormalizerType<
  Readonly<AlertingConfigModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      receivers: (x) => recordNormalizer(x, ReceiverConfigModelNormalizer),
      receiverSecretStatus: (x) =>
        recordNormalizer(x, ReceiverConfigSecretStatusModelNormalizer),
      alerts: (x) => arrayNormalizer(x, AlertConfigModelNormalizer),
    })
  );
