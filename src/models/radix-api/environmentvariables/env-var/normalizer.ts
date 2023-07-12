import { isString } from 'lodash';

import { EnvVarModel, EnvVarNormalizedModel } from '.';

import { EnvVarMetadataModelNormalizer } from '../env-var-metadata/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an EnvVarModel object
 */
export const EnvVarModelNormalizer: ModelNormalizerType<
  Readonly<EnvVarNormalizedModel>,
  EnvVarModel
> = (props) => {
  const normalized = objectNormalizer<EnvVarModel>(props, {
    metadata: EnvVarMetadataModelNormalizer,
  });

  return Object.freeze<EnvVarNormalizedModel>({
    ...normalized,
    isRadixVariable:
      isString(normalized.name) &&
      !!normalized.name.match('(RADIX|RADIXOPERATOR)_*'),
  });
};
