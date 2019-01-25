import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { faCog, faTruck } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Breadcrumb from '../breadcrumb';
import Components from './components';
import DocumentTitle from '../document-title';
import LinkButton from '../link-button';
import PageComponent from '../page-component';
import Panel from '../panel';

import * as envState from '../../state/environment';
import * as subscriptionActions from '../../state/subscriptions/action-creators';

import { Component } from 'radix-web-console-models';

import { routeWithParams } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import routes from '../../routes';

const buildAndDeployIcon = (
  <span className="link-btn--icon-compose--layers fa-layers fa-fw">
    <FontAwesomeIcon icon={faCog} />
    <FontAwesomeIcon icon={faTruck} transform="shrink-10 down-5 right-13" />
  </span>
);

class PageEnvironment extends React.Component {
  componentDidMount() {
    const { subscribeEnvironment, appName, envName } = this.props;
    subscribeEnvironment(appName, envName);
  }

  componentWillUnmount() {
    const { unsubscribeEnvironment, appName, envName } = this.props;
    unsubscribeEnvironment(appName, envName);
  }

  componentDidUpdate(prevProps) {
    const {
      subscribeEnvironment,
      unsubscribeEnvironment,
      appName,
      envName,
    } = this.props;

    if (prevProps.envName !== envName || prevProps.appName !== appName) {
      unsubscribeEnvironment(appName, prevProps.envName);
      subscribeEnvironment(appName, envName);
    }
  }

  render() {
    const { appName, components, envName } = this.props;
    return (
      <React.Fragment>
        <DocumentTitle title={`${envName} (env)`} />
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Environments' },
            { label: envName },
          ]}
        />
        <main>
          <h3 className="o-heading-page">
            <Link
              to={routeWithParams(routes.appEnvironment, { appName, envName })}
            >
              Environment: {envName}
            </Link>
          </h3>
          <Panel>
            <nav className="o-toolbar o-toolbar--buttons">
              {this.renderBuildAndDeploy}
            </nav>
            <div className="o-layout-columns">
              <div>
                <h3 className="o-heading-section o-heading--first">
                  Components
                </h3>
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
      </React.Fragment>
    );
  }

  renderBuildAndDeploy() {
    const { appName, branchName } = this.props;

    if (!branchName) {
      return 'No branch mapping found.';
    }

    return (
      <LinkButton
        to={routeWithParams(
          routes.appJobNew,
          { appName },
          { branch: branchName }
        )}
        linkBtnType={['icon-compose']}
      >
        {buildAndDeployIcon} Build and deploy...
      </LinkButton>
    );
  }
}

PageEnvironment.propTypes = {
  appName: PropTypes.string.isRequired,
  branchName: PropTypes.string,
  components: PropTypes.arrayOf(PropTypes.shape(Component)),
  envName: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  components: envState.getComponents(state),
  branchName: envState.getBranchName(state),
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
