import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';

import { EnvironmentCard } from './environment-card';

import { externalUrls } from '../../externalUrls';
import type { EnvironmentSummary } from '../../store/radix-api';

import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import { routeWithParams } from '../../utils/string';

import './style.css';
import { ExternalLink } from '../link/external-link';

export interface EnvironmentsSummaryProps {
  appName: string;
  envs?: Readonly<Array<EnvironmentSummary>>;
  repository?: string;
}

export const EnvironmentsSummary: FunctionComponent<
  EnvironmentsSummaryProps
> = ({ appName, envs, repository }) => (
  <div className="environments-summary">
    {envs?.length > 0 ? (
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

EnvironmentsSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<EnvironmentSummary>
  ),
  repository: PropTypes.string,
};
