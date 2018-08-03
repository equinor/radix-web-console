import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
const clusterDomain = require('../../config.json').clusterDomain;

const generateLink = (componentName, appName, env) => {
  return `https://${componentName}-${appName}-${env}.${clusterDomain}`;
};

export const EnvDetails = ({ env, appName, components }) => {
  return (
    <div className="app-summary__tile">
      <Link to={routeWithParams(routes.app, { id: appName })}>{env.name}</Link>
      <div className="app-summary__components">
        {components.map(component => (
          <div className="app-summary__component" key={component.name}>
            <Link to={routeWithParams(routes.app, { id: appName })}>
              {component.name}
            </Link>
            <a
              className="app-summary__component-link"
              href={generateLink(component.name, appName, env.name)}
              target="_blank"
              title="Go to component"
            >
              <FontAwesomeIcon icon={faLink} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvDetails;
