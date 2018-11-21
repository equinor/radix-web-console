import React from 'react';
import { connect } from 'react-redux';
import { subscriptionsRefresh } from '../../state/subscriptions/action-creators';
import Spinner from '../spinner';

import './style.css';

const streamingLabelRender = isRefreshing => {
  if (isRefreshing) {
    return <Spinner>Refreshing...</Spinner>;
  }

  return 'Refresh';
}

export const StreamRefresh = ({ status, subscriptionsRefresh }) => (
  <div className="o-layout-container stream-refresh">
    <button
      onClick={() => subscriptionsRefresh()}
      title="Trigger a refresh of all subscribed streams"
      disabled={status.isRefreshing}
    >
      {streamingLabelRender(status.isRefreshing)}
    </button>
  </div>
);

const mapDispatchToProps = dispatch => ({
  subscriptionsRefresh: () => dispatch(subscriptionsRefresh()),
});

const mapStateToProps = state => ({
  status: state.subscriptions.status,
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamRefresh);
