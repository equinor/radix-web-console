import React from 'react';

import DeploymentComponentOverview from './deployment-component-overview';
import DocumentTitle from '../document-title';
import { mapRouteParamsToProps } from '../../utils/routing';

export const PageDeploymentComponent = ({
  appName,
  deploymentName,
  componentName,
}) => {
  return (
    <React.Fragment>
      <DocumentTitle title={`Component ${componentName}`} />
      <DeploymentComponentOverview
        appName={appName}
        deploymentName={deploymentName}
        componentName={componentName}
      />
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(
  ['appName', 'deploymentName', 'componentName'],
  PageDeploymentComponent
);
