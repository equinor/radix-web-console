import type { FunctionComponent } from 'react';
import useLocalStorage from '../../effects/use-local-storage';
import { routes } from '../../routes';
import { pollingInterval } from '../../store/defaults';
import { useGetDeploymentQuery } from '../../store/radix-api';
import { routeWithParams, smallDeploymentName } from '../../utils/string';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { ComponentSecrets } from '../component/component-secrets';
import { EnvironmentVariables } from '../environment-variables';
import { Overview } from '../page-active-job-component/overview';

export const DeploymentJobComponentOverview: FunctionComponent<{
  appName: string;
  deploymentName: string;
  jobComponentName: string;
}> = ({ appName, deploymentName, jobComponentName }) => {
  const { data: deployment, ...deploymentState } = useGetDeploymentQuery(
    { appName, deploymentName },
    { skip: !appName || !deploymentName, pollingInterval }
  );
  const component = deployment?.components?.find(
    ({ name }) => name === jobComponentName
  );
  const [isEnvVarsListExpanded, setIsEnvVarsListExpanded] =
    useLocalStorage<boolean>('deploymentJobComponentEnvVarsListExpanded', true);

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
          { label: jobComponentName },
        ]}
      />

      <AsyncResource asyncState={deploymentState}>
        {deployment && component && (
          <>
            <Overview component={component} deployment={deployment} />
            <div>
              <ComponentSecrets component={component} />
            </div>
            <div className="grid grid--gap-medium">
              <EnvironmentVariables
                appName={appName}
                envName={deployment.environment}
                componentName={jobComponentName}
                componentType={component.type}
                hideRadixVars
                readonly
                isExpanded={isEnvVarsListExpanded}
                onExpanded={setIsEnvVarsListExpanded}
              />
            </div>
          </>
        )}
      </AsyncResource>
    </>
  );
};
