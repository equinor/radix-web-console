import pick from 'lodash/pick';

import { AuxiliaryResourceDeploymentModel } from '.';
import replicaSummaryNormaliser from '../replica-summary/normaliser';

/**
 * Create a AuxiliaryResourceDeploymentModel object
 */
export const AuxiliaryResourceDeploymentModelNormaliser = (props) => {
  const auxDeployment = pick(
    props,
    Object.keys(AuxiliaryResourceDeploymentModel)
  );

  auxDeployment.replicaList = auxDeployment.replicaList
    ? auxDeployment.replicaList.map(replicaSummaryNormaliser)
    : [];

  return Object.freeze(auxDeployment);
};
