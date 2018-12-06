import PropTypes from 'prop-types';

import JobSummary from '../job-summary/model';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  latestJob: PropTypes.shape(JobSummary),
});
