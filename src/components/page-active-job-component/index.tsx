import { FunctionComponent } from 'react';

import ActiveJobComponentOverview from './active-job-component-overview';

import { DocumentTitle } from '../document-title';
import { connectRouteParams, routeParamLoader } from '../../utils/router';

export const PageActiveJobComponent: FunctionComponent<{
  appName: string;
  envName: string;
  jobComponentName: string;
}> = ({ appName, envName, jobComponentName }) => (
  <>
    <DocumentTitle title={`${jobComponentName} in ${envName}`} />
    <ActiveJobComponentOverview {...{ appName, envName, jobComponentName }} />
  </>
);

const Component = connectRouteParams(PageActiveJobComponent);
export { Component, routeParamLoader as loader };
