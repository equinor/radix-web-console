import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import Components from './components';
import DocumentTitle from '../document-title';
import PageComponent from '../page-component';
import Panel from '../panel';

import * as envState from '../../state/environment';
import * as subscriptionActions from '../../state/subscriptions/action-creators';

import ComponentModel from '../../models/component/model';

import { routeWithParams } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

class PageEnvironment extends React.Component {
  componentDidMount() {
    const { subscribeEnvironment, appName, envName } = this.props;
    subscribeEnvironment(appName, envName);
  }

  componentWillUnmount() {
    const { unsubscribeEnvironment, appName, envName } = this.props;
    unsubscribeEnvironment(appName, envName);
  }
  render() {
    const { appName, envName, components } = this.props;
    return (
      <main>
        <DocumentTitle title={`${envName} (env)`} />
        <h3 className="o-heading-page">
          <Link
            to={routeWithParams(routes.appEnvironment, { appName, envName })}
          >
            Environment: {envName}
          </Link>
        </h3>
        <Panel>
          <div className="o-layout-columns">
            <div>
              <h3 className="o-heading-section o-heading--first">Components</h3>
              <Components
                appName={appName}
                envName={envName}
                components={components}
              />
            </div>
          </div>
        </Panel>
        <Route path={routes.appComponent} component={PageComponent} />
      </main>
    );
  }
}

PageEnvironment.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  components: PropTypes.arrayOf(PropTypes.shape(ComponentModel)),
};

const mapStateToProps = state => ({
  components: envState.getComponents(state),
});

const mapDispatchToProps = dispatch => ({
  subscribeEnvironment: (appName, envName) =>
    dispatch(subscriptionActions.subscribeEnvironment(appName, envName)),
  unsubscribeEnvironment: (appName, envName) =>
    dispatch(subscriptionActions.unsubscribeEnvironment(appName, envName)),
});

export default mapRouteParamsToProps(
  ['appName', 'envName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageEnvironment)
);
