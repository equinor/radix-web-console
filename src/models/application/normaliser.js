import JobSummaryNormaliser from '../job-summary/normaliser';

/**
 * Create an Application object
 */
export default props => {
  return Object.freeze({
    appAlias: props.appAlias,
    environments: props.environments,
    jobs: props.jobs.map(JobSummaryNormaliser),
    name: props.name,
    registration: props.registration,
  });
};
