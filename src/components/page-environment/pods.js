import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import Chip from '../chip';
import { getConnectionStatus } from '../../state/streaming';
import { getPods } from '../../state/pods';
import streamingStatus from '../../state/streaming/connection-status';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

const Pods = ({ app, env, pods, podsLoaded }) => {
  if (!podsLoaded) {
    return 'Loading pods…';
  }

  // This little abomination is here because we are not labelling pods with the
  // environment name. So we just assume the namespace suffix is always the env
  // name

  const filteredPods = pods.filter(
    pod => pod.metadata.namespace.slice(-env.length) === env
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
              to={routeWithParams(routes.appEnvPod, {
                id: app.metadata.name,
                env: env,
                pod: pod.metadata.name,
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

const mapStateToProps = state => ({
  pods: getPods(state),
  podsLoaded: getConnectionStatus(state, 'pods') === streamingStatus.CONNECTED,
});

export default connect(mapStateToProps)(Pods);
