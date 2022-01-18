import * as PropTypes from 'prop-types';

import { ProgressStatus } from '../progress-status';
import ReplicaSummaryModel from '../replica-summary';

export default Object.freeze({
  created: PropTypes.instanceOf(Date),
  ended: PropTypes.instanceOf(Date),
  name: PropTypes.string.isRequired,
  started: PropTypes.instanceOf(Date),
  status: PropTypes.oneOf(Object.keys(ProgressStatus)).isRequired,
  message: PropTypes.string,
  replicaList: PropTypes.arrayOf(PropTypes.exact(ReplicaSummaryModel)),
});
