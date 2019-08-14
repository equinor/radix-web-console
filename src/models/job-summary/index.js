import PropTypes from 'prop-types';

import ProgressStatusModel from '../progress-status';

export default Object.freeze({
  commitID: PropTypes.string,
  ended: PropTypes.instanceOf(Date),
  environments: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  pipeline: PropTypes.string.isRequired,
  created: PropTypes.instanceOf(Date).isRequired,
  started: PropTypes.instanceOf(Date).isRequired,
  status: ProgressStatusModel.isRequired,
  // triggeredBy: PropTypes.string.isRequired,
});
