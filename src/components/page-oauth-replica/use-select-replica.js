import { useState, useEffect } from 'react';
import replicaSummaryNormaliser from '../../models/replica-summary/normaliser';

export const useSelectReplica = (environment, componentName, replicaName) => {
  const [replica, setReplica] = useState();

  useEffect(() => {
    const deployment = environment ? environment.activeDeployment : null;

    const component =
      deployment && deployment.components
        ? deployment.components.find((comp) => comp.name === componentName)
        : null;

    const selectedReplica =
      component &&
      component.oauth2 &&
      component.oauth2.deployment &&
      component.oauth2.deployment.replicaList
        ? component.oauth2.deployment.replicaList.find(
            (replica) => replica.name === replicaName
          )
        : null;
    setReplica(replicaSummaryNormaliser(selectedReplica));
  }, [environment, componentName, replicaName]);

  return replica;
};
