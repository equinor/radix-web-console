import JobSummaryFactory from '../job-summary';

/**
 * Create an Application Summary object
 */
export default props => {
  return Object.freeze({
    latestJob: JobSummaryFactory(props.latestJob),
    name: props.name,
  });
}
