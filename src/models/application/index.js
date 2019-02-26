import PropTypes from 'prop-types';

import ApplicationRegistrationModel from '../application-registration';
import EnvironmentSummaryModel from '../environment-summary';
import JobSummaryModel from '../job-summary';

export default Object.freeze({
  name: PropTypes.string.isRequired,
  registration: PropTypes.shape(ApplicationRegistrationModel).isRequired,
  environments: PropTypes.arrayOf(PropTypes.shape(EnvironmentSummaryModel))
    .isRequired,
  jobs: PropTypes.arrayOf(PropTypes.shape(JobSummaryModel)).isRequired,
  //lastWebhookContact: Timestamp [the last successful call to the webhook from GitHub]
  //lastGitClone: Timestamp [last successful remote git operation (e.g. clone)]
  //lastApplicationError: string [last error generated during a clone/webhook/config validation. This is not a Job-level error. Should be reset to null when webhook + clone + validation works correctly]
});
