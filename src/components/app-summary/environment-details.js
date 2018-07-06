import React from 'react';
const clusterDomain = require('../../config.json').clusterDomain;

export const EnvDetails = ({ counter, env, appName, components }) => {
  return (
    <div className="app-env__content">
      <div key={env.name}>
        <strong>{env.name}</strong>
      </div>
      <div>
        {components.map((component, index) => (
          <div className="comp" key={index}>
            <b
              className="compName"
              key={component.name}
              style={{ opacity: '0.8' }}
            >
              {component.name}
            </b>
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
