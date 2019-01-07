import PropTypes from 'prop-types';
import React from 'react';
import { EnvironmentSummary } from 'radix-web-console-models';

export const EnvironmentsSummary = ({ envs }) => (
  <ul>
    {envs.map(env => (
      <li key={env.name}>{env.name}</li>
    ))}
  </ul>
);

EnvironmentsSummary.propTypes = {
  envs: PropTypes.arrayOf(PropTypes.shape(EnvironmentSummary)).isRequired,
};

export default EnvironmentsSummary;
