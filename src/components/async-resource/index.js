import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getError, isLoading } from '../../state/subscriptions';
import Alert from '../alert';
import Spinner from '../spinner';

const AsyncResource = ({ isLoading, error, loading, failed, children }) => {
  if (isLoading) {
    return loading || <Spinner>Loading…</Spinner>;
  }

  if (error) {
    return failed || <Alert type="danger">{error}</Alert>;
  }

  return children;
};

AsyncResource.propTypes = {
  children: PropTypes.node,
  error: PropTypes.string,
  failed: PropTypes.node,
  isLoading: PropTypes.bool.isRequired,
  loading: PropTypes.node,
};

const mapStateToProps = (state, { resource, resourceParams }) => ({
  error: getError(state, resource, resourceParams),
  isLoading: isLoading(state, resource, resourceParams),
});

export default connect(mapStateToProps)(AsyncResource);
