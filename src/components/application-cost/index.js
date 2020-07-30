import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Breadcrumb from '../breadcrumb';
import AsyncResource from '../async-resource';
import * as subscriptionActions from '../../state/subscriptions-cost-api/action-creators';

import './style.css';

export class ApplicationCost extends React.Component {
  constructor(props) {
    super(props);
    props.subscribeApplicationCost(props.appName);
  }

  componentWillUnmount() {
    this.props.unsubscribeApplicationCost(this.props.appName);
  }

  componentDidUpdate(prevProps) {
    const { appName } = this.props;

    if (appName !== prevProps.appName) {
      this.props.unsubscribeApplicationCost(prevProps.appName);
      this.props.subscribeApplicationCost(appName);
    }
  }

  render() {
    const { appName } = this.props;

    return (
      <div className="app-overview">
        <Breadcrumb links={[{ label: appName }]} />
        <main>
          <AsyncResource resource="APP_COST" resourceParams={[appName]}>
            <div className="app-overview__info-tiles">
              <span>{appName}</span>
            </div>
          </AsyncResource>
        </main>
      </div>
    );
  }
}

ApplicationCost.propTypes = {
  appName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({});

const mapDispatchToProps = (dispatch, { appName }) => ({
  subscribeApplicationCost: () =>
    dispatch(subscriptionActions.subscribeApplicationCost(appName)),
  unsubscribeApplicationCost: (oldAppName = appName) =>
    dispatch(subscriptionActions.unsubscribeApplicationCost(oldAppName)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ApplicationCost);
