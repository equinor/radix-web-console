import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import {
  componentStartState,
  componentRestartState,
  componentStopState,
} from '../../state/component';
import componentStatuses from '../../state/component/component-states';
import componentActions from '../../state/component/action-creators';
import requestStatuses from '../../state/state-utils/request-states';

import { Button, CircularProgress } from '@equinor/eds-core-react';

export class Toolbar extends React.Component {
  constructor() {
    super();

    this.doStartComponent = this.doStartComponent.bind(this);
    this.doStopComponent = this.doStopComponent.bind(this);
    this.doRestartComponent = this.doRestartComponent.bind(this);
  }

  doStartComponent(ev) {
    ev.preventDefault();
    this.props.startComponent(
      this.props.appName,
      this.props.envName,
      this.props.component.name
    );
  }

  doStopComponent(ev) {
    ev.preventDefault();
    this.props.stopComponent(
      this.props.appName,
      this.props.envName,
      this.props.component.name
    );
  }

  doRestartComponent(ev) {
    ev.preventDefault();
    this.props.restartComponent(
      this.props.appName,
      this.props.envName,
      this.props.component.name
    );
  }

  render() {
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
      component?.status === componentStatuses.STOPPED &&
      startRequestStatus !== requestStatuses.IN_PROGRESS;

    const isStopEnabled =
      component?.status !== componentStatuses.STOPPED &&
      component?.replicaList?.length > 0 &&
      stopRequestStatus !== requestStatuses.IN_PROGRESS;

    const isRestartEnabled =
      component?.status === componentStatuses.CONSISTENT &&
      component?.replicaList?.length > 0 &&
      restartRequestStatus !== requestStatuses.IN_PROGRESS;

    const restartInProgress =
      restartRequestStatus === requestStatuses.IN_PROGRESS ||
      component?.status === componentStatuses.RECONCILING ||
      component?.status === componentStatuses.RESTARTING;

    return (
      <div className="component-actions">
        <Button onClick={this.doStartComponent} disabled={!isStartEnabled}>
          Start
        </Button>
        {startRequestMessage && <div>{startRequestMessage}</div>}
        <Button onClick={this.doStopComponent} disabled={!isStopEnabled}>
          Stop
        </Button>
        {stopRequestMessage && <div>{stopRequestMessage}</div>}
        <Button
          onClick={this.doRestartComponent}
          disabled={!isRestartEnabled}
          variant="outlined"
        >
          Restart
        </Button>
        {restartInProgress && <CircularProgress size={32} />}
        {restartRequestMessage && <div>{restartRequestMessage}</div>}
      </div>
    );
  }
}

Toolbar.propTypes = {
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

const mapStateToProps = (state) => ({
  startRequestStatus: componentStartState.getStartRequestStatus(state),
  startRequestMessage: componentStartState.getStartRequestError(state),
  stopRequestStatus: componentStopState.getStopRequestStatus(state),
  stopRequestMessage: componentStopState.getStopRequestError(state),
  restartRequestStatus: componentRestartState.getRestartRequestStatus(state),
  restartRequestMessage: componentRestartState.getRestartRequestError(state),
});

const mapDispatchToProps = (dispatch) => ({
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Toolbar);
