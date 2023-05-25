import * as PropTypes from 'prop-types';

import { ConfigurationStatus } from '../configuration-status';
import { DeploymentModel, DeploymentModelValidationMap } from '../deployment';
import {
  DeploymentSummaryModel,
  DeploymentSummaryModelValidationMap,
} from '../deployment-summary';
import {
  SecretModel,
  SecretModelValidationMap,
} from '../radix-api/secrets/secret';

export interface EnvironmentModel {
  name: string;
  branchMapping?: string;
  status: ConfigurationStatus;
  activeDeployment?: DeploymentModel;
  deployments?: Array<DeploymentSummaryModel>;
  secrets?: Array<SecretModel>;
}

/* PropTypes validation map for EnvironmentModel */
export const EnvironmentModelValidationMap: PropTypes.ValidationMap<EnvironmentModel> =
  {
    name: PropTypes.string.isRequired,
    branchMapping: PropTypes.string,
    status: PropTypes.oneOf(Object.values(ConfigurationStatus)).isRequired,
    activeDeployment: PropTypes.shape(
      DeploymentModelValidationMap
    ) as PropTypes.Requireable<DeploymentModel>,
    deployments: PropTypes.arrayOf(
      PropTypes.shape(
        DeploymentSummaryModelValidationMap
      ) as PropTypes.Requireable<DeploymentSummaryModel>
    ),
    secrets: PropTypes.arrayOf(
      PropTypes.shape(
        SecretModelValidationMap
      ) as PropTypes.Requireable<SecretModel>
    ),
  };
