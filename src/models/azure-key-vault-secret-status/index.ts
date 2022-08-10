import * as PropTypes from 'prop-types';

export interface AzureKeyVaultSecretStatusModel {
  replicaName?: string;
  version?: string;
}

/* PropTypes validation map for AzureKeyVaultSecretStatusModel */
export const AzureKeyVaultSecretStatusModelValidationMap: PropTypes.ValidationMap<AzureKeyVaultSecretStatusModel> =
  {
    replicaName: PropTypes.string,
    version: PropTypes.string,
  };
