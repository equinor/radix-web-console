import { connect } from 'react-redux';
import React from 'react';
import PropTypes from 'prop-types';
import format from 'date-fns/format';

import { getDeployments } from '../../state/deployments';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import deploymentSummaryModel from '../../models/deployment-summary';

const getDeploymentDate = date =>
  date ? format(new Date(date), 'YYYY-MM-DD HH:mm') : 'Current';

export class Deployments extends React.Component {
  componentDidMount() {
    const { subscribeDeployments, appName, envName } = this.props;

    if (subscribeDeployments && appName && envName) {
      subscribeDeployments(appName, envName);
    }
  }

  componentWillUnmount() {
    const { unsubscribeDeployments, appName, envName } = this.props;

    if (unsubscribeDeployments && appName && envName) {
      unsubscribeDeployments(appName, envName);
    }
  }

  componentDidUpdate(prevProps) {
    const { envName } = this.props;

    // check if we have new env name, then we need to unsub and sub to new env.
    if (prevProps.envName && prevProps.envName !== envName) {
      const {
        subscribeDeployments,
        unsubscribeDeployments,
        appName,
      } = this.props;

      unsubscribeDeployments(appName, prevProps.envName);
      subscribeDeployments(appName, envName);
    }
  }

  render() {
    const { deployments } = this.props;

    if (!deployments) {
      return 'Loading deployments…';
    }

    if (deployments && deployments.length === 0) {
      return 'No deployments yet 😕';
    }

    const deploymentsRender = deployments.slice(0, 5).map(d => (
      <tr key={d.name}>
        <td>{d.name}</td>
        <td title={d.activeFrom}>{getDeploymentDate(d.activeFrom)}</td>
        <td title={d.activeTo}>{getDeploymentDate(d.activeTo)}</td>
      </tr>
    ));

    return (
      <table className="o-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Active From</th>
            <th>Active To</th>
          </tr>
        </thead>
        <tbody>{deploymentsRender}</tbody>
      </table>
    );
  }
}

Deployments.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  deployments: PropTypes.arrayOf(PropTypes.shape(deploymentSummaryModel)),
};

const mapDispatchToProps = (dispatch, { appName, envName }) => ({
  subscribeDeployments: () =>
    dispatch(subscriptionActions.subscribeDeployments(appName, envName)),
  unsubscribeDeployments: () =>
    dispatch(subscriptionActions.unsubscribeDeployments(appName, envName)),
});

const mapStateToProps = state => ({
  deployments: getDeployments(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(Deployments);
