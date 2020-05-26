import React from 'react';
import { Link } from 'react-router-dom';

import Chip from '../chip';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

const Components = ({ appName, envName, components }) => {
  if (!components) {
    return 'Loading components…';
  }
  if (components && components.length === 0) {
    return 'No components? 😕';
  }

  return (
    <ul className="o-inline-list o-inline-list--spacing">
      {components.map((component) => (
        <li key={component.name}>
          <Chip>
            <Link
              to={routeWithParams(routes.appComponent, {
                appName,
                envName,
                componentName: component.name,
              })}
            >
              {component.name}
            </Link>
          </Chip>
        </li>
      ))}
    </ul>
  );
};

export default Components;
