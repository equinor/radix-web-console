import { Icon, Typography } from '@equinor/eds-core-react';
import { github } from '@equinor/eds-icons';

import { smallGithubCommitHash } from '../../utils/string';

export interface CommitHashProps {
  commit: string;
  repo?: string;
}

export const CommitHash = ({ commit, repo }: CommitHashProps): JSX.Element =>
  commit?.length > 0 ? (
    <Typography
      link={!!repo}
      {...(!!repo
        ? {
            title: 'Open commit in repository',
            href: `${repo}/commit/${commit}`,
            token: { textDecoration: 'none' },
          }
        : { as: 'span', token: { color: 'currentColor' } })}
    >
      {smallGithubCommitHash(commit)} {repo && <Icon data={github} />}
    </Typography>
  ) : null;
