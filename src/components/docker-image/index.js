import { faDocker } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';

import './style.css';

const tagRegEx = /\/(.*?)$/;

const DockerImage = ({ path }) => {
  const tag = tagRegEx.exec(path)[1];

  return (
    <a
      className="docker-image"
      href={`https://${path}`}
      title="Open image in repository"
    >
      {tag}
      <FontAwesomeIcon icon={faDocker} size="lg" />
    </a>
  );
};

export default DockerImage;
