import { NotificationsModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { filterUndefinedFields } from '../../../model-utils';

/**
 * Create a NotificationsModel object
 */
export const NotificationsModelNormalizer: ModelNormalizerType<
  NotificationsModel
> = (props) =>
  Object.freeze(filterUndefinedFields({ ...(props as NotificationsModel) }));
