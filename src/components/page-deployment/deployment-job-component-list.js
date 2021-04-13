import Component from '../../models/component';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import DockerImage from '../docker-image';
import React from 'react';

const DeploymentJobComponentList = ({
  appName,
  deploymentName,
  components,
}) => {
  return (
    <React.Fragment>
      {components && (
        <section>
          <h2 className="o-heading-section">Jobs</h2>
          {components.map((component) => {
            return (
              <p key={component.name}>
                <Link
                  to={routeWithParams(routes.appJobComponent, {
                    appName,
                    deploymentName,
                    jobComponentName: component.name,
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
