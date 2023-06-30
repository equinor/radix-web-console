import { SecretModel } from '.';

import { TLSCertificateModelNormalizer } from '../tls-certificate/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { arrayNormalizer, objectNormalizer } from '../../../model-utils';

/**
 * Create a SecretModel object
 */
export const SecretModelNormalizer: ModelNormalizerType<
  Readonly<SecretModel>
> = (props) =>
  Object.freeze(
    objectNormalizer<SecretModel>(props, {
      tlsCertificates: (x: []) =>
        arrayNormalizer(x, TLSCertificateModelNormalizer),
    })
  );
