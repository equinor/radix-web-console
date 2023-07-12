import { ApplicationAliasModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an ApplicationAliasModel object
 */
export const ApplicationAliasModelNormalizer: ModelNormalizerType<
  Readonly<ApplicationAliasModel>
> = (props) =>
  Object.freeze(objectNormalizer<ApplicationAliasModel>(props, {}));
