import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import DocumentTitle from '../document-title';
import EnvironmentsSummary from '../environments-summary';
import AsyncResource from '../async-resource';

import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';
import { getEnvironmentSummaries } from '../../state/application';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import environmentSummaryModel from '../../models/environment-summary';
import routes from '../../routes';

class PageEnvironments extends React.Component {
  constructor(props) {
    super(props);
    props.subscribeApplication(props.appName);
  }

  componentWillUnmount() {
    this.props.unsubscribeApplication(this.props.appName);
  }

  componentDidUpdate(prevProps) {
    const { appName } = this.props;

    if (appName !== prevProps.appName) {
      this.props.unsubscribeApplication(prevProps.appName);
      this.props.subscribeApplication(appName);
    }
  }

  render() {
    const { appName, envs } = this.props;
    return (
      <React.Fragment>
        <DocumentTitle title={`${appName} environments`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Environments' },
          ]}
        />
        <main>
          <AsyncResource resource="APP" resourceParams={[appName]}>
            <EnvironmentsSummary appName={appName} envs={envs} />
          </AsyncResource>
        </main>
      </React.Fragment>
    );
  }
}

PageEnvironments.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(PropTypes.shape(environmentSummaryModel)).isRequired,
};

const mapStateToProps = state => ({
  envs: getEnvironmentSummaries(state),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  subscribeApplication: () =>
    dispatch(subscriptionActions.subscribeApplication(appName)),
  unsubscribeApplication: (oldAppName = appName) =>
    dispatch(subscriptionActions.unsubscribeApplication(oldAppName)),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(PageEnvironments)
);
