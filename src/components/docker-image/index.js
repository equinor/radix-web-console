import React from 'react';

import { Button, Icon } from '@equinor/eds-core-react';
import { copy } from '@equinor/eds-icons';

import { copyToClipboard } from '../../utils/string';

import './style.css';

const tagRegEx = /\/(.*?)$/;

const DockerImage = ({ path }) => {
  let imageParts = tagRegEx.exec(path);
  let tag = path;

  // If image is prefixed with container registry, strip
  // that part from the tag
  if (imageParts) {
    tag = imageParts[1];
  }

  return (
    <>
      <strong>{tag}</strong>{' '}
      <Button onClick={() => copyToClipboard(tag)} variant="ghost">
        Copy
        <Icon data={copy} />
      </Button>
    </>
  );
};

export default DockerImage;
