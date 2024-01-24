import { Icon } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { CommitHash } from '../commit-hash';
import { github } from '@equinor/eds-icons';
import { GitTagLinks } from '../git-tags/git-tag-links';

type Props = {
  commitID?: string;
  gitTags?: string;
  repository: string;
};

export const GitCommitTags = ({ commitID, gitTags, repository }: Props) => {
  return (
    <>
      {commitID && (
        <>
          {' commit '}
          <CommitHash commit={commitID} repo={repository} />
        </>
      )}
      {gitTags && (
        <>
          {' '}
          <Icon data={github} size={18} />
          {repository ? (
            <GitTagLinks gitTags={gitTags} repository={repository} />
          ) : (
            { gitTags }
          )}
        </>
      )}
    </>
  );
};

GitCommitTags.propTypes = {
  commitID: PropTypes.string,
  gitTags: PropTypes.string,
  repository: PropTypes.string,
};
