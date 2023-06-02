import * as PropTypes from 'prop-types';

import {
  ApplicationRegistrationModel,
  ApplicationRegistrationModelValidationMap,
} from '../application-registration';

export interface ApplicationRegistrationUpsertResponseModel {
  applicationRegistration?: ApplicationRegistrationModel;
  warnings?: Array<string>;
}

/* PropTypes validation map for ApplicationRegistrationUpsertResponseModel */
export const ApplicationRegistrationUpsertResponseModelValidationMap: PropTypes.ValidationMap<ApplicationRegistrationUpsertResponseModel> =
  {
    applicationRegistration: PropTypes.shape(
      ApplicationRegistrationModelValidationMap
    ) as PropTypes.Validator<ApplicationRegistrationModel>,
    warnings: PropTypes.arrayOf(PropTypes.string),
  };
