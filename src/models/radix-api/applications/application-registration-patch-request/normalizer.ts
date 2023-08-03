import { ApplicationRegistrationPatchRequestModel } from './index';

import { ApplicationRegistrationPatchModelNormalizer } from '../application-registration-patch/normalizer';
import { ModelNormalizerType } from '../../../model-types';
import { objectNormalizer } from '../../../model-utils';

/**
 * Create an ApplicationRegistrationPatchRequestModel object
 */
export const ApplicationRegistrationPatchRequestModelNormalizer: ModelNormalizerType<
  Readonly<ApplicationRegistrationPatchRequestModel>
> = (props) =>
  Object.freeze(
    objectNormalizer(props, {
      applicationRegistrationPatch: ApplicationRegistrationPatchModelNormalizer,
    })
  );
