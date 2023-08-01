import { ApplicationRegistrationUpsertResponseModel } from '.';

import { ApplicationRegistrationModelNormalizer } from '../application-registration/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an ApplicationRegistrationUpsertResponseModel object
 */
export const ApplicationRegistrationUpsertResponseModelNormalizer: ModelNormalizerType<
  Readonly<ApplicationRegistrationUpsertResponseModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      applicationRegistration: ApplicationRegistrationModelNormalizer,
    })
  );
