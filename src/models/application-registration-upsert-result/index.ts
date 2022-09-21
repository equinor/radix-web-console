import * as PropTypes from 'prop-types';
import {
  ApplicationRegistrationModel,
  ApplicationRegistrationModelValidationMap,
} from '../application-registration';

export interface ApplicationRegistrationUpsertResultModel {
  application?: ApplicationRegistrationModel;
  warnings?: Array<string>;
}

/* PropTypes validation map for ApplicationRegistrationUpsertResulModel */
export const ApplicationRegistrationUpsertResulModelValidationMap: PropTypes.ValidationMap<ApplicationRegistrationUpsertResultModel> =
  {
    application: PropTypes.shape(
      ApplicationRegistrationModelValidationMap
    ) as PropTypes.Validator<ApplicationRegistrationModel>,
    warnings: PropTypes.arrayOf(PropTypes.string),
  };
