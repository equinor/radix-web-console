import React from 'react';
const clusterDomain = require('../../config.json').clusterDomain;

export const EnvDetails = ({ env, appName, components }) => {
  return (
    <div className="appsummary__block__content">
      <div key={env.name}>
        <text>{env.name}</text>
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
