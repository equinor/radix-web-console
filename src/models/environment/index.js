import * as PropTypes from 'prop-types';

import { ConfigurationStatus } from '../configuration-status';
import Deployment from '../deployment';
import { DeploymentSummaryModelValidationMap } from '../deployment-summary';
import { SecretModelValidationMap } from '../secret';

export default Object.freeze({
  activeDeployment: PropTypes.shape(Deployment),
  branchMapping: PropTypes.string,
  deployments: PropTypes.arrayOf(
    PropTypes.shape(DeploymentSummaryModelValidationMap)
  ).isRequired,
  name: PropTypes.string.isRequired,
  secrets: PropTypes.arrayOf(PropTypes.shape(SecretModelValidationMap))
    .isRequired,
  status: PropTypes.oneOf(Object.values(ConfigurationStatus)).isRequired,
});
