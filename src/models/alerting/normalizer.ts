import { AlertingConfigModel, UpdateAlertingConfigModel } from '.';

import { ModelNormalizerType } from '../model-types';

/**
 * Create an AlertingConfigModel object
 */
export const AlertingConfigModelNormalizer: ModelNormalizerType<
  AlertingConfigModel
> = (props) => Object.freeze({ ...(props as AlertingConfigModel) });

/**
 * Create an UpdateAlertingConfigModel object
 */
export const UpdateAlertingConfigModelNormalizer: ModelNormalizerType<
  UpdateAlertingConfigModel
> = (props) => Object.freeze({ ...(props as UpdateAlertingConfigModel) });
