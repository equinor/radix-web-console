import { Icon, Typography } from '@equinor/eds-core-react';
import { github } from '@equinor/eds-icons';
import { Link } from 'react-router-dom';
import { routes } from '../../routes';
import type { Deployment } from '../../store/radix-api';
import { routeWithParams, smallJobName } from '../../utils/string';
import { GitTagLinks } from '../git-tags/git-tag-links';
import { RelativeToNow } from '../time/relative-to-now';

import './style.css';
import { CommitHash } from '../commit-hash';

type Props = {
  appName: string;
  deployment: Deployment;
};

export const DeploymentSummary = ({ appName, deployment }: Props) => (
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
          <Typography
            as={Link}
            to={routeWithParams(routes.appEnvironment, {
              appName,
              envName: deployment.environment,
            })}
            link
          >
            {deployment.environment}
          </Typography>
        </Typography>

        <Typography>
          Active from{' '}
          <strong>
            <RelativeToNow
              time={deployment.activeFrom && new Date(deployment.activeFrom)}
            />
          </strong>
        </Typography>

        {deployment.activeTo && (
          <Typography>
            Active until{' '}
            <strong>
              <RelativeToNow time={new Date(deployment.activeTo)} />
            </strong>
          </Typography>
        )}

        {deployment.gitCommitHash && (
          <Typography>
            Built from commit{' '}
            <CommitHash
              repo={deployment.repository}
              commit={deployment.gitCommitHash}
            />
          </Typography>
        )}
      </div>

      <div className="grid grid--gap-medium">
        {deployment.createdByJob && (
          <Typography>
            Created by pipeline job{' '}
            <Typography
              as={Link}
              to={routeWithParams(routes.appJob, {
                appName,
                jobName: deployment.createdByJob,
              })}
              link
            >
              {smallJobName(deployment.createdByJob)}
            </Typography>
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
