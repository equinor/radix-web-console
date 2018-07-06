import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getConnectionStatus } from '../../state/streaming';
import { getPods } from '../../state/pods';
import streamingStatus from '../../state/streaming/connection-status';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

const Pods = ({ app, pods, podsLoaded }) => (
  <section>
    {!podsLoaded && 'Loading pods…'}
    {podsLoaded && (
      <ul>
        {pods.map(pod => (
          <li key={pod.metadata.name}>
            <Link
              to={routeWithParams(routes.appPod, {
                id: app.metadata.name,
                pod: pod.metadata.name,
              })}
            >
              {pod.metadata.name}
            </Link>
          </li>
        ))}
      </ul>
    )}
  </section>
);

const mapStateToProps = state => ({
  pods: getPods(state),
  podsLoaded: getConnectionStatus(state, 'pods') === streamingStatus.CONNECTED,
});

export default connect(mapStateToProps)(Pods);
