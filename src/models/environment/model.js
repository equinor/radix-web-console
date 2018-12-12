import PropTypes from 'prop-types';

import ConfigurationStatus from '../configuration-status/model';
import Deployment from '../deployment/model';
import DeploymentSummary from '../deployment-summary/model';
import Secret from '../secret/model';

export default Object.freeze({
  activeDeployment: PropTypes.shape(Deployment).isRequired,
  branchMapping: PropTypes.string,
  deployments: PropTypes.arrayOf(PropTypes.shape(DeploymentSummary)).isRequired,
  name: PropTypes.string.isRequired,
  secrets: PropTypes.arrayOf(PropTypes.shape(Secret)).isRequired,
  status: ConfigurationStatus.isRequired,
});
