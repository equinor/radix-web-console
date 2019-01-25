import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './style.css';

const TRAIL_CHARS = 7;

const CommitHash = ({ commit, repo }) => {
  if (commit === undefined || commit.length === 0) {
    return null;
  }

  const miniHash = commit.slice(-TRAIL_CHARS);

  if (repo) {
    return (
      <a
        className="commit-hash"
        href={`${repo}/commit/${commit}`}
        title="Open commit in repository"
      >
        {miniHash}
        <FontAwesomeIcon icon={faGithub} size="lg" />
      </a>
    );
  }

  return <span className="commit-hash">{miniHash}</span>;
};

export default CommitHash;
