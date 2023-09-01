import { FunctionComponent } from 'react';

import SecretOverview from './secret-overview';

import { DocumentTitle } from '../document-title';
import { connectRouteParams, routeParamLoader } from '../../utils/router';

export interface PageSecretProps {
  appName: string;
  envName: string;
  componentName: string;
  secretName: string;
}

export const PageSecret: FunctionComponent<PageSecretProps> = ({
  appName,
  envName,
  componentName,
  secretName,
}) => (
  <>
    <DocumentTitle title={`Secret ${secretName}`} />
    <SecretOverview {...{ appName, envName, componentName, secretName }} />
  </>
);

const Component = connectRouteParams(PageSecret);
export { Component, routeParamLoader as loader };
