import { FunctionComponent } from 'react';

import ActiveJobComponentOverview from './active-job-component-overview';

import { DocumentTitle } from '../document-title';
import { mapRouteParamsToProps } from '../../utils/routing';

export const PageActiveJobComponent: FunctionComponent<{
  appName: string;
  envName: string;
  jobComponentName: string;
}> = ({ appName, envName, jobComponentName }) => (
  <>
    <DocumentTitle title={`${jobComponentName} in ${envName}`} />
    <ActiveJobComponentOverview
      appName={appName}
      envName={envName}
      jobComponentName={jobComponentName}
    />
  </>
);

export default mapRouteParamsToProps(
  ['appName', 'envName', 'jobComponentName'],
  PageActiveJobComponent
);
