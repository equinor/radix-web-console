import { Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';
import { StatusBadge } from '../status-badge';
import { ReplicaList } from '../replica-list';
import { getOAuthReplicaUrl } from '../../utils/routing';
import { OAuthAuxiliaryResourceModel } from '../../models/oauth2-auxiliary-resource';

const replicatUrlFuncFactory = (appName, envName, componentName) => {
  return (replicaName) =>
    getOAuthReplicaUrl(appName, envName, componentName, replicaName);
};

export const OAuthAuxiliaryResource = ({
  appName,
  envName,
  componentName,
  oauth2,
}) => {
  return (
    <React.Fragment>
      {oauth2 && (
        <div className="grid grid--gap-medium">
          <div className="grid grid--gap-medium grid--overview-columns grid--align-center">
            <div className="grid grid--gap-medium grid--auto-columns">
              <Typography variant="h4">OAuth2 Service</Typography>
              {/* <AuxiliaryToolbar
                appName={appName}
                envName={envName}
                componentName={componentName}
                auxiliaryResource={auxResource}
              ></AuxiliaryToolbar> */}
            </div>
            {oauth2.deployment && (
              <div className="component-status">
                <Typography>Status</Typography>
                <StatusBadge type={oauth2.deployment.status}>
                  {oauth2.deployment.status}
                </StatusBadge>
              </div>
            )}
          </div>
          <div className="grid grid--table-overflow">
            {oauth2.deployment &&
            oauth2.deployment.replicaList &&
            oauth2.deployment.replicaList.length > 0 ? (
              <ReplicaList
                replicaList={oauth2.deployment.replicaList}
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
      )}
    </React.Fragment>
  );
};

OAuthAuxiliaryResource.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  oauth2: PropTypes.shape(OAuthAuxiliaryResourceModel),
};
