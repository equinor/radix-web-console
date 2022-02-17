import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { ReplicaList } from '../replica-list';
import { ReplicaSummaryNormalizedModelValidationMap } from '../../models/replica-summary';
import { getReplicaUrl } from '../../utils/routing';

const replicaUrlFuncFactory =
  (appName, envName, componentName) => (replicaName) =>
    getReplicaUrl(appName, envName, componentName, replicaName);

export const ComponentReplicaList = ({
  appName,
  envName,
  componentName,
  replicaList,
}) => {
  return (
    <>
      <Typography variant="h4">Replicas</Typography>
      {replicaList?.length > 0 ? (
        <ReplicaList
          replicaList={replicaList}
          replicaUrlFunc={replicaUrlFuncFactory(
            appName,
            envName,
            componentName
          )}
        />
      ) : (
        <Typography>This component has no replicas</Typography>
      )}
    </>
  );
};

ComponentReplicaList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  replicaList: PropTypes.arrayOf(
    PropTypes.shape(ReplicaSummaryNormalizedModelValidationMap).isRequired
  ),
};
