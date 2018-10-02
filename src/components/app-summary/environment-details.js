import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import { routeWithParams, linkToComponent } from '../../utils/string';
import routes from '../../routes';

const MAX_COMPONENTS = 3;

export const EnvDetails = ({ env, appName, components }) => {
  const componentsToDisplay =
    components.length > MAX_COMPONENTS
      ? components.slice(0, MAX_COMPONENTS - 1)
      : components;

  const envUrl = routeWithParams(routes.appEnvironment, {
    appName,
    envName: env.name,
  });

  const componentUrl = component =>
    routeWithParams(routes.appComponent, {
      appName,
      envName: env.name,
      componentName: component.name,
    });

  return (
    <div className="app-summary__tile">
      <Link to={envUrl}>{env.name}</Link>
      <ul className="app-summary__components">
        {componentsToDisplay.map(component => (
          <li className="app-summary__component" key={component.name}>
              <Link to={componentUrl(component)}>{component.name}</Link>
              {
                component.public
                ? <a
                    className="app-summary__component-link"
                    href={linkToComponent(component.name, appName, env.name)}
                    target="_blank"
                    rel="noopener noreferrer"
                    title="Go to component"
                  >
                    <FontAwesomeIcon icon={faLink} />
                  </a>
                : null
              }
            </li>
        ))}
        {components.length > MAX_COMPONENTS && (
          <li>
            <Link to={routeWithParams(routes.app, { id: appName })}>
              +{components.length - MAX_COMPONENTS + 1} components
            </Link>
          </li>
        )}
      </ul>
    </div>
  );
};

export default EnvDetails;
