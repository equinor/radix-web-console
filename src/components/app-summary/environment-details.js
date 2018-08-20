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

const maxComponents = 3;

export const EnvDetails = ({ env, appName, components }) => {
  const componentsToDisplay =
    components.length > maxComponents
      ? components.slice(0, maxComponents - 1)
      : components;

  const envUrl = routeWithParams(routes.appEnvironment, {
    id: appName,
    env: env.name,
  });

  return (
    <div className="app-summary__tile">
      <Link to={envUrl}>{env.name}</Link>
      <ul className="app-summary__components">
        {componentsToDisplay.map(component => (
          <li className="app-summary__component" key={component.name}>
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
          </li>
        ))}
        {components.length > maxComponents && (
          <li>
            <Link to={routeWithParams(routes.app, { id: appName })}>
              +{components.length - maxComponents + 1} components
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default EnvDetails;
