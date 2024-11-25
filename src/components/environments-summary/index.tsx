import { Typography } from '@equinor/eds-core-react';
import { Link } from 'react-router-dom';
import { externalUrls } from '../../externalUrls';
import { routes } from '../../routes';
import type { EnvironmentSummary } from '../../store/radix-api';
import { routeWithParams } from '../../utils/string';
import { EnvironmentCard } from './environment-card';
import './style.css';
import { ExternalLink } from '../link/external-link';

export interface EnvironmentsSummaryProps {
  appName: string;
  envs?: Readonly<Array<EnvironmentSummary>>;
  repository?: string;
}

export const EnvironmentsSummary = ({
  appName,
  envs,
  repository,
}: EnvironmentsSummaryProps) => (
  <div className="environments-summary">
    {envs && envs.length > 0 ? (
      envs.map((env, i) => (
        <EnvironmentCard key={i} {...{ appName, env, repository }} />
      ))
    ) : (
      <span>
        <Typography bold>No enironments.</Typography>
        <Typography>
          Please run the{' '}
          <Typography
            as={Link}
            to={routeWithParams(
              routes.appJobNew,
              {
                appName: appName,
              },
              { pipeline: 'apply-config' }
            )}
            link
          >
            apply-config
          </Typography>{' '}
          pipeline job to apply{' '}
          <ExternalLink href={externalUrls.referenceRadixConfig}>
            radixconfig.yaml
          </ExternalLink>
        </Typography>
      </span>
    )}
  </div>
);
