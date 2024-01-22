import { Button, Icon, Typography } from '@equinor/eds-core-react';
import { info_circle } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import { DeploymentComponentList } from './deployment-component-list';
import { DeploymentJobComponentList } from './deployment-job-component-list';
import { DeploymentSummary } from './deployment-summary';

import { Alert } from '../alert';
import AsyncResource from '../async-resource/async-resource';
import { Breadcrumb } from '../breadcrumb';
import { buildComponentMap } from '../../utils/build-component-map';
import { routes } from '../../routes';
import { routeWithParams, smallDeploymentName } from '../../utils/string';
import { useGetDeploymentQuery } from '../../store/radix-api';
import { pollingInterval } from '../../store/defaults';
import { Link } from 'react-router-dom';

export const DeploymentOverview: FunctionComponent<{
  appName: string;
  deploymentName: string;
}> = ({ appName, deploymentName }) => {
  const { data: deployment, ...deploymentState } = useGetDeploymentQuery(
    { appName, deploymentName },
    { skip: !appName || !deploymentName, pollingInterval }
  );
  const componentMap = deployment && buildComponentMap(deployment.components);

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
                  deploymentName={deploymentName}
                  components={componentMap['component']}
                />
              </div>

              <div>
                <DeploymentJobComponentList
                  appName={appName}
                  deploymentName={deploymentName}
                  components={componentMap['job']}
                />
              </div>
            </>
          )}
        </AsyncResource>
      </main>
    </>
  );
};

DeploymentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
};
