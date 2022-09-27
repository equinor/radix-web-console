import * as PropTypes from 'prop-types';

import {
  ApplicationRegistrationModel,
  ApplicationRegistrationModelValidationMap,
} from '../application-registration';

export interface ApplicationRegistrationRequestModel {
  applicationRegistration?: ApplicationRegistrationModel;
  acknowledgeWarnings?: boolean;
}

/* PropTypes validation map for ApplicationRegistrationRequestModel */
export const ApplicationRegistrationRequestModelValidationMap: PropTypes.ValidationMap<ApplicationRegistrationRequestModel> =
  {
    applicationRegistration: PropTypes.shape(
      ApplicationRegistrationModelValidationMap
    ) as PropTypes.Validator<ApplicationRegistrationModel>,
    acknowledgeWarnings: PropTypes.bool,
  };
