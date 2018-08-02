import React from 'react';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import { Link } from 'react-router-dom';
const clusterDomain = require('../../config.json').clusterDomain;

const generateLink = (componentName, appName, env) => {
  return `https://${componentName}-${appName}-${env}.${clusterDomain}`;
};

export const EnvDetails = ({ env, appName, components, appStatus }) => {
  return (
    <React.Fragment>
      <Link
        className="appsummary__environment-link"
        to={routeWithParams(routes.app, {
          id: appName,
        })}
      >
        {env.name}
      </Link>
      <div className="component-list" key={env.name}>
        {components.map(component => (
          <div className="component-list__element" key={component.name}>
            <div className="component-list__component-name" key={component.name}>
              {component.name}
            </div>
            <a
              target='_blank'
              key={`${env.name}${component.name}`}
              className={'component-list__link appsummary__block--' + appStatus}
              href={generateLink(component.name, appName, env.name)}
            >
              <span>{component.name}</span>
            </a>
          </div>
        ))}
      </div>
    </React.Fragment>
  );
};

export default EnvDetails;
