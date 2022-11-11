import { MachineUserModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create a MachineUserModel object
 */
export const MachineUserModelNormalizer: ModelNormalizerType<
  MachineUserModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as MachineUserModel) }));
