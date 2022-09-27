import * as PropTypes from 'prop-types';
import {
  ApplicationRegistrationModel,
  ApplicationRegistrationModelValidationMap,
} from '../application-registration';

export interface ApplicationRegistrationUpsertRespondModel {
  applicationRegistration?: ApplicationRegistrationModel;
  warnings?: Array<string>;
}

/* PropTypes validation map for ApplicationRegistrationUpsertRespondModel */
export const ApplicationRegistrationUpsertRespondModelValidationMap: PropTypes.ValidationMap<ApplicationRegistrationUpsertRespondModel> =
  {
    applicationRegistration: PropTypes.shape(
      ApplicationRegistrationModelValidationMap
    ) as PropTypes.Validator<ApplicationRegistrationModel>,
    warnings: PropTypes.arrayOf(PropTypes.string),
  };
