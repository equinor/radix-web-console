import PropTypes from 'prop-types';

import ConfigurationStatus from '../configuration-status/model';
import DeploymentSummary from '../deployment-summary/model';
import Secret from '../secret/model';

export default Object.freeze({
  activeDeployment: PropTypes.shape(DeploymentSummary).isRequired,
  branchMapping: PropTypes.string,
  deployments: PropTypes.arrayOf(PropTypes.shape(DeploymentSummary)),
  name: PropTypes.string.isRequired,
  secrets: PropTypes.arrayOf(PropTypes.shape(Secret)),
  status: ConfigurationStatus.isRequired,
});
