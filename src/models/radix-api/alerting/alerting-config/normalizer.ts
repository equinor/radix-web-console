import { AlertingConfigModel } from '.';

import { AlertConfigModelNormalizer } from '../alert-config/normalizer';
import { ReceiverConfigModelNormalizer } from '../receiver-config/normalizer';
import { ReceiverConfigSecretStatusModelNormalizer } from '../receiver-config-secret-status/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  filterUndefinedFields,
  recordNormalizer,
} from '../../../model-utils';

/**
 * Create an AlertingConfigModel object
 */
export const AlertingConfigModelNormalizer: ModelNormalizerType<
  AlertingConfigModel
> = (props) => {
  const normalized = { ...(props as AlertingConfigModel) };

  normalized.receivers = recordNormalizer(
    normalized.receivers,
    ReceiverConfigModelNormalizer
  );
  normalized.receiverSecretStatus = recordNormalizer(
    normalized.receiverSecretStatus,
    ReceiverConfigSecretStatusModelNormalizer
  );
  normalized.alerts = arrayNormalizer(
    normalized.alerts,
    AlertConfigModelNormalizer
  );

  return Object.freeze(filterUndefinedFields(normalized));
};
