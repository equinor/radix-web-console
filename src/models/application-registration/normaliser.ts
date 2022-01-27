import { ApplicationRegistrationModel } from '.';

/**
 * Create an ApplicationRegistrationModel object
 */
export const ApplicationRegistrationModelNormaliser = (
  props: ApplicationRegistrationModel | unknown
): Readonly<ApplicationRegistrationModel> =>
  Object.freeze({ ...(props as ApplicationRegistrationModel) });
