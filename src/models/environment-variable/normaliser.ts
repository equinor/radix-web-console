import { isString } from 'lodash';
import {
  EnvironmentVariableModel,
  EnvironmentVariableNormalisedModel,
} from '.';

import { ModelNormaliserType } from '../model-types';

/**
 * Create an EnvironmentVariable object
 */
export const EnvironmentVariableNormaliser: ModelNormaliserType<
  EnvironmentVariableModel,
  EnvironmentVariableNormalisedModel
> = (props) => {
  const envVar = { ...(props as EnvironmentVariableNormalisedModel) };
  envVar.isRadixVariable =
    isString(envVar.name) && !!envVar.name?.match('(RADIX|RADIXOPERATOR)_*');

  return Object.freeze(envVar);
};
