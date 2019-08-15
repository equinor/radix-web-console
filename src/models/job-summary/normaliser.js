import pick from 'lodash/pick';

import model from '.';

/**
 * Create a Job Summary object
 */
export default props => {
  const jobSummary = pick(props, Object.keys(model));

  jobSummary.started = jobSummary.started ? new Date(jobSummary.started) : null;
  jobSummary.ended = jobSummary.ended ? new Date(jobSummary.ended) : null;
  jobSummary.created = jobSummary.created ? new Date(jobSummary.created) : null;

  return Object.freeze(jobSummary);
};
