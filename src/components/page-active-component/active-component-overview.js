import { connect } from 'react-redux';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Alert from '../alert';

import Breadcrumb from '../breadcrumb';
import DockerImage from '../docker-image';
import EnvironmentBadge from '../environment-badge';
import ReplicaStatus from '../replica-status';
import SecretStatus from '../secret-status';
import AsyncResource from '../async-resource';
import Toolbar from './toolbar';

import { getAppAlias } from '../../state/application';
import { getComponent, getSecret } from '../../state/environment';
import { routeWithParams, smallReplicaName } from '../../utils/string';
import * as routing from '../../utils/routing';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import componentModel from '../../models/component';
import routes from '../../routes';

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME';

const Vars = ({ envVarNames, component }) => {
  let hasRadixVars = false;

  const varList = envVarNames.map(varName => {
    const isRadixVar = varName.slice(0, 6) === 'RADIX_';
    hasRadixVars = hasRadixVars || isRadixVar;

    if (isRadixVar) {
      return (
        <React.Fragment key={varName}>
          <dt>
            * <em>{varName}</em>
          </dt>
          <dd>
            <em>{component.variables[varName]}</em>
          </dd>
        </React.Fragment>
      );
    }

    return (
      <React.Fragment key={varName}>
        <dt>{varName}</dt>
        <dd>{component.variables[varName]}</dd>
      </React.Fragment>
    );
  });

  return (
    <div>
      <dl className="o-key-values">{varList}</dl>
      {hasRadixVars && (
        <p>
          <small>* automatically added by Radix</small>
        </p>
      )}
    </div>
  );
};

export class ActiveComponentOverview extends React.Component {
  componentDidMount() {
    this.props.subscribe(this.props.appName, this.props.envName);
  }

  componentDidUpdate(prevProps) {
    const { appName, envName } = this.props;

    if (appName !== prevProps.appName || envName !== prevProps.envName) {
      this.props.unsubscribe(prevProps.appName, prevProps.envName);
      this.props.subscribe(appName, envName);
    }
  }

  componentWillUnmount() {
    this.props.unsubscribe(this.props.appName, this.props.envName);
  }

