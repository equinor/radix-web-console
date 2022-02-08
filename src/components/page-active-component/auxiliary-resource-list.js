import { Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';
import { AuxiliaryResourceModel } from '../../models/auxiliary-resource';
import { AuxiliaryResourceType } from '../../models/auxiliary-resource-type';
import { StatusBadge } from '../status-badge';
import { ReplicaList } from '../replica-list';
import { getReplicaUrl } from '../../utils/routing';

const auxiliaryResourceDisplayName = {
  [AuxiliaryResourceType.OAuth2]: 'OAuth2 Service',
};

const replicatUrlFuncFactory = (appName, envName, componentName) => {
  return (replicaName) => {
    return getReplicaUrl(appName, envName, componentName, replicaName);
  };
};

export const AuxiliaryResourceList = ({
  appName,
  envName,
  componentName,
  auxiliaryResources,
}) => {
  return (
    <React.Fragment>
      {auxiliaryResources &&
        auxiliaryResources.map((auxResource, idx) => {
          return (
            <div key={idx} className="grid grid--gap-medium">
              <div className="grid grid--gap-medium grid--overview-columns">
                <div>
                  <Typography variant="h4">
                    {auxiliaryResourceDisplayName[auxResource.type] ??
                      auxResource.type}
                  </Typography>
                </div>
                {auxResource.deployment && (
                  <div className="component-status">
                    <Typography>Status</Typography>
                    <StatusBadge type={auxResource.deployment.status}>
                      {auxResource.deployment.status}
                    </StatusBadge>
                  </div>
                )}
              </div>
              <div>
                {auxResource.deployment &&
                auxResource.deployment.replicaList &&
                auxResource.deployment.replicaList.length > 0 ? (
                  <ReplicaList
                    replicaList={auxResource.deployment.replicaList}
                    replicaUrlFunc={replicatUrlFuncFactory(
                      appName,
                      envName,
                      componentName
                    )}
                  />
                ) : (
                  <Typography variant="body_short">
                    This resource has no replicas
                  </Typography>
                )}
              </div>
            </div>
          );
        })}
    </React.Fragment>
  );
};

AuxiliaryResourceList.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  auxiliaryResources: PropTypes.arrayOf(
    PropTypes.shape(AuxiliaryResourceModel)
  ),
};
