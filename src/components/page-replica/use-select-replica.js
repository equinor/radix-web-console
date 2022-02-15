import { useState, useEffect } from 'react';
import replicaSummaryNormaliser from '../../models/replica-summary/normaliser';

const useSelectReplica = (environment, componentName, replicaName) => {
  const [replica, setReplica] = useState();

  useEffect(() => {
    const component = environment?.activeDeployment?.components?.find(
      (comp) => comp.name === componentName
    );

    const selectedReplica = component?.replicaList?.find(
      (replica) => replica.name === replicaName
    );

    setReplica(replicaSummaryNormaliser(selectedReplica));
  }, [environment, componentName, replicaName]);

  return replica;
};

export default useSelectReplica;
