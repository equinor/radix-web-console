import PropTypes from 'prop-types';

import ProgressStatusModel from '../progress-status';

export default Object.freeze({
  ended: PropTypes.instanceOf(Date),
  name: PropTypes.string.isRequired,
  started: PropTypes.instanceOf(Date),
  status: ProgressStatusModel.isRequired,
});
