import React from 'react';

import Button from '../button';

import { copyToClipboard } from '../../utils/string';

import './style.css';

const tagRegEx = /\/(.*?)$/;

const DockerImage = ({ path }) => {
  let imageParts = tagRegEx.exec(path)
  let tag = path

  // If image is prefixed with container registry, strip
  // that part from the tag
  if (imageParts) {
    tag = imageParts[1];
  }

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
