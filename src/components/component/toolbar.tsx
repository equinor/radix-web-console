import { Button, CircularProgress, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import {
  componentRestartState,
  componentStartState,
  componentStopState,
} from '../../state/component';
import { actions as componentActions } from '../../state/component/action-creators';
import { ComponentStatus } from '../../models/component-status';
import { RequestState } from '../../state/state-utils/request-states';
import { RootState } from '../../init/store';
import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/component';

interface ToolbarData {
  appName: string;
  envName: string;
  component?: ComponentModel;
  startEnabled?: boolean;
  stopEnabled?: boolean;
}

interface ToolbarAction {
  startComponent: (
    appName: string,
    envName: string,
    componentName: string
  ) => void;
  stopComponent: (
    appName: string,
    envName: string,
    componentName: string
  ) => void;
  restartComponent: (
    appName: string,
    envName: string,
    componentName: string
  ) => void;
}

interface ToolbarState {
  startRequestStatus: RequestState;
  startRequestMessage: string;
  stopRequestStatus: RequestState;
  stopRequestMessage: string;
  restartRequestStatus: RequestState;
  restartRequestMessage: string;
}

export interface ToolbarProps
  extends ToolbarData,
    ToolbarAction,
    ToolbarState {}

export class Toolbar extends Component<ToolbarProps> {
  static readonly propTypes: PropTypes.ValidationMap<ToolbarProps> = {
    appName: PropTypes.string.isRequired,
    envName: PropTypes.string.isRequired,
    component: PropTypes.shape(
      ComponentModelValidationMap
    ) as PropTypes.Validator<ComponentModel>,
    startEnabled: PropTypes.bool,
    stopEnabled: PropTypes.bool,
    startComponent: PropTypes.func.isRequired,
    stopComponent: PropTypes.func.isRequired,
    restartComponent: PropTypes.func.isRequired,
    startRequestStatus: PropTypes.oneOf(Object.values(RequestState)).isRequired,
    startRequestMessage: PropTypes.string.isRequired,
    stopRequestStatus: PropTypes.oneOf(Object.values(RequestState)).isRequired,
    stopRequestMessage: PropTypes.string.isRequired,
    restartRequestStatus: PropTypes.oneOf(Object.values(RequestState))
      .isRequired,
    restartRequestMessage: PropTypes.string.isRequired,
  };
  constructor(props: ToolbarProps) {
    super(props);
    this.doStartComponent = this.doStartComponent.bind(this);
    this.doStopComponent = this.doStopComponent.bind(this);
    this.doRestartComponent = this.doRestartComponent.bind(this);
  }

  private doStartComponent(ev: MouseEvent<HTMLButtonElement>): void {
    ev.preventDefault();
    this.props.startComponent(
      this.props.appName,
      this.props.envName,
      this.props.component.name
    );
  }

  private doStopComponent(ev: MouseEvent<HTMLButtonElement>): void {
    ev.preventDefault();
    this.props.stopComponent(
      this.props.appName,
      this.props.envName,
      this.props.component.name
    );
  }

  private doRestartComponent(ev: MouseEvent<HTMLButtonElement>): void {
    ev.preventDefault();
    this.props.restartComponent(
      this.props.appName,
      this.props.envName,
      this.props.component.name
    );
  }

  override render() {
    const {
      component,
      startRequestStatus,
      startRequestMessage,
      stopRequestStatus,
      stopRequestMessage,
      restartRequestStatus,
      restartRequestMessage,
    } = this.props;

    const isStartEnabled =
      component?.status === ComponentStatus.StoppedComponent &&
      startRequestStatus !== RequestState.IN_PROGRESS;

    const isStopEnabled =
      component?.status !== ComponentStatus.StoppedComponent &&
      component?.replicaList?.length > 0 &&
      stopRequestStatus !== RequestState.IN_PROGRESS;

    const isRestartEnabled =
      component?.status === ComponentStatus.ConsistentComponent &&
      component?.replicaList?.length > 0 &&
      restartRequestStatus !== RequestState.IN_PROGRESS;

    const restartInProgress =
      restartRequestStatus === RequestState.IN_PROGRESS ||
      component?.status === ComponentStatus.ComponentReconciling ||
      component?.status === ComponentStatus.ComponentRestarting;

    return (
      <div className="grid grid--gap-small">
        <div className="grid grid--gap-small grid--auto-columns">
          {this.props.startEnabled && (
            <Button onClick={this.doStartComponent} disabled={!isStartEnabled}>
              Start
            </Button>
          )}
          {this.props.stopEnabled && (
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

function mapStateToProps(state: RootState): ToolbarState {
  return {
    startRequestStatus: componentStartState.getStartRequestStatus(state),
    startRequestMessage: componentStartState.getStartRequestError(state),
    stopRequestStatus: componentStopState.getStopRequestStatus(state),
    stopRequestMessage: componentStopState.getStopRequestError(state),
    restartRequestStatus: componentRestartState.getRestartRequestStatus(state),
    restartRequestMessage: componentRestartState.getRestartRequestError(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): ToolbarAction {
  return {
    startComponent: (appName, envName, componentName) =>
      dispatch(
        componentActions.start.startRequest(appName, envName, componentName)
      ),
    stopComponent: (appName, envName, componentName) =>
      dispatch(
        componentActions.stop.stopRequest(appName, envName, componentName)
      ),
    restartComponent: (appName, envName, componentName) =>
      dispatch(
        componentActions.restart.restartRequest(appName, envName, componentName)
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
