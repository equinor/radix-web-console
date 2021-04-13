import { useState, useEffect } from 'react';
import replicaSummaryNormaliser from '../../models/replica-summary/normaliser';

const useSelectReplica = (environment, componentName, replicaName) => {
  const [replica, setReplica] = useState();

  useEffect(() => {
    const deployment = environment ? environment.activeDeployment : null;

    const component =
      deployment && deployment.components
        ? deployment.components.find((comp) => comp.name === componentName)
        : null;

    const selectedReplica =
      component && component.replicaList
        ? component.replicaList.find((replica) => replica.name === replicaName)
        : null;
    setReplica(replicaSummaryNormaliser(selectedReplica));
  }, [environment, componentName, replicaName]);

  return replica;
};

export default useSelectReplica;
