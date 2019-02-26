import JobSummaryNormaliser from '../job-summary/normaliser';

/**
 * Create an Application Summary object
 */
export default props => {
  return Object.freeze({
    latestJob: JobSummaryNormaliser(props.latestJob),
    name: props.name,
  });
};
