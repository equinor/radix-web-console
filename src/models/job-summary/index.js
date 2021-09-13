import PropTypes from 'prop-types';

import ProgressStatusModel from '../progress-status';
import Scan from '../scan';

export default Object.freeze({
  triggeredBy: PropTypes.string,
  commitID: PropTypes.string,
  created: PropTypes.instanceOf(Date).isRequired,
  ended: PropTypes.instanceOf(Date),
  environments: PropTypes.arrayOf(PropTypes.string),
  name: PropTypes.string.isRequired,
  pipeline: PropTypes.string.isRequired,
  started: PropTypes.instanceOf(Date),
  status: ProgressStatusModel.isRequired,
  stepSummaryScans: PropTypes.arrayOf(PropTypes.shape(Scan)),
});
