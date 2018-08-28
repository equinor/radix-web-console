import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import Chip from '../chip';
import { getConnectionStatus } from '../../state/streaming';
import { getPods } from '../../state/pods';
import streamingStatus from '../../state/streaming/connection-status';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

const Pods = ({ appName, envName, componentName, pods, podsLoaded }) => {
  if (!podsLoaded) {
    return 'Loading pods…';
  }

  // This little abomination is here because we are not labelling pods with the
  // environment name. So we just assume the namespace suffix is always the env
  // name

  const filteredPods = pods.filter(
    pod => pod.metadata.namespace.slice(-envName.length) === envName
  );

  if (podsLoaded && filteredPods.length === 0) {
    return 'No pods? 😕';
  }

  return (
    <ul className="o-inline-list o-inline-list--spacing">
      {filteredPods.map(pod => (
        <li key={pod.metadata.name}>
          <Chip>
            <Link
              to={routeWithParams(routes.appPod, {
                appName,
                envName,
                componentName,
                podName: pod.metadata.name,
              })}
            >
              {pod.metadata.name}
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
  pods: PropTypes.arrayOf(PropTypes.object).isRequired,
  podsLoaded: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  pods: getPods(state),
  podsLoaded: getConnectionStatus(state, 'pods') === streamingStatus.CONNECTED,
});

export default connect(mapStateToProps)(Pods);
