import { TLSCertificateModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { dateNormalizer, filterUndefinedFields } from '../model-utils';

/**
 * Create a TlsCertificateStatusModel object
 */
export const TlsCertificateModelNormalizer: ModelNormalizerType<
  TLSCertificateModel
> = (props) => {
  const normalized = { ...(props as TLSCertificateModel) };
  normalized.notBefore = dateNormalizer(normalized.notBefore);
  normalized.notAfter = dateNormalizer(normalized.notAfter);
  return Object.freeze(filterUndefinedFields(normalized));
};
