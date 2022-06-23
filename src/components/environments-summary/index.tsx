import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { EnvironmentCard } from './environment-card';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../../models/environment-summary';

import './style.css';

export interface EnvironmentsSummaryProps {
  appName: string;
  envs: Array<EnvironmentSummaryModel>;
}

export const EnvironmentsSummary = ({
  appName,
  envs,
}: EnvironmentsSummaryProps): JSX.Element => (
  <div className="environments-summary">
    {envs.length > 0 ? (
      envs.map((env) => (
        <EnvironmentCard key={env.name} appName={appName} env={env} />
      ))
    ) : (
      <Typography>
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
} as PropTypes.ValidationMap<EnvironmentsSummaryProps>;
