import pick from 'lodash/pick';

import { OAuthAuxiliaryResourceModel } from '.';
import { AuxiliaryResourceDeploymentModelNormaliser } from '../auxiliary-resource-deployment/normaliser';

/**
 * Create a OAuthAuxiliaryResourceModelNormaliser object
 */
export const OAuthAuxiliaryResourceModelNormaliser = (props) => {
  const oauth = pick(props, Object.keys(OAuthAuxiliaryResourceModel));

  oauth.deployment = oauth.deployment
    ? AuxiliaryResourceDeploymentModelNormaliser(oauth.deployment)
    : null;

  return Object.freeze(oauth);
};
