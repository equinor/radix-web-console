import * as PropTypes from 'prop-types';

export interface AzureKeyVaultSecretStatusModel {
  replicaName?: string;
  jobName?: string;
  batchName?: string;
  version?: string;
  replicaCreatedTimestamp: Date;
}

/* PropTypes validation map for AzureKeyVaultSecretStatusModel */
export const AzureKeyVaultSecretStatusModelValidationMap: PropTypes.ValidationMap<AzureKeyVaultSecretStatusModel> =
  {
    replicaName: PropTypes.string,
    jobName: PropTypes.string,
    batchName: PropTypes.string,
    version: PropTypes.string,
    replicaCreatedTimestamp: PropTypes.instanceOf(Date).isRequired,
  };
