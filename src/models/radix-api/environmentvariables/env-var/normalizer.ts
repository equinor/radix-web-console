import { isString } from 'lodash';

import { EnvVarModel, EnvVarNormalizedModel } from '.';

import { EnvVarMetadataModelNormalizer } from '../env-var-metadata/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an EnvVarModel object
 */
export const EnvVarModelNormalizer: ModelNormalizerType<
  EnvVarNormalizedModel,
  EnvVarModel
> = (props) => {
  const normalized = { ...(props as EnvVarNormalizedModel) };

  normalized.metadata =
    normalized.metadata && EnvVarMetadataModelNormalizer(normalized.metadata);
  normalized.isRadixVariable =
    isString(normalized.name) &&
    !!normalized.name?.match('(RADIX|RADIXOPERATOR)_*');

  return Object.freeze(filterUndefinedFields(normalized));
};
