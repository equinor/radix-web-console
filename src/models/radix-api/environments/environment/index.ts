import * as PropTypes from 'prop-types';

import { ConfigurationStatus } from '../configuration-status';
import {
  DeploymentModel,
  DeploymentModelValidationMap,
} from '../../deployments/deployment';
import {
  DeploymentSummaryModel,
  DeploymentSummaryModelValidationMap,
} from '../../deployments/deployment-summary';
import { SecretModel, SecretModelValidationMap } from '../../secrets/secret';

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
    ) as PropTypes.Validator<DeploymentModel>,
    deployments: PropTypes.arrayOf(
      PropTypes.shape(
        DeploymentSummaryModelValidationMap
      ) as PropTypes.Validator<DeploymentSummaryModel>
    ),
    secrets: PropTypes.arrayOf(
      PropTypes.shape(
        SecretModelValidationMap
      ) as PropTypes.Validator<SecretModel>
    ),
  };
