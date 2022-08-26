import { isString } from 'lodash';

import {
  EnvironmentVariableModel,
  EnvironmentVariableNormalizedModel,
} from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an EnvironmentVariableModel object
 */
export const EnvironmentVariableModelNormalizer: ModelNormalizerType<
  EnvironmentVariableNormalizedModel,
  EnvironmentVariableModel
> = (props) => {
  const normalized = { ...(props as EnvironmentVariableNormalizedModel) };

  normalized.isRadixVariable =
    isString(normalized.name) &&
    !!normalized.name?.match('(RADIX|RADIXOPERATOR)_*');

  return Object.freeze(filterUndefinedFields(normalized));
};
