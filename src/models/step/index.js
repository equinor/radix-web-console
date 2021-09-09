import PropTypes from 'prop-types';

import ProgressStatusModel from '../progress-status';
import Scan from '../scan';

export default Object.freeze({
  ended: PropTypes.instanceOf(Date),
  name: PropTypes.string.isRequired,
  started: PropTypes.instanceOf(Date),
  status: ProgressStatusModel.isRequired,
  components: PropTypes.arrayOf(PropTypes.string),
  scan: PropTypes.exact(Scan),
});
