import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import Breadcrumb from '../breadcrumb';
import EnvironmentBadge from '../environment-badge';
import SecretForm from '../secret-form';
import AsyncResource from '../async-resource';

import { getSaveState, getSaveError } from '../../state/secrets';
import { getSecret } from '../../state/environment';
import { routeWithParams } from '../../utils/string';
import * as actionCreators from '../../state/subscriptions/action-creators';
import * as routing from '../../utils/routing';
import requestStates from '../../state/state-utils/request-states';
import routes from '../../routes';
import secretActions from '../../state/secrets/action-creators';

export class SecretOverview extends React.Component {
  componentDidMount() {
    this.props.subscribe();
  }

  componentDidUpdate(prevProps) {
    const {
      appName,
      envName,
      resetSaveStates,
      subscribe,
      unsubscribe,
    } = this.props;

    if (appName !== prevProps.appName || envName !== prevProps.envName) {
      unsubscribe(prevProps.appName, prevProps.envName);
      resetSaveStates();
      subscribe();
    }
  }

  componentWillUnmount() {
    const { unsubscribe, resetSaveStates } = this.props;

    unsubscribe();
    resetSaveStates();
  }

  render() {
    const {
      appName,
      envName,
      componentName,
      secretName,
      saveError,
      saveState,
      secret,
      resetSaveStates,
      refreshEnvironment,
    } = this.props;

    const overview = (
      <p>
        Secret <strong>{secretName}</strong>
      </p>
    );

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
            {
              to: routeWithParams(routes.appActiveComponent, {
                appName,
                envName,
                componentName,
              }),
              label: componentName,
            },
            { label: `secret "${secretName}"` },
          ]}
        />
        <AsyncResource
          resource="ENVIRONMENT"
          resourceParams={[appName, envName]}
        >
          <SecretForm
            overview={overview}
            saveState={saveState}
            saveError={saveError}
            secret={secret}
            resetSaveState={resetSaveStates}
            handleSubmit={(value) => this.props.saveSecret(value)}
            getSecret={refreshEnvironment}
          />
        </AsyncResource>
      </React.Fragment>
    );
  }
}

SecretOverview.propTypes = {
  appName: PropTypes.string.isRequired,
  componentName: PropTypes.string.isRequired,
  envName: PropTypes.string.isRequired,
  resetSaveStates: PropTypes.func.isRequired,
  saveError: PropTypes.string,
  saveSecret: PropTypes.func.isRequired,
  saveState: PropTypes.oneOf(Object.values(requestStates)).isRequired,
  secret: PropTypes.object,
  secretName: PropTypes.string.isRequired,
  subscribe: PropTypes.func.isRequired,
  unsubscribe: PropTypes.func.isRequired,
  refreshEnvironment: PropTypes.func.isRequired,
};

const mapStateToProps = (state, { componentName, secretName }) => ({
  saveError: getSaveError(state, secretName),
  saveState: getSaveState(state, secretName),
  secret: getSecret(state, componentName, secretName),
});

const mapDispatchToProps = (
  dispatch,
  { appName, envName, componentName, secretName }
) => ({
  subscribe: () =>
    dispatch(actionCreators.subscribeEnvironment(appName, envName)),

  unsubscribe: (uAppName = appName, uEnvName = envName) =>
    dispatch(actionCreators.unsubscribeEnvironment(uAppName, uEnvName)),

  refreshEnvironment: () =>
    dispatch(actionCreators.refreshEnvironment(appName, envName)),

  resetSaveStates: () => dispatch(secretActions.saveReset(secretName)),

  saveSecret: (value) =>
    dispatch(
      secretActions.saveRequest(
        appName,
        envName,
        componentName,
        secretName,
        value
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(SecretOverview);
