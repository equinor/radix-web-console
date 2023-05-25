import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import AsyncResource from '../async-resource';
import { Breadcrumb } from '../breadcrumb';
import { SecretForm } from '../secret-form';
import { RootState } from '../../init/store';
import {
  SecretModel,
  SecretModelValidationMap,
} from '../../models/radix-api/secrets/secret';
import { routes } from '../../routes';
import { getSecret } from '../../state/environment';
import { getSaveError, getSaveState } from '../../state/secrets';
import { actions as secretActions } from '../../state/secrets/action-creators';
import { RequestState } from '../../state/state-utils/request-states';
import * as actions from '../../state/subscriptions/action-creators';
import { getEnvsUrl } from '../../utils/routing';
import { routeWithParams } from '../../utils/string';

interface SecretOverviewDispatch {
  subscribe: (appName: string, envName: string) => void;
  unsubscribe: (appName: string, envName: string) => void;
  refreshEnvironment: () => void;
  resetSaveStates: () => void;
  saveSecret: (value: string) => void;
}

interface SecretOverviewState {
  saveError?: string;
  saveState: RequestState;
  secret?: SecretModel;
}

export interface SecretOverviewProps
  extends SecretOverviewDispatch,
    SecretOverviewState {
  appName: string;
  componentName: string;
  envName: string;
  secretName: string;
}

export class SecretOverview extends Component<SecretOverviewProps> {
  static readonly propTypes: PropTypes.ValidationMap<SecretOverviewProps> = {
    appName: PropTypes.string.isRequired,
    componentName: PropTypes.string.isRequired,
    envName: PropTypes.string.isRequired,
    secretName: PropTypes.string.isRequired,
    saveError: PropTypes.string,
    saveState: PropTypes.oneOf(Object.values(RequestState)).isRequired,
    secret: PropTypes.shape(
      SecretModelValidationMap
    ) as PropTypes.Validator<SecretModel>,
    subscribe: PropTypes.func.isRequired,
    unsubscribe: PropTypes.func.isRequired,
    refreshEnvironment: PropTypes.func.isRequired,
    saveSecret: PropTypes.func.isRequired,
    resetSaveStates: PropTypes.func.isRequired,
  };

  override componentDidMount() {
    const { appName, envName } = this.props;
    this.props.subscribe(appName, envName);
  }

  override componentDidUpdate(prevProps: Readonly<SecretOverviewProps>) {
    const { appName, envName } = this.props;

    if (appName !== prevProps.appName || envName !== prevProps.envName) {
      this.props.unsubscribe(prevProps.appName, prevProps.envName);
      this.props.resetSaveStates();
      this.props.subscribe(appName, envName);
    }
  }

  override componentWillUnmount() {
    const { appName, envName } = this.props;
    this.props.unsubscribe(appName, envName);
    this.props.resetSaveStates();
  }

  override render() {
    const {
      appName,
      envName,
      componentName,
      secretName,
      saveError,
      saveState,
      secret,
      refreshEnvironment,
      resetSaveStates,
      saveSecret,
    } = this.props;

    return (
      <>
        <Breadcrumb
          links={[
            { label: appName, to: routeWithParams(routes.app, { appName }) },
            { label: 'Environments', to: getEnvsUrl(appName) },
            {
              label: envName,
              to: routeWithParams(routes.appEnvironment, { appName, envName }),
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
            secretName={secretName}
            saveState={saveState}
            saveError={saveError}
            secret={secret}
            resetSaveState={resetSaveStates}
            handleSubmit={(value) => saveSecret(value)}
            getSecret={refreshEnvironment}
          />
        </AsyncResource>
      </>
    );
  }
}

function mapStateToProps(
  state: RootState,
  {
    componentName,
    secretName,
  }: Pick<SecretOverviewProps, 'componentName' | 'secretName'>
): SecretOverviewState {
  return {
    saveError: getSaveError(state, secretName),
    saveState: getSaveState(state, secretName),
    secret: getSecret(state, componentName, secretName),
  };
}

function mapDispatchToProps(
  dispatch: Dispatch,
  {
    appName,
    envName,
    componentName,
    secretName,
  }: Pick<
    SecretOverviewProps,
    'appName' | 'envName' | 'componentName' | 'secretName'
  >
): SecretOverviewDispatch {
  return {
    subscribe: (appName, envName) =>
      dispatch(actions.subscribeEnvironment(appName, envName)),
    unsubscribe: (appName, envName) =>
      dispatch(actions.unsubscribeEnvironment(appName, envName)),

    refreshEnvironment: () =>
      dispatch(actions.refreshEnvironment(appName, envName)),
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
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(SecretOverview);
