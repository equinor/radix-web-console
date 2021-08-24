import { Button, Icon } from '@equinor/eds-core-react';
import { copy } from '@equinor/eds-icons';
import React from 'react';

import { copyToClipboard } from '../../utils/string';

import './style.css';

const tagRegEx = /\/(.*?)$/;

const DockerImage = ({ path }) => {
  const imageParts = tagRegEx.exec(path);

  // If image is prefixed with container registry, strip that part from the tag
  const tag = imageParts ? imageParts[1] : path;

  return (
    <>
      <strong>{tag}</strong>{' '}
      <Button variant="ghost" onClick={() => copyToClipboard(tag)}>
        <Icon data={copy} /> Copy
      </Button>
    </>
  );
};

export default DockerImage;
