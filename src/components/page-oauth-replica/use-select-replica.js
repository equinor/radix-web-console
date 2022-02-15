import { useState, useEffect } from 'react';
import replicaSummaryNormaliser from '../../models/replica-summary/normaliser';

export const useSelectReplica = (environment, componentName, replicaName) => {
  const [replica, setReplica] = useState();

  useEffect(() => {
    const component = environment?.activeDeployment?.components?.find(
      (comp) => comp.name === componentName
    );

    const selectedReplica = component?.oauth2?.deployment?.replicaList?.find(
      (replica) => replica.name === replicaName
    );
    setReplica(replicaSummaryNormaliser(selectedReplica));
  }, [environment, componentName, replicaName]);

  return replica;
};
