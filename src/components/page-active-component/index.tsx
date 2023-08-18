import { FunctionComponent } from 'react';

import ActiveComponentOverview from './active-component-overview';

import { DocumentTitle } from '../document-title';
import { mapRouteParamsToProps } from '../../utils/routing';

export const PageActiveComponent: FunctionComponent<{
  appName: string;
  envName: string;
  componentName: string;
}> = ({ appName, envName, componentName }) => (
  <>
    <DocumentTitle title={`${componentName} in ${envName}`} />
    <ActiveComponentOverview
      appName={appName}
      envName={envName}
      componentName={componentName}
    />
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName'],
  PageActiveComponent
);
