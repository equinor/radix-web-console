import { SecretModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { arrayNormalizer, filterUndefinedFields } from '../model-utils';
import { TLSCertificateModelNormalizer } from '../tls-certificate/normalizer';

/**
 * Create a SecretModel object
 */
export const SecretModelNormalizer: ModelNormalizerType<SecretModel> = (
  props
) => {
  const normalized = { ...(props as SecretModel) };
  normalized.tlsCertificates = arrayNormalizer(
    normalized.tlsCertificates,
    TLSCertificateModelNormalizer
  );
  return Object.freeze(filterUndefinedFields(normalized));
};
