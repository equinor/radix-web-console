import pick from 'lodash/pick';

import model from '.';
import componentSummaryNormaliser from '../component-summary/normaliser';
import { DeploymentSummaryModelNormalizer } from '../deployment-summary/normalizer';
import stepNormaliser from '../step/normaliser';

/**
 * Create a Job object
 */
export const normaliser = (props) => {
  const job = pick(props, Object.keys(model));

  job.started = job.started ? new Date(job.started) : null;
  job.ended = job.ended ? new Date(job.ended) : null;
  job.created = job.created ? new Date(job.created) : null;

  job.components = job.components
    ? job.components.map(componentSummaryNormaliser)
    : null;
  job.deployments = job.deployments
    ? job.deployments.map(DeploymentSummaryModelNormalizer)
    : null;
  job.steps = job.steps ? job.steps.map(stepNormaliser) : null;

  return Object.freeze(job);
};

export default normaliser;
