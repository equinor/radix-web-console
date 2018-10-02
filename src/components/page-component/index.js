import React from 'react';
import { connect } from 'react-redux';
import { Route } from 'react-router';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';

import Pods from './pods';
import Secrets from './secrets';
import DocumentTitle from '../document-title';
import Chip from '../chip';
import PagePod from '../page-pod';
import PageSecret from '../page-secret';
import Panel from '../panel';
import Toggler from '../toggler';

import { getConnectionStatus } from '../../state/streaming';
import streamingStatus from '../../state/streaming/connection-status';
import { getApplication, getAppComponents } from '../../state/applications';
import { getSecrets } from '../../state/secrets';

import { linkToComponent } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

import {
  requestConnection,
  disconnect,
} from '../../state/streaming/action-creators';
import routes from '../../routes';

const makeHeader = text => (
  <h3 className="o-heading-section o-heading--lean">{text}</h3>
);

class PageComponent extends React.Component {
  componentWillMount() {
    this.props.startStreaming();
  }

  componentWillUnmount() {
    this.props.stopStreaming();
  }

  render() {
    if (!this.props.appsLoaded) {
      return (
        <div className="o-layout-page-head">
          <div className="o-layout-fullwidth">Loading…</div>
        </div>
      );
    }

    if (!this.props.app) {
      return (
        <main className="o-layout-page-head">
          <div className="o-layout-fullwidth">App not found</div>
        </main>
      );
    }

    const envVars =
      this.props.component &&
      this.props.component.environmentVariables &&
      this.props.component.environmentVariables.find(
        envVar => envVar.environment === this.props.envName
      ).variables;

    // Assuming that namespace is {app-name}-{env-name}

    const namespace = this.props.app.metadata.namespace.replace(
      /app$/,
      this.props.envName
    );

    let clusterSecretsStatus, clusterSecretsStatusText;

    if (!this.props.clusterSecretsLoaded) {
      clusterSecretsStatus = 'warning';
      clusterSecretsStatusText = 'Checking…';
    } else if (this.props.clusterSecrets.length === 0) {
      clusterSecretsStatus = 'danger';
      clusterSecretsStatusText = 'Not registered';
    } else {
      clusterSecretsStatusText = 'Registered';
    }

    return (
      <main>
        <DocumentTitle title={`${this.props.componentName} (component)`} />
        <h3 className="o-heading-page">
          <Link
            to={routeWithParams(routes.appComponent, {
              appName: this.props.appName,
              envName: this.props.envName,
              componentName: this.props.componentName,
            })}
          >
            Component: {this.props.componentName}
          </Link>
        </h3>
        <Panel>
          <div className="o-layout-columns">
            <div>
              <h3 className="o-heading-section o-heading o-heading--first">
                Pods
              </h3>
              <Pods
                appName={this.props.appName}
                envName={this.props.envName}
                componentName={this.props.componentName}
              />
            </div>
            <div>
              <h3 className="o-heading-section o-heading o-heading--first">
                Misc
              </h3>
              <dl className="o-key-values">
                {this.props.component &&
                  this.props.component.secrets && (
                    <div className="o-key-values__group">
                      <dt>Required secrets</dt>
                      <dd>
                        <Chip type={clusterSecretsStatus}>
                          {clusterSecretsStatusText}
                        </Chip>
                      </dd>
                    </div>
                  )}
                {this.props.component && this.props.component.public ? (
                  <div className="o-key-values__group">
                    <dt>Link</dt>
                    <dd>
                      <a
                        href={linkToComponent(
                          this.props.componentName,
                          this.props.appName,
                          this.props.envName
                        )}
                        target="_blank"
                        title="Go to component"
                      >
                        Open <FontAwesomeIcon icon={faLink} />
                      </a>
                    </dd>
                  </div>
                ) : null}
              </dl>
            </div>
          </div>
        </Panel>

        {this.props.component && (
          <Route
            path={routes.appComponent}
            exact
            render={() => (
              <React.Fragment>
                {this.props.component.secrets && (
                  <Panel>
                    <Toggler summary={makeHeader('Secrets')}>
                      <Secrets
                        namespace={namespace}
                        component={this.props.component}
                      />
                    </Toggler>
                  </Panel>
                )}
                {envVars && (
                  <Panel>
                    <Toggler summary={makeHeader('Environment variables')}>
                      <dl className="o-key-values">
                        {Object.keys(envVars).map(varName => (
                          <div className="o-key-values__group" key={varName}>
                            <dt>{varName}</dt>
                            <dd>{envVars[varName]}</dd>
                          </div>
                        ))}
                      </dl>
                    </Toggler>
                  </Panel>
                )}
              </React.Fragment>
            )}
          />
        )}

        <Route path={routes.appPod} component={PagePod} />
        <Route path={routes.appEnvSecret} component={PageSecret} />
      </main>
    );
  }
}

PageComponent.propTypes = {
  app: PropTypes.object,
  appName: PropTypes.string.isRequired,
  appsLoaded: PropTypes.bool.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  component: PropTypes.object,
  clusterSecrets: PropTypes.arrayOf(PropTypes.object).isRequired,
  clusterSecretsLoaded: PropTypes.bool.isRequired,
};

// -----------------------------------------------------------------------------

const mapStateToProps = (state, ownProps) => ({
  app: getApplication(state, ownProps.appName),
  appsLoaded: getConnectionStatus(state, 'apps') === streamingStatus.CONNECTED,
  component: getAppComponents(state, ownProps.appName).find(
    comp => comp.name === ownProps.componentName
  ),
  podsLoaded: getConnectionStatus(state, 'pods') === streamingStatus.CONNECTED,
  clusterSecrets: getSecrets(state),
  clusterSecretsLoaded:
    getConnectionStatus(state, 'secrets') === streamingStatus.CONNECTED,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  startStreaming: () => {
    dispatch(
      requestConnection('pods', {
        appName: ownProps.appName,
        componentName: ownProps.componentName,
      })
    );
    dispatch(
      requestConnection('secrets', {
        appName: ownProps.appName,
        componentName: ownProps.componentName,
        envName: ownProps.envName,
      })
    );
  },
  stopStreaming: () => {
    dispatch(disconnect('pods'));
    dispatch(disconnect('secrets'));
  },
});

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName'],
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(PageComponent)
);
