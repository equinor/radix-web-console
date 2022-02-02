import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import EnvironmentCard from './environment-card';

import { EnvironmentSummaryModelValidationMap } from '../../models/environment-summary';

import './style.css';

export const EnvironmentsSummary = ({ appName, envs }) => (
  <div className="environments-summary">
    {envs.length > 0 ? (
      <>
        {envs.map((env) => (
          <EnvironmentCard appName={appName} env={env} key={env.name} />
        ))}
      </>
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
  envs: PropTypes.arrayOf(PropTypes.shape(EnvironmentSummaryModelValidationMap))
    .isRequired,
};

export default EnvironmentsSummary;
