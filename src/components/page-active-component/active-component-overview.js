import { connect } from 'react-redux';
import { faLink } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button';

import Breadcrumb from '../breadcrumb';
import DockerImage from '../docker-image';
import EnvironmentBadge from '../environment-badge';
import ReplicaStatus from '../replica-status';
import SecretStatus from '../secret-status';
import AsyncResource from '../async-resource';
import ActionsPage from '../actions-page';

import { getAppAlias } from '../../state/application';
import { getComponent, getSecret } from '../../state/environment';
import {
  getStartRequestStatus,
  getStartRequestError,
  getStopRequestStatus,
  getStopRequestError,
  getRestartRequestStatus,
  getRestartRequestError,
} from '../../state/component';
import { routeWithParams, smallReplicaName } from '../../utils/string';
import * as routing from '../../utils/routing';
import * as subscriptionActions from '../../state/subscriptions/action-creators';
import componentActions from '../../state/component/action-creators';
import componentModel from '../../models/component';
import routes from '../../routes';
import requestStatuses from '../../state/state-utils/request-states';

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
  constructor() {
    super();

    this.doStartComponent = this.doStartComponent.bind(this);
    this.doStopComponent = this.doStopComponent.bind(this);
    this.doRestartComponent = this.doRestartComponent.bind(this);
  }

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

  doStartComponent(ev) {
    ev.preventDefault();
    this.props.startComponent({
      appName: this.props.appName,
      envName: this.props.envName,
      componentName: this.props.componentName,
    });
  }

  doStopComponent(ev) {
    ev.preventDefault();
    this.props.stopComponent({
      appName: this.props.appName,
      envName: this.props.envName,
      componentName: this.props.componentName,
    });
  }

  doRestartComponent(ev) {
    ev.preventDefault();
    this.props.restartComponent({
      appName: this.props.appName,
      envName: this.props.envName,
      componentName: this.props.componentName,
    });
  }

  render() {
    const {
      appAlias,
      appName,
      envName,
      componentName,
      component,
      getEnvSecret,
      startRequestStatus,
      startRequestMessage,
      stopRequestStatus,
      stopRequestMessage,
      restartRequestStatus,
      restartRequestMessage,
    } = this.props;

    const envVarNames = component && Object.keys(component.variables);

    const isDefaultAlias =
      appAlias &&
      appAlias.componentName === componentName &&
      appAlias.environmentName === envName;

    const isStartEnabled =
      component &&
      component.status === 'Stopped' &&
      startRequestStatus !== requestStatuses.IN_PROGRESS;

    const isStopEnabled =
      component &&
      component.status === 'Consistent' &&
      stopRequestStatus !== requestStatuses.IN_PROGRESS;

    const isRestartEnabled =
      component &&
      component.status === 'Consistent' &&
      restartRequestStatus !== requestStatuses.IN_PROGRESS;

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
                <ActionsPage>
                  <Button
                    onClick={this.doStartComponent}
                    disabled={!isStartEnabled}
                  >
                    Start
                  </Button>
                  {startRequestMessage && <div>{startRequestMessage}</div>}
                  <Button
                    onClick={this.doStopComponent}
                    disabled={!isStopEnabled}
                  >
                    Stop
                  </Button>
                  {stopRequestMessage && <div>{stopRequestMessage}</div>}
                  <Button
                    onClick={this.doRestartComponent}
                    disabled={!isRestartEnabled}
                  >
                    Restart
                  </Button>
                  {restartRequestMessage && <div>{restartRequestMessage}</div>}
                </ActionsPage>
                <div className="o-layout-columns">
                  <section>
                    <h2 className="o-heading-section">Overview</h2>
                    <p>
                      Component <strong>{component.name}</strong>
                    </p>
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
  componentStatus: PropTypes.string,
  getEnvSecret: PropTypes.func.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  startComponent: PropTypes.func.isRequired,
  stopComponent: PropTypes.func.isRequired,
  restartComponent: PropTypes.func.isRequired,
  startRequestStatus: PropTypes.oneOf(Object.values(requestStatuses)),
  startRequestMessage: PropTypes.string,
  stopRequestStatus: PropTypes.oneOf(Object.values(requestStatuses)),
  stopRequestMessage: PropTypes.string,
  restartRequestStatus: PropTypes.oneOf(Object.values(requestStatuses)),
  restartRequestMessage: PropTypes.string,
};

const mapStateToProps = (state, { componentName }) => ({
  appAlias: getAppAlias(state),
  component: getComponent(state, componentName),
  getEnvSecret: secretName => getSecret(state, componentName, secretName),
  startRequestStatus: getStartRequestStatus(state),
  startRequestMessage: getStartRequestError(state),
  stopRequestStatus: getStopRequestStatus(state),
  stopRequestMessage: getStopRequestError(state),
  restartRequestStatus: getRestartRequestStatus(state),
  restartRequestMessage: getRestartRequestError(state),
});

const mapDispatchToProps = dispatch => ({
  startComponent: component =>
    dispatch(componentActions.startComponentRequest(component)),
  stopComponent: component =>
    dispatch(componentActions.stopComponentRequest(component)),
  restartComponent: component =>
    dispatch(componentActions.restartComponentRequest(component)),
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
