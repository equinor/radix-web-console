import { TLSCertificateModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { dateNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create a TLSCertificateModel object
 */
export const TLSCertificateModelNormalizer: ModelNormalizerType<
  Readonly<TLSCertificateModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<TLSCertificateModel>(props, {
      notBefore: dateNormalizer,
      notAfter: dateNormalizer,
    })
  );
