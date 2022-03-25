import { useEffect, useState } from 'react';

import { ReplicaSummaryModelNormalizer } from '../../models/replica-summary/normalizer';

export const useSelectReplica = (environment, componentName, replicaName) => {
  const [replica, setReplica] = useState();

  useEffect(() => {
    const component = environment?.activeDeployment?.components?.find(
      (comp) => comp.name === componentName
    );

    const selectedReplica = component?.oauth2?.deployment?.replicaList?.find(
      (replica) => replica.name === replicaName
    );

    selectedReplica &&
      setReplica(ReplicaSummaryModelNormalizer(selectedReplica));
  }, [environment, componentName, replicaName]);

  return replica;
};
