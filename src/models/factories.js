/**
 * This file exports factories of models; these have a schema that the Web
 * Console knows to be correct. Any transformation/normalisation of properties
 * should happen in these functions
 */

export { default as ApplicationNormaliser } from './application';
export { default as ApplicationRegistrationNormaliser } from './application-registration'; // prettier-ignore
export { default as ApplicationSummaryNormaliser } from './application-summary';
export { default as DeploymentSummaryNormaliser } from './deployment-summary';
export { default as EnvironmentNormaliser } from './environment';
export { default as EnvironmentSummaryNormaliser } from './environment-summary';
export { default as JobSummaryNormaliser } from './job-summary';
