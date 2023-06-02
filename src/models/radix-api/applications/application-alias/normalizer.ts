import { ApplicationAliasModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create an ApplicationAliasModel object
 */
export const ApplicationAliasModelNormalizer: ModelNormalizerType<
  ApplicationAliasModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as ApplicationAliasModel) }));
