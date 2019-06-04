import pick from 'lodash/pick';

import appRegistrationNormaliser from '../application-registration/normaliser';
import environmentNormaliser from '../environment/normaliser';
import jobSummaryNormaliser from '../job-summary/normaliser';

import model from '.';

/**
 * Create an Application object
 */
export default props => {
  const app = pick(props, Object.keys(model));

  app.environments = app.environments.map(environmentNormaliser);
  app.jobs = app.jobs.map(jobSummaryNormaliser);
  app.registration = appRegistrationNormaliser(app.registration);

  return Object.freeze(app);
};
