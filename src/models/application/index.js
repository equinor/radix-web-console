import JobSummaryFactory from '../job-summary';

/**
 * Create an Application object
 */
export default props => {
  return Object.freeze({
    name: props.name,
    registration: props.registration,
    environments: props.environments,
    jobs: props.jobs.map(JobSummaryFactory),
  });
}
