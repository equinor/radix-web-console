import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import { pollingInterval } from '../../store/defaults';
import { useGetDeploymentQuery } from '../../store/radix-api';
import { buildComponentMap } from '../../utils/build-component-map';
import { routeWithParams, smallDeploymentName } from '../../utils/string';
import { Alert } from '../alert';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { DeploymentComponentList } from './deployment-component-list';
import { DeploymentJobComponentList } from './deployment-job-component-list';
import { DeploymentSummary } from './deployment-summary';

type Props = {
  appName: string;
  deploymentName: string;
};

export const DeploymentOverview = ({ appName, deploymentName }: Props) => {
  const { data: deployment, ...deploymentState } = useGetDeploymentQuery(
    { appName, deploymentName },
    { skip: !appName || !deploymentName, pollingInterval }
  );
  const componentMap = buildComponentMap(deployment?.components ?? []);
  return (
    <>
      <Breadcrumb
        links={[
          { label: appName, to: routeWithParams(routes.app, { appName }) },
          {
            label: 'Deployments',
            to: routeWithParams(routes.appDeployments, { appName }),
          },
          { label: smallDeploymentName(deploymentName) },
        ]}
      />

      <main className="grid grid--gap-medium">
        <AsyncResource asyncState={deploymentState}>
          {!deployment ? (
            'No deployment…'
          ) : (
            <>
              {!deployment.activeTo && (
                <Alert className="icon">
                  <Icon data={info_circle} />
                  <Typography>This deployment is active</Typography>
                </Alert>
              )}

              <div>
                <Button
                  as={Link}
                  to={routeWithParams(
                    routes.appJobNew,
                    { appName },
                    {
                      pipeline: 'promote',
                      deploymentName: deploymentName,
                      fromEnvironment: deployment.environment,
                    }
                  )}
                >
                  Promote deployment
                </Button>
              </div>

              <DeploymentSummary appName={appName} deployment={deployment} />

              <div>
                <DeploymentComponentList
                  appName={appName}
                  deployment={deployment}
                  components={componentMap?.component ?? []}
                />
              </div>

              <div>
                <DeploymentJobComponentList
                  appName={appName}
                  deploymentName={deploymentName}
                  deployment={deployment}
                  components={componentMap?.job ?? []}
                />
              </div>
            </>
          )}
        </AsyncResource>
      </main>
    </>
  );
};
