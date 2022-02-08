import { useState, useEffect } from 'react';
import replicaSummaryNormaliser from '../../models/replica-summary/normaliser';

export const useSelectAuxiliaryResourceReplica = (
  environment,
  componentName,
  auxType,
  replicaName
) => {
  const [replica, setReplica] = useState();

  useEffect(() => {
    const deployment = environment ? environment.activeDeployment : null;

    const component =
      deployment && deployment.components
        ? deployment.components.find((comp) => comp.name === componentName)
        : null;

    const auxResource =
      component && component.auxiliaryResources
        ? component.auxiliaryResources.find((aux) => aux.type === auxType)
        : null;

    const selectedReplica =
      auxResource &&
      auxResource.deployment &&
      auxResource.deployment.replicaList
        ? auxResource.deployment.replicaList.find(
            (replica) => replica.name === replicaName
          )
        : null;
    setReplica(replicaSummaryNormaliser(selectedReplica));
  }, [environment, componentName, auxType, replicaName]);

  return replica;
};
