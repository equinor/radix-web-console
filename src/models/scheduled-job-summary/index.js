import PropTypes from 'prop-types';
import ProgressStatusModel from '../progress-status';
import ReplicaSummaryModel from '../replica-summary';

export default Object.freeze({
  created: PropTypes.instanceOf(Date),
  ended: PropTypes.instanceOf(Date),
  name: PropTypes.string.isRequired,
  started: PropTypes.instanceOf(Date),
  status: ProgressStatusModel.isRequired,
  message: PropTypes.string,
  replicaList: PropTypes.arrayOf(PropTypes.exact(ReplicaSummaryModel)),
});
