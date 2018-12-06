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
  render() {
    if (!this.props.component) {
      return 'Loading…';
    }

    const envVars = this.props.component.variables;

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
          <h3 className="o-heading-section o-heading o-heading--first">
            Replicas
          </h3>
          <Pods
            appName={this.props.appName}
            envName={this.props.envName}
            componentName={this.props.componentName}
            pods={this.props.component.replicas}
          />
        </Panel>

        {this.props.component && (
          <Route
            path={routes.appComponent}
            exact
            render={() => (
              <React.Fragment>
                <Panel>
                  <div className="o-layout-columns">
                    <div>
                      <h3 className="o-heading-section o-heading o-heading--first">
                        Ports
                      </h3>
                      <ul className="o-inline-list o-inline-list--spacing">
                        {this.props.component.ports.map(port => (
                          <li key={port.port}>
                            <Chip>{`${port.port} (${port.name})`}</Chip>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {this.props.component && (
                      <div>
                        <h3 className="o-heading-section o-heading o-heading--first">
                          Link
                        </h3>
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
                      </div>
                    )}
                  </div>
                </Panel>
                {this.props.component.secrets && (
                  <Panel>
                    <Toggler summary={makeHeader('Secrets')}>
                      <Secrets
                        appName={this.props.appName}
                        component={this.props.component}
                        envName={this.props.envName}
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
