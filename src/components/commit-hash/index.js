import React from 'react';

import './style.css';

const TRAIL_CHARS = 7;

const CommitHash = ({ commit }) => {
  if (commit === undefined || commit.length === 0) {
    return null;
  }

  return <span className="commit-hash">{commit.slice(-TRAIL_CHARS)}</span>;
};

export default CommitHash;
