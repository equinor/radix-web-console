import React from 'react';
import { connect } from 'react-redux';
import { isLoading } from '../../state/subscriptions';
import Spinner from '../spinner';

const ResourceLoading = ({ isLoading, loadingState, children }) => {
  if (isLoading) {
    return loadingState || <Spinner>Loading…</Spinner>;
  }

  return children;
};

const mapStateToProps = (state, { resource }) => ({
  isLoading: isLoading(state, resource),
});

export default connect(mapStateToProps)(ResourceLoading);
