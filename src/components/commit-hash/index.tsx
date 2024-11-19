import { Icon } from '@equinor/eds-core-react';
import { github } from '@equinor/eds-icons';
import type { PropsWithChildren } from 'react';

import { smallGithubCommitHash } from '../../utils/string';
import { ExternalLink } from '../link/external-link';

type CommitHashProps = {
  commit: string;
  repo?: string;
};

const ExternalLinkWrapper = ({
  repo,
  commit,
  children,
}: PropsWithChildren<CommitHashProps>) =>
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

export const CommitHash = ({ repo, commit }: CommitHashProps) =>
  commit?.length > 0 ? (
    <ExternalLinkWrapper {...{ repo, commit }}>
      {repo && <Icon data={github} size={18} />} {smallGithubCommitHash(commit)}
    </ExternalLinkWrapper>
  ) : null;
