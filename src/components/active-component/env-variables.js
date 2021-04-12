import React from 'react';
import PropTypes from 'prop-types';
import componentModel from '../../models/component';

const EnvVariables = ({ component, includeRadixVars }) => {
  let hasRadixVars = false;
  const envVarNames = component && Object.keys(component.variables);

  const varList = envVarNames.map((varName) => {
    const isRadixVar = varName.slice(0, 6) === 'RADIX_';
    hasRadixVars = includeRadixVars && (hasRadixVars || isRadixVar);

    if (!isRadixVar) {
      return (
        <React.Fragment key={varName}>
          <dt>{varName}</dt>
          <dd>{(component && component.variables)[varName]}</dd>
        </React.Fragment>
      );
    }

    if (includeRadixVars !== true) {
      return '';
    }

    return (
      <React.Fragment key={varName}>
        <dt>
          * <em>{varName}</em>
        </dt>
        <dd>
          <em>{(component && component.variables)[varName]}</em>
        </dd>
      </React.Fragment>
    );
  });

  return (
    <div>
      <h2 className="o-heading-section">Environment variables</h2>
      {envVarNames.length === 0 && (
        <p>This component uses no environment variables</p>
      )}
      {envVarNames.length > 0 && (
        <div>
          <dl className="o-key-values">{varList}</dl>
          {hasRadixVars && (
            <p>
              <small>* automatically added by Radix</small>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

EnvVariables.propTypes = {
  component: PropTypes.shape(componentModel),
};

export default EnvVariables;
