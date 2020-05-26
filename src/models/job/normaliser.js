import pick from 'lodash/pick';

import model from '.';
import componentSummaryNormaliser from '../component-summary/normaliser';
import deploymentSummaryNormaliser from '../deployment-summary/normaliser';
import stepNormaliser from '../step/normaliser';

/**
 * Create a Job object
 */
export default (props) => {
  const job = pick(props, Object.keys(model));

  job.started = job.started ? new Date(job.started) : null;
  job.ended = job.ended ? new Date(job.ended) : null;
  job.created = job.created ? new Date(job.created) : null;

  job.components = job.components
    ? job.components.map((c) => componentSummaryNormaliser(c))
    : null;
  job.deployments = job.deployments
    ? job.deployments.map((d) => deploymentSummaryNormaliser(d))
    : null;
  job.steps = job.steps ? job.steps.map((s) => stepNormaliser(s)) : null;

  return Object.freeze(job);
};
