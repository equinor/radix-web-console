import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import DocumentTitle from '../document-title';
import EnvironmentsSummary from '../environments-summary';
import environmentSummaryModel from '../../models/environment-summary';
import { routes } from '../../routes';
import { getEnvironmentSummaries } from '../../state/application';
import {
  subscribeApplication,
  unsubscribeApplication,
} from '../../state/subscriptions/action-creators';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

class PageEnvironments extends Component {
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
      <>
        <DocumentTitle title={`${appName} environments`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Environments' },
          ]}
        />
        <AsyncResource resource="APP" resourceParams={[appName]}>
          <EnvironmentsSummary appName={appName} envs={envs} />
        </AsyncResource>
      </>
    );
  }
}

PageEnvironments.propTypes = {
  appName: PropTypes.string.isRequired,
  envs: PropTypes.arrayOf(PropTypes.shape(environmentSummaryModel)).isRequired,
};

const mapStateToProps = (state) => ({
  envs: getEnvironmentSummaries(state),
});

const mapDispatchToProps = (dispatch, { appName }) => ({
  subscribeApplication: () => dispatch(subscribeApplication(appName)),
  unsubscribeApplication: (oldAppName = appName) =>
    dispatch(unsubscribeApplication(oldAppName)),
});

export default mapRouteParamsToProps(
  ['appName'],
  connect(mapStateToProps, mapDispatchToProps)(PageEnvironments)
);
