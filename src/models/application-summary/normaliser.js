import JobSummaryNormaliser from '../job-summary/normaliser';

/**
 * Create an Application Summary object
 */
export default (props) => {
  return Object.freeze({
    latestJob: props.latestJob ? JobSummaryNormaliser(props.latestJob) : null,
    name: props.name,
  });
};
