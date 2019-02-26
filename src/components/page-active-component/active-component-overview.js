import { connect } from 'react-redux';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import DockerImage from '../docker-image';
import EnvironmentBadge from '../environment-badge';
import ReplicaStatus from '../replica-status';
import SecretStatus from '../secret-status';
import ResourceLoading from '../resource-loading';

import { routeWithParams, smallReplicaName } from '../../utils/string';
import { getComponent, getSecret } from '../../state/environment';
import * as routing from '../../utils/routing';
import * as actionCreators from '../../state/subscriptions/action-creators';
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
      appName,
      envName,
      componentName,
      component,
      getEnvSecret,
    } = this.props;

    const envVarNames = component && Object.keys(component.variables);

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
          <ResourceLoading
            resource="ENVIRONMENT"
            resourceParams={[appName, envName]}
          >
            {component && (
              <React.Fragment>
                <div className="o-layout-columns">
                  <section>
                    <h2 className="o-heading-section">Overview</h2>
                    <p>
                      Component <strong>{component.name}</strong>
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
          </ResourceLoading>
        </main>
      </React.Fragment>
    );
  }
}

ActiveComponentOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  component: PropTypes.shape(componentModel),
  getEnvSecret: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { componentName }) => ({
  component: getComponent(state, componentName),
  getEnvSecret: secretName => getSecret(state, componentName, secretName),
});

const mapDispatchToProps = dispatch => ({
  subscribe: (appName, envName) => {
    dispatch(actionCreators.subscribeEnvironment(appName, envName));
  },
  unsubscribe: (appName, envName) => {
    dispatch(actionCreators.unsubscribeEnvironment(appName, envName));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ActiveComponentOverview);
