import pick from 'lodash/pick';

import portNormaliser from '../port/normaliser';
import replicaSummaryNormaliser from '../replica-summary/normaliser';
import scheduledJobSummaryNormaliser from '../scheduled-job-summary/normaliser';

import model from '.';
import { OAuthAuxiliaryResourceModelNormaliser } from '../oauth2-auxiliary-resource/normaliser';

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

  component.oauth2 = component.oauth2
    ? OAuthAuxiliaryResourceModelNormaliser(component.oauth2)
    : null;

  return Object.freeze(component);
};

export default normaliser;
