import { Icon, Typography } from '@equinor/eds-core-react';
import { github } from '@equinor/eds-icons';
import React from 'react';

const TRAIL_CHARS = 7;

const CommitHash = ({ commit, repo }) => {
  if (!commit || !commit.length) {
    return null;
  }

  const miniHash = commit.slice(-TRAIL_CHARS);
  return repo ? (
    <Typography
      title="Open commit in repository"
      link
      href={`${repo}/commit/${commit}`}
      token={{ textDecoration: 'none' }}
    >
      {miniHash} <Icon data={github} />
    </Typography>
  ) : (
    <Typography as="span" token={{ color: 'currentColor' }}>
      {miniHash}
    </Typography>
  );
};

export default CommitHash;
