import JobSummaryNormaliser from '../job-summary/normaliser';

/**
 * Create an Application object
 */
export default props => {
  return Object.freeze({
    name: props.name,
    registration: props.registration,
    environments: props.environments,
    jobs: props.jobs.map(JobSummaryNormaliser),
  });
}
