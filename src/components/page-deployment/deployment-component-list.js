import Component from '../../models/component';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import DockerImage from '../docker-image';
import React from 'react';

const DeploymentComponentList = ({ appName, deploymentName, components }) => {
  return (
    <section>
      <h2 className="o-heading-section">Components</h2>
      {components &&
        components.map((component) => {
          return (
            <p key={component.name}>
              <Link
                to={routeWithParams(routes.appComponent, {
                  appName,
                  deploymentName,
                  componentName: component.name,
                })}
              >
                {component.name}
              </Link>
              <br />
              image <DockerImage path={component.image} />
            </p>
          );
        })}
    </section>
  );
};

DeploymentComponentList.propTypes = {
  appName: PropTypes.string.isRequired,
  deploymentName: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(PropTypes.shape(Component)),
};

export default DeploymentComponentList;
