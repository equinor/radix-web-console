import PropTypes from 'prop-types';

import ConfigurationStatus from '../configuration-status';
import DeploymentSummary from '../deployment-summary';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  status: ConfigurationStatus.isRequired,
  activeDeployment: PropTypes.shape(DeploymentSummary).isRequired,
  branchMapping: PropTypes.string,
});
