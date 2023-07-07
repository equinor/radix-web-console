import { MachineUserModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a MachineUserModel object
 */
export const MachineUserModelNormalizer: ModelNormalizerType<
  Readonly<MachineUserModel>
> = (props) => Object.freeze(objectNormalizer<MachineUserModel>(props, {}));
