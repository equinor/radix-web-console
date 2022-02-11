import pick from 'lodash/pick';

import { AuxiliaryResourceDeploymentModel } from '.';
import { ReplicaSummaryModelNormalizer } from '../replica-summary/normalizer';

/**
 * Create a AuxiliaryResourceDeploymentModel object
 */
export const AuxiliaryResourceDeploymentModelNormaliser = (props) => {
  const auxDeployment = pick(
    props,
    Object.keys(AuxiliaryResourceDeploymentModel)
  );

  auxDeployment.replicaList = auxDeployment.replicaList
    ? auxDeployment.replicaList.map(ReplicaSummaryModelNormalizer)
    : [];

  return Object.freeze(auxDeployment);
};
