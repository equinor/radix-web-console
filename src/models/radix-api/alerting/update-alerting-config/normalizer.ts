import { UpdateAlertingConfigModel } from '.';

import { AlertConfigModelNormalizer } from '../alert-config/normalizer';
import { ReceiverConfigModelNormalizer } from '../receiver-config/normalizer';
import { UpdateReceiverConfigSecretsModelNormalizer } from '../update-receiver-config-secrets/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import {
  arrayNormalizer,
  filterUndefinedFields,
  recordNormalizer,
} from '../../../model-utils';

/**
 * Create an UpdateAlertingConfigModel object
 */
export const UpdateAlertingConfigModelNormalizer: ModelNormalizerType<
  UpdateAlertingConfigModel
> = (props) => {
  const normalized = { ...(props as UpdateAlertingConfigModel) };

  normalized.receivers = recordNormalizer(
    normalized.receivers,
    ReceiverConfigModelNormalizer
  );
  normalized.receiverSecrets = recordNormalizer(
    normalized.receiverSecrets,
    UpdateReceiverConfigSecretsModelNormalizer
  );
  normalized.alerts = arrayNormalizer(
    normalized.alerts,
    AlertConfigModelNormalizer
  );

  return Object.freeze(filterUndefinedFields(normalized));
};
