import { pick } from 'lodash';

import model from '.';

import { OAuthAuxiliaryResourceModelNormaliser } from '../oauth-auxiliary-resource/normaliser';
import portNormaliser from '../port/normaliser';
import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';
import scheduledJobSummaryNormaliser from '../scheduled-job-summary/normaliser';

/**
 * Create a ComponentModel object
 */
export const normaliser = (props) => {
  const component = pick(props, Object.keys(model));

  component.ports = component.ports?.map(portNormaliser);
  component.replicaList = component.replicaList?.map(
    ReplicaSummaryModelNormalizer
  );
  component.scheduledJobList = component.scheduledJobList?.map(
    scheduledJobSummaryNormaliser
  );

  component.oauth2 =
    component.oauth2 && OAuthAuxiliaryResourceModelNormaliser(component.oauth2);

  return Object.freeze(component);
};

export default normaliser;
