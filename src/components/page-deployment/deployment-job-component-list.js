import Component from '../../models/component';
import PropTypes from 'prop-types';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import DockerImage from '../docker-image';
import React from 'react';
import { Typography } from '@equinor/eds-core-react';

const DeploymentJobComponentList = ({
  appName,
  deploymentName,
  components,
}) => {
  return (
    <React.Fragment>
      {components && (
        <>
          <Typography variant="h4">Jobs</Typography>
          {components.map((component) => {
            return (
              <Typography variant="body_short">
                <Typography
                  link
                  href={routeWithParams(routes.appJobComponent, {
                    appName,
                    deploymentName,
                    jobComponentName: component.name,
                  })}
                >
                  {component.name}
                </Typography>{' '}
                image <DockerImage path={component.image} />
              </Typography>
            );
          })}
        </>
      )}
    </React.Fragment>
  );
};

DeploymentJobComponentList.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(PropTypes.shape(Component)),
};

export default DeploymentJobComponentList;
