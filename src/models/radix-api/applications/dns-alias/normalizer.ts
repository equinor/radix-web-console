import { DNSAliasModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an DNSAliasModel object
 */
export const DNSAliasModelNormalizer: ModelNormalizerType<
  Readonly<DNSAliasModel>
> = (props) => Object.freeze(objectNormalizer(props, {}));
