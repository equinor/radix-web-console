import * as PropTypes from 'prop-types';

export interface AzureKeyVaultSecretVersionModel {
  replicaName: string;
  replicaCreated: Date;
  jobName?: string;
  jobCreated?: Date;
  batchName?: string;
  batchCreated?: Date;
  version?: string;
}

/* PropTypes validation map for AzureKeyVaultSecretVersionModel */
export const AzureKeyVaultSecretVersionModelValidationMap: PropTypes.ValidationMap<AzureKeyVaultSecretVersionModel> =
  {
    replicaName: PropTypes.string.isRequired,
    replicaCreated: PropTypes.instanceOf(Date).isRequired,
    jobName: PropTypes.string,
    jobCreated: PropTypes.instanceOf(Date),
    batchName: PropTypes.string,
    batchCreated: PropTypes.instanceOf(Date),
    version: PropTypes.string,
  };
