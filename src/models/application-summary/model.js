import PropTypes from 'prop-types';

import JobSummary from '../job-summary';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  latestJob: PropTypes.shape(JobSummary),
});
