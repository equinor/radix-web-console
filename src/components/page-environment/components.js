import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import { linkToComponent } from '../../utils/string';
import Chip from '../chip';

const Components = ({ appName, env, components }) => {
  if (!components) {
    return 'Loading components…';
  }
  if (components && components.length === 0) {
    return 'No components? 😕';
  }

  return (
    <ul className="o-inline-list o-inline-list--spacing">
      {components.map(component => (
        <li key={component.name}>
          <Chip ellipsis={false}>
            <a
              href={linkToComponent(component.name, appName, env)}
              target="_blank"
              title="Go to component"
            >
              {component.name} <FontAwesomeIcon icon={faLink} />
            </a>
          </Chip>
        </li>
      ))}
    </ul>
  );
};

export default Components;
