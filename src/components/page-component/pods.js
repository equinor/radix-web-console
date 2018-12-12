import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import Chip from '../chip';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';
import Replica from '../../models/replica/model';

const getPodNameAndStatus = pod => {
  if (pod.replicaStatus.status === 'Running') {
    return pod.name;
  }

  return `${pod.name} - ${pod.replicaStatus.status}`;
}

const Pods = ({ appName, envName, componentName, podList }) => {
  if (!podList) {
    return 'Loading replicas…';
  }

  return (
    <ul className="o-inline-list o-inline-list--spacing">
      {podList.map(pod => (
        <li key={pod.name}>
          <Chip>
            <Link
              to={routeWithParams(routes.appPod, {
                appName,
                envName,
                componentName,
                podName: pod.name,
              })}
            >
              {getPodNameAndStatus(pod)}
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
  podList: PropTypes.arrayOf(PropTypes.shape(Replica)).isRequired,
};

export default Pods;
