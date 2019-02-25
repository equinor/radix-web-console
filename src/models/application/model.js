import PropTypes from 'prop-types';

import ApplicationRegistration from '../application-registration';
import EnvironmentSummary from '../environment-summary';
import JobSummary from '../job-summary';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  registration: PropTypes.shape(ApplicationRegistration).isRequired,
  environments: PropTypes.arrayOf(PropTypes.shape(EnvironmentSummary))
    .isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(JobSummary)).isRequired,
  //lastWebhookContact: Timestamp [the last successful call to the webhook from GitHub]
  //lastGitClone: Timestamp [last successful remote git operation (e.g. clone)]
  //lastApplicationError: string [last error generated during a clone/webhook/config validation. This is not a Job-level error. Should be reset to null when webhook + clone + validation works correctly]
});
