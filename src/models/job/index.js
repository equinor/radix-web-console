import * as PropTypes from 'prop-types';

import ComponentSummaryModel from '../component-summary';
import { DeploymentSummaryModelValidationMap } from '../deployment-summary';
import { ProgressStatus } from '../progress-status';
import StepModel from '../step';

export default Object.freeze({
  commitID: PropTypes.string,
  components: PropTypes.arrayOf(PropTypes.exact(ComponentSummaryModel)),
  created: PropTypes.instanceOf(Date).isRequired,
  deployments: PropTypes.arrayOf(
    PropTypes.exact(DeploymentSummaryModelValidationMap)
  ),
  ended: PropTypes.instanceOf(Date),
  name: PropTypes.string.isRequired,
  pipeline: PropTypes.string.isRequired,
  started: PropTypes.instanceOf(Date),
  status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
  steps: PropTypes.arrayOf(PropTypes.exact(StepModel)),
  triggeredBy: PropTypes.string,
});
