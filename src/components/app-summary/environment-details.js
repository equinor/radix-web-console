import React from 'react';
import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import { Link } from 'react-router-dom';
const clusterDomain = require('../../config.json').clusterDomain;

export const EnvDetails = ({ env, appName, components, index }) => {
  return (
    <div className="appsummary__block__content">
      <div key={env.name}>
        <Link
          className="appsummary__block__environment-link"
          to={routeWithParams(routes.app, {
            id: appName,
          })}
        >
          <b>{env.name}</b>
        </Link>
      </div>
      <div>
        {components.map((component, index) => (
          <div className="comp" key={index}>
            <text className="compName" key={component.name}>
              {component.name}
            </text>
            <a
              key={`${env.name}${component.name}`}
              //target="_blank"
              className="compLink"
              href={`https://${component.name}-${appName}-${
                env.name
              }.${clusterDomain}`}
            >
              <span>{component.name}</span>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EnvDetails;
