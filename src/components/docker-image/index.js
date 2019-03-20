import React from 'react';

import Button from '../button';

import { copyToClipboard } from '../../utils/string';

import './style.css';

const tagRegEx = /\/(.*?)$/;

const DockerImage = ({ path }) => {
  const tag = tagRegEx.exec(path)[1];

  return (
    <span className="docker-image">
      <span className="docker-image__tag">{tag}</span>{' '}
      <Button
        onClick={() => copyToClipboard(tag)}
        btnType={['default', 'tiny']}
      >
        Copy
      </Button>
    </span>
  );
};

export default DockerImage;
