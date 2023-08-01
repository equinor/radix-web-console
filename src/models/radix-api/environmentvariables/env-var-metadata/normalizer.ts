import { EnvVarMetadataModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an EnvVarMetadataModel object
 */
export const EnvVarMetadataModelNormalizer: ModelNormalizerType<
  Readonly<EnvVarMetadataModel>
> = (props) => Object.freeze(objectNormalizer(props, {}));
