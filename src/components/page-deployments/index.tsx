import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import AsyncResource from '../async-resource/another-async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DeploymentsList } from '../deployments-list';
import { DocumentTitle } from '../document-title';
import { routes } from '../../routes';
import { useGetDeploymentsQuery } from '../../store/radix-api';
import { connectRouteParams, routeParamLoader } from '../../utils/router';
import { routeWithParams } from '../../utils/string';

export const PageDeployments: FunctionComponent<{ appName: string }> = ({
  appName,
}) => {
  const { data: deployments, ...state } = useGetDeploymentsQuery(
    { appName },
    { skip: !appName, pollingInterval: 15000 }
  );

  return (
    <>
      <DocumentTitle title={`${appName} deployments`} />
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          { label: 'Deployments' },
        ]}
      />
      <AsyncResource asyncState={state}>
        <DeploymentsList appName={appName} deployments={deployments} />
      </AsyncResource>
    </>
  );
};

PageDeployments.propTypes = {
  appName: PropTypes.string.isRequired,
};

const Component = connectRouteParams(PageDeployments);
export { Component, routeParamLoader as loader };

export default PageDeployments;
