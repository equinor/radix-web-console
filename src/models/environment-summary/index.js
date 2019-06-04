import PropTypes from 'prop-types';

import ConfigurationStatusModel from '../configuration-status';
import DeploymentSummaryModel from '../deployment-summary';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  status: ConfigurationStatusModel.isRequired,
  activeDeployment: PropTypes.shape(DeploymentSummaryModel),
  branchMapping: PropTypes.string,
});
