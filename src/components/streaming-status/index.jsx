import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import streamingStatuses from '../../state/streaming/connection-status';

import './style.css';

const getClassName = status =>
  status === streamingStatuses.CONNECTED
    ? 'streaming-status__connected'
    : status === streamingStatuses.CONNECTING
      ? 'streaming-status__connecting'
      : 'streaming-status__disconnected';

export const StreamingStatus = ({ streams }) => (
  <ul className="streaming-status">
    {streams.map(stream => (
      <li
        key={stream.name}
        className={getClassName(stream.status)}
        title={stream.name}
      />
    ))}
  </ul>
);

StreamingStatus.propTypes = {
  streams: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      status: PropTypes.oneOf(Object.values(streamingStatuses)).isRequired,
    })
  ).isRequired,
};

const mapStateToProps = state => ({
  streams: Object.keys(state.streaming).map(key => ({
    name: key,
    status: state.streaming[key],
  })),
});

export default connect(mapStateToProps)(StreamingStatus);
