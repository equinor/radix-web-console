import PropTypes from 'prop-types';
import ReplicaSummaryModel from '../../models/replica-summary';
import React from 'react';
import { Typography } from '@equinor/eds-core-react';
import { getReplicaUrl } from '../../utils/routing';
import { ReplicaList } from '../replica-list';

const replicatUrlFuncFactory =
  (appName, envName, componentName) => (replicaName) =>
    getReplicaUrl(appName, envName, componentName, replicaName);

export const ComponentReplicaList = ({
  appName,
  envName,
  componentName,
  replicaList,
}) => {
  return (
    <React.Fragment>
      <Typography variant="h4">Replicas</Typography>
      {replicaList && replicaList.length > 0 ? (
        <ReplicaList
          replicaList={replicaList}
          replicaUrlFunc={replicatUrlFuncFactory(
            appName,
            envName,
            componentName
          )}
        />
      ) : (
        <Typography variant="body_short">
          This component has no replicas
        </Typography>
      )}
    </React.Fragment>
  );
};

ComponentReplicaList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  replicaList: PropTypes.arrayOf(PropTypes.exact(ReplicaSummaryModel)),
};
