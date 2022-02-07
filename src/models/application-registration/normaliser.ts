import { ApplicationRegistrationModel } from '.';

import { ModelNormaliserType } from '../model-types';

/**
 * Create an ApplicationRegistrationModel object
 */
export const ApplicationRegistrationModelNormaliser: ModelNormaliserType<
  ApplicationRegistrationModel
> = (props) => Object.freeze({ ...(props as ApplicationRegistrationModel) });
