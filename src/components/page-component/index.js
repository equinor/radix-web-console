import React from 'react';

import ComponentOverview from './component-overview';

import DocumentTitle from '../document-title';

import { mapRouteParamsToProps } from '../../utils/routing';

export const PageComponent = ({ appName, deploymentName, componentName }) => {
  return (
    <React.Fragment>
      <DocumentTitle title={`Component ${componentName}`} />
      <ComponentOverview
        appName={appName}
        componentName={componentName}
        deploymentName={deploymentName}
      />
    </React.Fragment>
  );
};

export default mapRouteParamsToProps(
  ['appName', 'deploymentName', 'componentName'],
  PageComponent
);
