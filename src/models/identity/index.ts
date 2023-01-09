import * as PropTypes from 'prop-types';
import {
  AzureIdentityModel,
  AzureIdentityModelValidationMap,
} from '../azure-identity';

export interface IdentityModel {
  azure?: AzureIdentityModel;
}

/* PropTypes validation map for ComponentModel */
export const IdentityModelValidationMap: PropTypes.ValidationMap<IdentityModel> =
  {
    azure: PropTypes.shape(
      AzureIdentityModelValidationMap
    ) as PropTypes.Requireable<AzureIdentityModel>,
  };
