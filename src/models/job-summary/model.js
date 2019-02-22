import PropTypes from 'prop-types';

import ProgressStatus from '../progress-status/model';

export default Object.freeze({
  commitID: PropTypes.string,
  deployTo: PropTypes.arrayOf(PropTypes.string).isRequired,
  ended: PropTypes.instanceOf(Date),
  environments: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  pipeline: PropTypes.string.isRequired,
  started: PropTypes.instanceOf(Date).isRequired,
  status: ProgressStatus.isRequired,
  triggeredBy: PropTypes.string.isRequired,
});
