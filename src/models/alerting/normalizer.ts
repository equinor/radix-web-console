import { AlertingConfigModel, UpdateAlertingConfigModel } from '.';

import { ModelNormalizerType } from '../model-types';
import { filterUndefinedFields } from '../model-utils';

/**
 * Create an AlertingConfigModel object
 */
export const AlertingConfigModelNormalizer: ModelNormalizerType<
  AlertingConfigModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as AlertingConfigModel) }));

/**
 * Create an UpdateAlertingConfigModel object
 */
export const UpdateAlertingConfigModelNormalizer: ModelNormalizerType<
  UpdateAlertingConfigModel
> = (props) =>
  Object.freeze(
    filterUndefinedFields({ ...(props as UpdateAlertingConfigModel) })
  );
