import PropTypes from 'prop-types';

import JobSummaryModel from '../job-summary';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  latestJob: PropTypes.shape(JobSummaryModel),
});
