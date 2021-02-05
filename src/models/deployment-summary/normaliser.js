import pick from 'lodash/pick';

import model from '.';

/**
 * Create a Deployment Summary object
 */
export const normaliser = (props) => {
  const deploymentSummary = pick(props, Object.keys(model));

  deploymentSummary.activeFrom = deploymentSummary.activeFrom
    ? new Date(deploymentSummary.activeFrom)
    : null;
  deploymentSummary.activeTo = deploymentSummary.activeTo
    ? new Date(deploymentSummary.activeTo)
    : null;

  return Object.freeze(deploymentSummary);
};

export default normaliser;
