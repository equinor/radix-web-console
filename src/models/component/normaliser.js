import pick from 'lodash/pick';

import portNormaliser from '../port/normaliser';
import replicaSummaryNormaliser from '../replica-summary/normaliser';
import scheduledJobSummaryNormaliser from '../scheduled-job-summary/normaliser';

import model from '.';
import { AuxiliaryResourceModelNormaliser } from '../auxiliary-resource/normaliser';

/**
 * Create a Component object
 */
export const normaliser = (props) => {
  const component = pick(props, Object.keys(model));

  component.ports = component.ports
    ? component.ports.map(portNormaliser)
    : null;

  component.replicaList = component.replicaList
    ? component.replicaList.map(replicaSummaryNormaliser)
    : null;

  component.scheduledJobList = component.scheduledJobList
    ? component.scheduledJobList.map(scheduledJobSummaryNormaliser)
    : null;

  component.auxiliaryResources = component.auxiliaryResources
    ? component.auxiliaryResources.map(AuxiliaryResourceModelNormaliser)
    : [];

  return Object.freeze(component);
};

export default normaliser;
