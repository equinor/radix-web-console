import React from 'react';
import { connect } from 'react-redux';
import { subscriptionsRefreshRequest } from '../../state/subscription-refresh/action-creators';
import Button from '../button';
import { isRefreshing } from '../../state/subscription-refresh';

const streamingLabelRender = isRefreshing => {
  return isRefreshing ? 'Refreshing...' : 'Refresh';
};

export const StreamRefresh = ({ isRefreshing, subscriptionsRefresh }) => (
  <Button
    btnType={['default', 'tiny']}
    onClick={() => subscriptionsRefresh()}
    title="Trigger a refresh of all subscribed streams"
    disabled={isRefreshing}
  >
    {streamingLabelRender(isRefreshing)}
  </Button>
);

const mapDispatchToProps = dispatch => ({
  subscriptionsRefresh: () => dispatch(subscriptionsRefreshRequest()),
});

const mapStateToProps = state => ({
  isRefreshing: isRefreshing(state),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StreamRefresh);
