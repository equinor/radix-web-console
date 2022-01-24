import PropTypes from 'prop-types';

import ConfigurationStatusModel from '../configuration-status';
import { DeploymentSummaryModelValidationMap } from '../deployment-summary';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  status: ConfigurationStatusModel.isRequired,
  activeDeployment: PropTypes.shape(DeploymentSummaryModelValidationMap),
  branchMapping: PropTypes.string,
});
