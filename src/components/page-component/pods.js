import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Chip from '../chip';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

const Pods = ({ appName, envName, componentName, pods }) => {
  if (!pods) {
    return 'Loading pods…';
  }

  return (
    <ul className="o-inline-list o-inline-list--spacing">
      {pods.map(pod => (
        <li key={pod}>
          <Chip>
            <Link
              to={routeWithParams(routes.appPod, {
                appName,
                envName,
                componentName,
                podName: pod,
              })}
            >
              {pod}
            </Link>
          </Chip>
        </li>
      ))}
    </ul>
  );
};

Pods.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  pods: PropTypes.arrayOf(PropTypes.string).isRequired,
  podsLoaded: PropTypes.bool.isRequired,
};

export default Pods;
