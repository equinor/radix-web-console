import React from 'react';
import { connect } from 'react-redux';
import { subscriptionsRefresh } from '../../state/subscriptions/action-creators';
import Button from '../button';

import './style.css';

const streamingLabelRender = isRefreshing => {
  return isRefreshing ? 'Refreshing...' : 'Refresh';
};

export const StreamRefresh = ({ status, subscriptionsRefresh }) => (
  <div className="o-layout-container stream-refresh">
    <Button
      btnType="tiny"
      onClick={() => subscriptionsRefresh()}
      title="Trigger a refresh of all subscribed streams"
      disabled={status.isRefreshing}
    >
      {streamingLabelRender(status.isRefreshing)}
    </Button>
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
