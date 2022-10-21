import { SecretModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';
import { TlsCertificateModelNormalizer } from '../tls-certificate/normalizer';

/**
 * Create a SecretModel object
 */
export const SecretModelNormalizer: ModelNormalizerType<SecretModel> = (
  props
) => {
  const normalized = { ...(props as SecretModel) };
  normalized.tlsCertificate =
    normalized.tlsCertificate &&
    TlsCertificateModelNormalizer(normalized.tlsCertificate);
  return Object.freeze(filterUndefinedFields(normalized));
};
