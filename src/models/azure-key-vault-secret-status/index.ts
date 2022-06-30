import * as PropTypes from 'prop-types';

export interface AzureKeyVaultSecretStatusModel {
  name: string;
  podName?: string;
  version?: string;
}

/* PropTypes validation map for AzureKeyVaultSecretStatusModel */
export const AzureKeyVaultSecretStatusModelValidationMap: PropTypes.ValidationMap<AzureKeyVaultSecretStatusModel> =
  {
    name: PropTypes.string.isRequired,
    podName: PropTypes.string,
    version: PropTypes.string,
  };
