import { Icon, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';
import type { EnvironmentSummary } from '../../store/radix-api';
import { NewApplyConfigPipelineLink } from '../link/apply-config-pipeline-link';
import { EnvironmentCard } from './environment-card';
import './style.css';
import { info_circle } from '@equinor/eds-icons';
import { Alert } from '../alert';

export interface EnvironmentsSummaryProps {
  appName: string;
  envs?: Readonly<Array<EnvironmentSummary>>;
  repository?: string;
}

export const EnvironmentsSummary: FunctionComponent<
  EnvironmentsSummaryProps
> = ({ appName, envs, repository }) => {
  return (
    <>
      {envs?.length > 0 ? (
        <div className="environments-summary">
          {envs.map((env, i) => (
            <EnvironmentCard key={i} {...{ appName, env, repository }} />
          ))}
        </div>
      ) : (
        <Alert className="icon">
          <Icon data={info_circle} color="primary" />
          <span className="grid grid--gap-x-small">
            <Typography>
              The radixconfig.yaml file must be read by Radix in order to show
              information about environments.
            </Typography>
            <Typography>
              Run the{' '}
              <NewApplyConfigPipelineLink appName={appName}>
                apply-config
              </NewApplyConfigPipelineLink>{' '}
              pipeline job to read the file from the application's GitHub
              repository.
            </Typography>
          </span>
        </Alert>
      )}
    </>
  );
};

EnvironmentsSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(
    PropTypes.object as PropTypes.Validator<EnvironmentSummary>
  ),
  repository: PropTypes.string,
};
