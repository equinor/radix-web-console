import PropTypes from 'prop-types';

import ComponentSummaryModel from '../component-summary';
import DeploymentSummaryModel from '../deployment-summary';
import ProgressStatusModel from '../progress-status';
import StepModel from '../step';

export default Object.freeze({
  commitID: PropTypes.string,
  components: PropTypes.arrayOf(PropTypes.exact(ComponentSummaryModel)),
  deployments: PropTypes.arrayOf(PropTypes.exact(DeploymentSummaryModel)),
  ended: PropTypes.instanceOf(Date),
  name: PropTypes.string.isRequired,
  pipeline: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  started: PropTypes.instanceOf(Date).isRequired,
  status: ProgressStatusModel.isRequired,
  steps: PropTypes.arrayOf(PropTypes.exact(StepModel)).isRequired,
  // triggeredBy: PropTypes.string.isRequired,
});
