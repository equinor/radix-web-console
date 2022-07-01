import * as PropTypes from 'prop-types';

export interface AzureKeyVaultSecretStatusModel {
  name: string;
  replicaName?: string;
  version?: string;
}

/* PropTypes validation map for AzureKeyVaultSecretStatusModel */
export const AzureKeyVaultSecretStatusModelValidationMap: PropTypes.ValidationMap<AzureKeyVaultSecretStatusModel> =
  {
    name: PropTypes.string.isRequired,
    replicaName: PropTypes.string,
    version: PropTypes.string,
  };
