import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../progress-status';
import { ReplicaSummaryNormalizedModelValidationMap } from '../replica-summary';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  started: PropTypes.instanceOf(Date),
  ended: PropTypes.instanceOf(Date),
  status: PropTypes.oneOf(Object.values(ProgressStatus)).isRequired,
  message: PropTypes.string.isRequired,
  replicaList: PropTypes.arrayOf(
    PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap)
  ),
});
