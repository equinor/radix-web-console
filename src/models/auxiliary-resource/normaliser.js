import pick from 'lodash/pick';

import { AuxiliaryResourceModel } from '.';
import { AuxiliaryResourceDeploymentModelNormaliser } from '../auxiliary-resource-deployment/normaliser';

/**
 * Create a AuxiliaryResourceModelNormaliser object
 */
export const AuxiliaryResourceModelNormaliser = (props) => {
  const auxResource = pick(props, Object.keys(AuxiliaryResourceModel));

  auxResource.deployment = auxResource.deployment
    ? AuxiliaryResourceDeploymentModelNormaliser(auxResource.deployment)
    : null;

  return Object.freeze(auxResource);
};
