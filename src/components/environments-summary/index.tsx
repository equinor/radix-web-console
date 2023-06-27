import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { EnvironmentCard } from './environment-card';

import { externalUrls } from '../../externalUrls';
import {
  EnvironmentSummaryModel,
  EnvironmentSummaryModelValidationMap,
} from '../../models/radix-api/environments/environment-summary';

import './style.css';

export interface EnvironmentsSummaryProps {
  appName: string;
  envs: Array<EnvironmentSummaryModel>;
  repository?: string;
}

export const EnvironmentsSummary = ({
  appName,
  envs,
  repository,
}: EnvironmentsSummaryProps): JSX.Element => (
  <div className="environments-summary">
    {envs?.length > 0 ? (
      envs.map((env) => (
        <EnvironmentCard
          key={env.name}
          appName={appName}
          env={env}
          repository={repository}
        />
      ))
    ) : (
      <Typography>
        <strong>No environments.</strong> You must define at least one
        environment in{' '}
        <Typography
          link
          href={externalUrls.referenceRadixConfig}
          rel="noopener noreferrer"
          target="_blank"
        >
          radixconfig.yaml
        </Typography>
      </Typography>
    )}
  </div>
);

EnvironmentsSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(PropTypes.shape(EnvironmentSummaryModelValidationMap))
    .isRequired,
  repository: PropTypes.string,
} as PropTypes.ValidationMap<EnvironmentsSummaryProps>;