  render() {
    const {
      appAlias,
      appName,
      envName,
      componentName,
      component,
      getEnvSecret,
    } = this.props;

    const envVarNames = component && Object.keys(component.variables);

    const isDefaultAlias =
      appAlias &&
      appAlias.componentName === componentName &&
      appAlias.environmentName === envName;

    return (
      <React.Fragment>
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Environments', to: routing.getEnvsUrl(appName) },
            {
              label: <EnvironmentBadge envName={envName} />,
              to: routeWithParams(routes.appEnvironment, {
                appName,
                envName,
              }),
            },
            { label: componentName },
          ]}
        />
        <main>
          <AsyncResource
            resource="ENVIRONMENT"
            resourceParams={[appName, envName]}
          >
            {component && (
              <React.Fragment>
                <Toolbar
                  appName={appName}
                  envName={envName}
                  component={component}
                />
                <div className="o-layout-columns">
                  <section>
                    <h2 className="o-heading-section">Overview</h2>
                    <p>
                      Component <strong>{component.name}</strong>
                    </p>
                    {component.status === 'Stopped' && (
                      <Alert>
                        Component has been manually stopped; please note that a
                        new deployment will cause it to be restarted unless you
                        set <code>replicas</code> of the component to{' '}
                        <code>0</code> in{' '}
                        <a href="https://www.radix.equinor.com/docs/reference-radix-config/#replicas">
                          radixconfig.yaml
                        </a>
                      </Alert>
                    )}
                    <p>
                      Status <strong>{component.status}</strong>
                    </p>
                    {component.variables[URL_VAR_NAME] && (
                      <p>
                        Publically available{' '}
                        <a
                          href={`https://${component.variables[URL_VAR_NAME]}`}
                        >
                          link <FontAwesomeIcon icon={faLink} size="lg" />
                        </a>
                      </p>
                    )}
                    {isDefaultAlias && (
                      <React.Fragment>
                        This component is the application{' '}
                        <a href={`https://${appAlias.url}`}>
                          default alias{' '}
                          <FontAwesomeIcon icon={faLink} size="lg" />
                        </a>
                      </React.Fragment>
                    )}
                    <p>
                      Image <DockerImage path={component.image} />
                    </p>
                    {component.ports.length > 0 && (
                      <React.Fragment>
                        <p>Open ports:</p>
                        <ul className="o-indent-list">
                          {component.ports.map(port => (
                            <li key={port.port}>
                              {port.port} ({port.name})
                            </li>
                          ))}
                        </ul>
                      </React.Fragment>
                    )}
                    {component.ports.length === 0 && <p>No open ports</p>}
                    <h2 className="o-heading-section">Environment variables</h2>
                    {envVarNames.length === 0 && (
                      <p>This component uses no environment variables</p>
                    )}
                    {envVarNames.length > 0 && (
                      <Vars component={component} envVarNames={envVarNames} />
                    )}
                  </section>
                  <section>
                    {component.horizontalScalingSummary && (
                      <React.Fragment>
                        <h2 className="o-heading-section">
                          Horizontal scaling
                        </h2>
                        <dl className="o-key-values">
                          <dt>Min replicas:</dt>
                          <dd>
                            {component.horizontalScalingSummary.minReplicas}
                          </dd>
                          <dt>Max replicas:</dt>
                          <dd>
                            {component.horizontalScalingSummary.maxReplicas}
                          </dd>
                          <dt>Current average CPU utilization:</dt>
                          <dd>
                            {
                              component.horizontalScalingSummary
                                .currentCPUUtilizationPercentage
                            }
                            %
                          </dd>
                          <dt>Target average CPU utilization:</dt>
                          <dd>
                            {
                              component.horizontalScalingSummary
                                .targetCPUUtilizationPercentage
                            }
                            %
                          </dd>
                        </dl>
                      </React.Fragment>
                    )}
                    <h2 className="o-heading-section">Replicas</h2>
                    {component.replicaList.map(replica => (
                      <p key={replica.name}>
                        <Link
                          to={routing.getReplicaUrl(
                            appName,
                            envName,
                            componentName,
                            replica.name
                          )}
                        >
                          {smallReplicaName(replica.name)}{' '}
                        </Link>
                        <ReplicaStatus replica={replica} />
                      </p>
                    ))}
                    <h2 className="o-heading-section">Secrets</h2>
                    {component.secrets.length === 0 && (
                      <p>This component uses no secrets</p>
                    )}
                    {component.secrets.length > 0 && (
                      <ul className="o-indent-list">
                        {component.secrets.map(secretName => (
                          <li key={secretName}>
                            <Link
                              to={routing.getSecretUrl(
                                appName,
                                envName,
                                componentName,
                                secretName
                              )}
                            >
                              {secretName}
                            </Link>{' '}
                            <SecretStatus secret={getEnvSecret(secretName)} />
                          </li>
                        ))}
                      </ul>
                    )}
                  </section>
                </div>
              </React.Fragment>
            )}
          </AsyncResource>
        </main>
      </React.Fragment>
    );
  }
}

ActiveComponentOverview.propTypes = {
  appAlias: PropTypes.exact({
    componentName: PropTypes.string.isRequired,
    environmentName: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }),
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  component: PropTypes.shape(componentModel),
  getEnvSecret: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { componentName }) => ({
  appAlias: getAppAlias(state),
  component: getComponent(state, componentName),
  getEnvSecret: secretName => getSecret(state, componentName, secretName),
});

const mapDispatchToProps = dispatch => ({
  subscribe: (appName, envName) => {
    dispatch(subscriptionActions.subscribeEnvironment(appName, envName));
    dispatch(subscriptionActions.subscribeApplication(appName));
  },
  unsubscribe: (appName, envName) => {
    dispatch(subscriptionActions.unsubscribeEnvironment(appName, envName));
    dispatch(subscriptionActions.unsubscribeApplication(appName));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveComponentOverview);
