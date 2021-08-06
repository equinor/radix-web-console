import { Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';

import EnvironmentCard from './environment-card';
import environmentSummaryModel from '../../models/environment-summary';

import './style.css';

export const EnvironmentsSummary = ({ appName, envs }) => (
  <div className="environments-summary">
    {envs.length > 0 ? (
      <React.Fragment>
        {envs.map((env) => (
          <EnvironmentCard appName={appName} env={env} key={env.name} />
        ))}
      </React.Fragment>
    ) : (
      <Typography variant="body_short">
        <strong>No environments.</strong> You must define at least one
        environment in <code>radixconfig.yaml</code>
      </Typography>
    )}
  </div>
);

EnvironmentsSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(PropTypes.shape(environmentSummaryModel)).isRequired,
};

export default EnvironmentsSummary;
