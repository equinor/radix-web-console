import * as PropTypes from 'prop-types';

import {
  AzureIdentityModel,
  AzureIdentityModelValidationMap,
} from '../azure-identity';

export interface IdentityModel {
  azure?: AzureIdentityModel;
}

/* PropTypes validation map for IdentityModel */
export const IdentityModelValidationMap: PropTypes.ValidationMap<IdentityModel> =
  {
    azure: PropTypes.shape(
      AzureIdentityModelValidationMap
    ) as PropTypes.Validator<AzureIdentityModel>,
  };
