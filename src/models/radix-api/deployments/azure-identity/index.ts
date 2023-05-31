import * as PropTypes from 'prop-types';

export interface AzureIdentityModel {
  clientId: string;
  serviceAccountName: string;
  azureKeyVaults?: Array<string>;
}

/* PropTypes validation map for AzureIdentityModel */
export const AzureIdentityModelValidationMap: PropTypes.ValidationMap<AzureIdentityModel> =
  {
    clientId: PropTypes.string.isRequired,
    serviceAccountName: PropTypes.string.isRequired,
    azureKeyVaults: PropTypes.arrayOf(PropTypes.string),
  };
