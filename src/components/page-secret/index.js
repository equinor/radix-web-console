import React from 'react';

import SecretOverview from './secret-overview';

import DocumentTitle from '../document-title';

import { mapRouteParamsToProps } from '../../utils/routing';

import './style.css';

export const PageSecret = ({
  appName,
  envName,
  deploymentName,
  componentName,
  secretName,
}) => (
  <React.Fragment>
    <DocumentTitle title={`Secret ${secretName}`} />
    <SecretOverview
      appName={appName}
      envName={envName}
      deploymentName={deploymentName}
      componentName={componentName}
      secretName={secretName}
    />
  </React.Fragment>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'deploymentName', 'componentName', 'secretName'],
  PageSecret
);
