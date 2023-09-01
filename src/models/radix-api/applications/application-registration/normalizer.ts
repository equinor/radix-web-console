import { ApplicationRegistrationModel } from '.';

import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an ApplicationRegistrationModel object
 */
export const ApplicationRegistrationModelNormalizer: ModelNormalizerType<
  Readonly<ApplicationRegistrationModel>
> = (props) => Object.freeze(objectNormalizer(props, {}));
