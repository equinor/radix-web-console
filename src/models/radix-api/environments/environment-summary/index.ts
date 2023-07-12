import * as PropTypes from 'prop-types';

import { ConfigurationStatus } from '../configuration-status';
import {
  DeploymentSummaryModel,
  DeploymentSummaryModelValidationMap,
} from '../../deployments/deployment-summary';

export interface EnvironmentSummaryModel {
  name: string;
  status: ConfigurationStatus;
  activeDeployment?: DeploymentSummaryModel;
  branchMapping?: string;
}

/* PropTypes validation map for EnvironmentSummaryModel */
export const EnvironmentSummaryModelValidationMap: PropTypes.ValidationMap<EnvironmentSummaryModel> =
  {
    name: PropTypes.string.isRequired,
    status: PropTypes.oneOf(Object.values(ConfigurationStatus)).isRequired,
    activeDeployment: PropTypes.shape(
      DeploymentSummaryModelValidationMap
    ) as PropTypes.Validator<DeploymentSummaryModel>,
    branchMapping: PropTypes.string,
  };
