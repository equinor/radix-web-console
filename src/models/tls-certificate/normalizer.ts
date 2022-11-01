import { TLSCertificateModel } from '.';
import { ModelNormalizerType } from '../model-types';
import { dateNormalizer, filterUndefinedFields } from '../model-utils';

/**
 * Create a TLSCertificateModel object
 */
export const TLSCertificateModelNormalizer: ModelNormalizerType<
  TLSCertificateModel
> = (props) => {
  const normalized = { ...(props as TLSCertificateModel) };
  normalized.notBefore = dateNormalizer(normalized.notBefore);
  normalized.notAfter = dateNormalizer(normalized.notAfter);
  return Object.freeze(filterUndefinedFields(normalized));
};
