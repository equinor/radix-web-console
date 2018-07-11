import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { getConnectionStatus } from '../../state/streaming';
import { getPods } from '../../state/pods';
import streamingStatus from '../../state/streaming/connection-status';

import { routeWithParams } from '../../utils/string';
import routes from '../../routes';

const Pods = ({ app, pods, podsLoaded, environmentName }) => (
  <section className="page-application-list">
    {!podsLoaded && 'Loading pods…'}
    {podsLoaded && (
      <ul>
        {/* TODO: Remove the filtering when api is working */}
        {pods
          .filter(pod =>
            pod.metadata.namespace.includes(
              app.metadata.name + '-' + environmentName
            )
          )
          .map(pod => (
            <li key={pod.metadata.name}>
              <Link
                className="page-application-list-element"
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
    {pods.filter(pod =>
      pod.metadata.namespace.includes(app.metadata.name + '-' + environmentName)
    ).length === 0 && 'No pods found'}
  </section>
);

const mapStateToProps = state => ({
  pods: getPods(state),
  podsLoaded: getConnectionStatus(state, 'pods') === streamingStatus.CONNECTED,
});

export default connect(mapStateToProps)(Pods);
