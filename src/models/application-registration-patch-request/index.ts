import * as PropTypes from 'prop-types';

import {
  ApplicationRegistrationPatchModel,
  ApplicationRegistrationPatchModelValidationMap,
} from '../application-registration-patch';

export interface ApplicationRegistrationPatchRequestModel {
  applicationRegistrationPatch?: ApplicationRegistrationPatchModel;
  acknowledgeWarnings?: boolean;
}

/* PropTypes validation map for ApplicationRegistrationPatchRequestModel */
export const ApplicationRegistrationPatchRequestModelValidationMap: PropTypes.ValidationMap<ApplicationRegistrationPatchRequestModel> =
  {
    applicationRegistrationPatch: PropTypes.shape(
      ApplicationRegistrationPatchModelValidationMap
    ) as PropTypes.Validator<ApplicationRegistrationPatchModel>,
    acknowledgeWarnings: PropTypes.bool,
  };
