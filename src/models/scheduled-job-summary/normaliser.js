import pick from 'lodash/pick';
import replicaSummaryNormaliser from '../replica-summary/normaliser';
import model from '.';

/**
 * Create a Pipeline Job Summary object
 */
export const normaliser = (props) => {
  const jobSummary = pick(props, Object.keys(model));

  jobSummary.started = jobSummary.started ? new Date(jobSummary.started) : null;
  jobSummary.ended = jobSummary.ended ? new Date(jobSummary.ended) : null;
  jobSummary.created = jobSummary.created ? new Date(jobSummary.created) : null;
  jobSummary.replicaList = jobSummary.replicaList
    ? jobSummary.replicaList.map(replicaSummaryNormaliser)
    : null;
  return Object.freeze(jobSummary);
};

export default normaliser;
