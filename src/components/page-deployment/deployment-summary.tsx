import { Icon, Typography } from '@equinor/eds-core-react';
import { github } from '@equinor/eds-icons';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { GitTagLinks } from '../git-tags/git-tag-links';
import { RelativeToNow } from '../time/relative-to-now';
import {
  DeploymentModel,
  DeploymentModelValidationMap,
} from '../../models/radix-api/deployments/deployment';
import { routes } from '../../routes';
import {
  linkToGitHubCommit,
  routeWithParams,
  smallGithubCommitHash,
  smallJobName,
} from '../../utils/string';

import './style.css';

export interface DeploymentSummaryProps {
  appName: string;
  deployment: DeploymentModel;
}

export const DeploymentSummary = ({
  appName,
  deployment,
}: DeploymentSummaryProps): JSX.Element => (
  <div className="grid grid--gap-medium">
    <Typography variant="h4">Overview</Typography>
    <div className="grid grid--gap-medium grid--overview-columns">
      <div className="grid grid--gap-medium">
        <Typography>
          {deployment.activeTo ? (
            'This deployment was deployed to environment'
          ) : (
            <>
              <strong>Currently deployed</strong> on environment
            </>
          )}{' '}
          <Link
            to={routeWithParams(routes.appEnvironment, {
              appName,
              envName: deployment.environment,
            })}
          >
            <Typography link as="span">
              {deployment.environment}
            </Typography>
          </Link>
        </Typography>

        <Typography>
          Active from{' '}
          <strong>
            <RelativeToNow time={deployment.activeFrom} />
          </strong>
        </Typography>

        {deployment.activeTo && (
          <Typography>
            Active until{' '}
            <strong>
              <RelativeToNow time={deployment.activeTo} />
            </strong>
          </Typography>
        )}

        {deployment.gitCommitHash && (
          <Typography>
            Built from commit{' '}
            <Typography
              link
              href={linkToGitHubCommit(
                deployment.repository,
                deployment.gitCommitHash
              )}
              token={{ textDecoration: 'none' }}
            >
              {smallGithubCommitHash(deployment.gitCommitHash)}{' '}
              <Icon data={github} size={24} />
            </Typography>
          </Typography>
        )}
      </div>

      <div className="grid grid--gap-medium">
        {deployment.createdByJob && (
          <Typography>
            Created by pipeline job{' '}
            <Link
              to={routeWithParams(routes.appJob, {
                appName,
                jobName: deployment.createdByJob,
              })}
            >
              <Typography link as="span">
                {smallJobName(deployment.createdByJob)}
              </Typography>
            </Link>
          </Typography>
        )}

        {deployment.gitTags && (
          <div className="deploy-summary_tags grid grid--gap-x-small grid--auto-columns">
            <Typography>Tags</Typography>
            <GitTagLinks
              gitTags={deployment.gitTags}
              repository={deployment.repository}
            />
            <Icon data={github} size={24} />
          </div>
        )}
      </div>
    </div>
  </div>
);

DeploymentSummary.propTypes = {
  appName: PropTypes.string.isRequired,
  deployment: PropTypes.shape(DeploymentModelValidationMap).isRequired,
} as PropTypes.ValidationMap<DeploymentSummaryProps>;
