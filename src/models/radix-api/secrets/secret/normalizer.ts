import { SecretModel } from '.';

import { TLSCertificateModelNormalizer } from '../tls-certificate/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { arrayNormalizer, filterUndefinedFields } from '../../../model-utils';

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
