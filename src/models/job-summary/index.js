import pick from 'lodash/pick';

import model from './model';

/**
 * Create a Job Summary object
 */
export default props => {
  const jobSummary = pick(props, Object.keys(model));

  jobSummary.started = jobSummary.started ? new Date(jobSummary.started) : null;
  jobSummary.ended = jobSummary.ended ? new Date(jobSummary.ended) : null;

  return Object.freeze(jobSummary);
}
