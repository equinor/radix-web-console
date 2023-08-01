import { NotificationsModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create a NotificationsModel object
 */
export const NotificationsModelNormalizer: ModelNormalizerType<
  Readonly<NotificationsModel>
> = (props) => Object.freeze(objectNormalizer(props, {}));
