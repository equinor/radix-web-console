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
import Panel from '../panel';
import Toggler from '../toggler';

import { getComponent } from '../../state/environment';

import { linkToComponent } from '../../utils/string';
import { mapRouteParamsToProps } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

import routes from '../../routes';

const makeHeader = text => (
  <h3 className="o-heading-section o-heading--lean">{text}</h3>
);

class PageComponent extends React.Component {
  componentWillMount() {
  }

  componentWillUnmount() {
  }

  componentDidUpdate() {
  }

  render() {
    const envVars = this.props.component.variables;

    // Assuming that namespace is {app-name}-{env-name}

    const namespace = '???';

    let clusterSecretsStatus, clusterSecretsStatusText;

    if (!this.props.clusterSecretsLoaded) {
      clusterSecretsStatus = 'warning';
      clusterSecretsStatusText = 'Checking…';
    } else if (this.props.clusterSecrets.length === 0) {
      clusterSecretsStatus = 'danger';
      clusterSecretsStatusText = 'Not registered';
    } else {
      const regSecret = this.props.clusterSecrets.find(
        secret => secret && secret.metadata.name === this.props.component.name
      );
      if (
        regSecret &&
        regSecret.data &&
        this.props.component.secrets.every(
          secretName => regSecret.data[secretName]
        )
      ) {
        clusterSecretsStatusText = 'Registered';
      } else {
        clusterSecretsStatus = 'danger';
        clusterSecretsStatusText = 'Not registered';
      }
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
                        rel="noopener noreferrer"
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
      </main>
    );
  }
}

PageComponent.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  component: PropTypes.object,
};

// -----------------------------------------------------------------------------

const mapStateToProps = (state, ownProps) => ({
  component: getComponent(state, ownProps.componentName),
});

export default mapRouteParamsToProps(
  ['appName', 'envName', 'componentName'],
  connect(mapStateToProps)(PageComponent)
);
