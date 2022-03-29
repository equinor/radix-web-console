import { pick } from 'lodash';

import model from '.';

import { OAuthAuxiliaryResourceModelNormalizer } from '../oauth-auxiliary-resource/normalizer';
import { PortModelNormalizer } from '../port/normalizer';
import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';
import { ScheduledJobSummaryModelNormalizer } from '../scheduled-job-summary/normalizer';

/**
 * Create a ComponentModel object
 */
export const normaliser = (props) => {
  const component = pick(props, Object.keys(model));

  component.ports = component.ports?.map(PortModelNormalizer);
  component.replicaList = component.replicaList?.map(
    ReplicaSummaryModelNormalizer
  );
  component.scheduledJobList = component.scheduledJobList?.map(
    ScheduledJobSummaryModelNormalizer
  );

  component.oauth2 =
    component.oauth2 && OAuthAuxiliaryResourceModelNormalizer(component.oauth2);

  return Object.freeze(component);
};

export default normaliser;
