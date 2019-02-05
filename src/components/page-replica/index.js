import { Route } from 'react-router';
import React from 'react';

import ReplicaOverview from './replica-overview';

import DocumentTitle from '../document-title';

import { smallReplicaName } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

export const PageReplica = ({
  appName,
  envName,
  deploymentName,
  componentName,
  replicaName,
}) => (
  <React.Fragment>
    <DocumentTitle title={`Replica ${smallReplicaName(replicaName)}`} />
    <Route
      exact
      path={routes.appReplica}
      render={() => (
        <ReplicaOverview
          appName={appName}
          envName={envName}
          deploymentName={deploymentName}
          componentName={componentName}
          replicaName={replicaName}
        />
      )}
    />
  </React.Fragment>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'deploymentName', 'componentName', 'replicaName'],
  PageReplica
);
