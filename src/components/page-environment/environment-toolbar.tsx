import { Button, CircularProgress, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from '../../init/store';
import { ComponentStatus } from '../../models/component-status';
import {
  EnvironmentModel,
  EnvironmentModelValidationMap,
} from '../../models/environment';
import {
  environmentRestartState,
  environmentStartState,
  environmentStopState,
} from '../../state/environment';
import { actions as environmentActions } from '../../state/environment/action-creators';
import { RequestState } from '../../state/state-utils/request-states';

interface EnvironmentToolbarDispatch {
  startEnvironment: (
    ...args: Parameters<typeof environmentActions.start.startRequest>
  ) => void;
  stopEnvironment: (
    ...args: Parameters<typeof environmentActions.stop.stopRequest>
  ) => void;
  restartEnvironment: (
    ...args: Parameters<typeof environmentActions.restart.restartRequest>
  ) => void;
}

interface EnvironmentToolbarState {
  startRequestStatus: RequestState;
  startRequestMessage?: string;
  stopRequestStatus: RequestState;
  stopRequestMessage?: string;
  restartRequestStatus: RequestState;
  restartRequestMessage?: string;
}

export interface ToolbarProps
  extends EnvironmentToolbarState,
    EnvironmentToolbarDispatch {
  appName: string;
  environment: EnvironmentModel;
  startEnabled?: boolean;
  stopEnabled?: boolean;
}

export class EnvironmentToolbar extends Component<ToolbarProps> {
  static readonly propTypes: PropTypes.ValidationMap<ToolbarProps> = {
    appName: PropTypes.string.isRequired,
    environment: PropTypes.shape(EnvironmentModelValidationMap)
      .isRequired as PropTypes.Validator<EnvironmentModel>,
    startEnabled: PropTypes.bool,
    stopEnabled: PropTypes.bool,
    startEnvironment: PropTypes.func.isRequired,
    stopEnvironment: PropTypes.func.isRequired,
    restartEnvironment: PropTypes.func.isRequired,
    startRequestStatus: PropTypes.oneOf(Object.values(RequestState)).isRequired,
    startRequestMessage: PropTypes.string,
    stopRequestStatus: PropTypes.oneOf(Object.values(RequestState)).isRequired,
    stopRequestMessage: PropTypes.string,
    restartRequestStatus: PropTypes.oneOf(Object.values(RequestState))
      .isRequired,
    restartRequestMessage: PropTypes.string,
  };

  constructor(props: ToolbarProps) {
    super(props);
    this.doStartComponent = this.doStartComponent.bind(this);
    this.doStopComponent = this.doStopComponent.bind(this);
    this.doRestartComponent = this.doRestartComponent.bind(this);
  }

  private doStartComponent(ev: MouseEvent<HTMLButtonElement>): void {
    ev.preventDefault();
    this.props.startEnvironment(
      this.props.appName,
      this.props.environment.name
    );
  }

  private doStopComponent(ev: MouseEvent<HTMLButtonElement>): void {
    ev.preventDefault();
    this.props.stopEnvironment(this.props.appName, this.props.environment.name);
  }

  private doRestartComponent(ev: MouseEvent<HTMLButtonElement>): void {
    ev.preventDefault();
    this.props.restartEnvironment(
      this.props.appName,
      this.props.environment.name
    );
  }

  override render() {
    const {
      environment,
      startEnabled,
      startRequestStatus,
      startRequestMessage,
      stopEnabled,
      stopRequestStatus,
      stopRequestMessage,
      restartRequestStatus,
      restartRequestMessage,
    } = this.props;

    const components =
      environment.activeDeployment?.components?.filter(
        ({ status, type }) =>
          type === 'component' && status !== ComponentStatus.Unsupported
      ) || [];
    const stoppedComponents = components.filter(
      ({ status }) => status === ComponentStatus.StoppedComponent
    );
    const consistentComponents = components.filter(
      ({ status }) => status === ComponentStatus.ConsistentComponent
    );
    const restartingComponents = components.filter(
      ({ status }) =>
        status === ComponentStatus.ComponentReconciling ||
        status === ComponentStatus.ComponentRestarting
    );

    const consistentReplicasSum = consistentComponents.reduce(
      (sum, { replicaList }) => (sum += replicaList?.length ?? 0),
      0
    );

    const isStartEnabled =
      stoppedComponents.length > 0 &&
      startRequestStatus !== RequestState.IN_PROGRESS;

    const isStopEnabled =
      stoppedComponents.length < components.length &&
      stopRequestStatus !== RequestState.IN_PROGRESS;

    const isRestartEnabled =
      consistentComponents.length > 0 &&
      consistentReplicasSum > 0 &&
      restartRequestStatus !== RequestState.IN_PROGRESS;

    const restartInProgress =
      (components.length > 0 &&
        restartingComponents.length === components.length) ||
      restartRequestStatus === RequestState.IN_PROGRESS;

    return (
      <div className="grid grid--gap-small">
        <div className="grid grid--gap-small grid--auto-columns">
          {startEnabled && (
            <Button onClick={this.doStartComponent} disabled={!isStartEnabled}>
              Start
            </Button>
          )}
          {stopEnabled && (
            <Button onClick={this.doStopComponent} disabled={!isStopEnabled}>
              Stop
            </Button>
          )}
          <Button
            onClick={this.doRestartComponent}
            disabled={!isRestartEnabled}
            variant="outlined"
          >
            Restart
          </Button>
          {restartInProgress && <CircularProgress size={32} />}
        </div>
        {startRequestMessage && <Typography>{startRequestMessage}</Typography>}
        {stopRequestMessage && <Typography>{stopRequestMessage}</Typography>}
        {restartRequestMessage && (
          <Typography>{restartRequestMessage}</Typography>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: RootState): EnvironmentToolbarState {
  return {
    startRequestStatus: environmentStartState.getStartRequestStatus(state),
    startRequestMessage: environmentStartState.getStartRequestError(state),
    stopRequestStatus: environmentStopState.getStopRequestStatus(state),
    stopRequestMessage: environmentStopState.getStopRequestError(state),
    restartRequestStatus:
      environmentRestartState.getRestartRequestStatus(state),
    restartRequestMessage:
      environmentRestartState.getRestartRequestError(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): EnvironmentToolbarDispatch {
  return {
    startEnvironment: (appName, envName) =>
      dispatch(environmentActions.start.startRequest(appName, envName)),
    stopEnvironment: (appName, envName) =>
      dispatch(environmentActions.stop.stopRequest(appName, envName)),
    restartEnvironment: (appName, envName) =>
      dispatch(environmentActions.restart.restartRequest(appName, envName)),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(EnvironmentToolbar);
