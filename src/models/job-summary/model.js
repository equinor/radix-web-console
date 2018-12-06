import PropTypes from 'prop-types';

import ProgressStatus from '../progress-status/model';

export default Object.freeze({
  // TODO: these need to be updated later when the API is changed in OR-341.
  //deployTo: PropTypes.arrayOf(PropTypes.string).isRequired,
  //end: PropTypes.string,
  name: PropTypes.string.isRequired,
  //pipeline: PropTypes.string.isRequired,
  //start: PropTypes.string.isRequired,
  status: ProgressStatus.isRequired,
  //triggeredBy: PropTypes.string.isRequired,
});
