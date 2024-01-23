import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { ComponentSecrets } from '../component/component-secrets';
import { EnvironmentVariables } from '../environment-variables';
import { Overview } from '../page-active-component/overview';
import { routes } from '../../routes';
import { useGetDeploymentQuery } from '../../store/radix-api';
import { pollingInterval } from '../../store/defaults';
import { routeWithParams, smallDeploymentName } from '../../utils/string';

export const DeploymentComponentOverview: FunctionComponent<{
  appName: string;
  deploymentName: string;
  componentName: string;
}> = ({ appName, deploymentName, componentName }) => {
  const { data: deployment, ...deploymentState } = useGetDeploymentQuery(
    { appName, deploymentName },
    { skip: !appName || !deploymentName, pollingInterval }
  );
  const component = deployment?.components?.find(
    ({ name }) => name === componentName
  );

  return (
    <>
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          {
            label: 'Deployments',
            to: routeWithParams(routes.appDeployments, { appName }),
          },
          {
            label: smallDeploymentName(deploymentName),
            to: routeWithParams(routes.appDeployment, {
              appName,
              deploymentName,
            }),
          },
          { label: componentName },
        ]}
      />

      <AsyncResource asyncState={deploymentState}>
        {deployment && component && (
          <>
            <Overview
              component={component}
              envName={deployment.environment}
              deployment={deployment}
            />

            <div>
              <ComponentSecrets component={component} />
            </div>

            <div className="grid grid--gap-medium">
              <EnvironmentVariables
                appName={appName}
                envName={deployment.environment}
                componentName={componentName}
                componentType={component.type}
                hideRadixVars
                readonly
              />
            </div>
          </>
        )}
      </AsyncResource>
    </>
  );
};

DeploymentComponentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
};
