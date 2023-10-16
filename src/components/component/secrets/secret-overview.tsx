import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import AsyncResource from '../../async-resource';
import { SecretForm } from '../../secret-form';
import { RootState } from '../../../init/store';
import {
  SecretModel,
  SecretModelValidationMap,
} from '../../../models/radix-api/secrets/secret';
import { getSecret } from '../../../state/environment';
import { getSaveError, getSaveState } from '../../../state/secrets';
import { actions as secretActions } from '../../../state/secrets/action-creators';
import { RequestState } from '../../../state/state-utils/request-states';
import {
  refreshEnvironment,
  subscribeEnvironment,
  unsubscribeEnvironment,
} from '../../../state/subscriptions/action-creators';

interface SecretOverviewDispatch {
  subscribe: (appName: string, envName: string) => void;
  unsubscribe: (appName: string, envName: string) => void;
  refreshEnvironment: () => void;
  resetSaveState: () => void;
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
    resetSaveState: PropTypes.func.isRequired,
  };

  override componentDidMount() {
    const { appName, envName } = this.props;
    this.props.subscribe(appName, envName);
  }

  override componentDidUpdate(prevProps: Readonly<SecretOverviewProps>) {
    const { appName, envName } = this.props;

    if (appName !== prevProps.appName || envName !== prevProps.envName) {
      this.props.unsubscribe(prevProps.appName, prevProps.envName);
      this.props.resetSaveState();
      this.props.subscribe(appName, envName);
    }
  }

  override componentWillUnmount() {
    const { appName, envName } = this.props;
    this.props.unsubscribe(appName, envName);
    this.props.resetSaveState();
  }

  override render() {
    const { appName, envName, refreshEnvironment, saveSecret, ...rest } =
      this.props;

    return (
      <AsyncResource resource="ENVIRONMENT" resourceParams={[appName, envName]}>
        <SecretForm
          handleSubmit={(value) => saveSecret(value)}
          getSecret={refreshEnvironment}
          {...rest}
        />
      </AsyncResource>
    );
  }
}

export default connect<
  SecretOverviewState,
  SecretOverviewDispatch,
  Omit<
    SecretOverviewProps,
    keyof (SecretOverviewState & SecretOverviewDispatch)
  >,
  RootState
>(
  (state, { componentName, secretName }) => ({
    saveError: getSaveError(state, secretName),
    saveState: getSaveState(state, secretName),
    secret: getSecret(state, componentName, secretName),
  }),
  (dispatch, { appName, envName, componentName, secretName }) => ({
    subscribe: (app, env) => dispatch(subscribeEnvironment(app, env)),
    unsubscribe: (app, env) => dispatch(unsubscribeEnvironment(app, env)),

    refreshEnvironment: () => dispatch(refreshEnvironment(appName, envName)),
    resetSaveState: () => dispatch(secretActions.saveReset(secretName)),
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
  })
)(SecretOverview);
