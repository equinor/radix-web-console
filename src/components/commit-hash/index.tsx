import { Icon } from '@equinor/eds-core-react';
import { github } from '@equinor/eds-icons';
import type { FunctionComponent, PropsWithChildren } from 'react';

import { smallGithubCommitHash } from '../../utils/string';
import { ExternalLink } from '../link/external-link';

export interface CommitHashProps {
  commit: string;
  repo?: string;
}

const ExternalLinkWrapper: FunctionComponent<
  PropsWithChildren<CommitHashProps>
> = ({ repo, commit, children }) =>
  repo ? (
    <ExternalLink
      href={`${repo}/commit/${commit}`}
      title="Open commit in repository"
    >
      {children}
    </ExternalLink>
  ) : (
    <>{children}</>
  );

export const CommitHash: FunctionComponent<CommitHashProps> = ({
  repo,
  commit,
}) =>
  commit?.length > 0 ? (
    <ExternalLinkWrapper {...{ repo, commit }}>
      {repo && <Icon data={github} size={18} />} {smallGithubCommitHash(commit)}
    </ExternalLinkWrapper>
  ) : null;
