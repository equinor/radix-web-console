import { ApplicationRegistrationRequestModel } from '.';

import { ApplicationRegistrationModelNormalizer } from '../application-registration/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an ApplicationRegistrationRequestModel object
 */
export const ApplicationRegistrationRequestModelNormalizer: ModelNormalizerType<
  Readonly<ApplicationRegistrationRequestModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      applicationRegistration: ApplicationRegistrationModelNormalizer,
    })
  );
