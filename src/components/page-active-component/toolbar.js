import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';
import Button from '../button';
import ActionsPage from '../actions-page';
import Spinner from '../spinner';

import {
  getStartRequestStatus,
  getStartRequestError,
  getStopRequestStatus,
  getStopRequestError,
  getRestartRequestStatus,
  getRestartRequestError,
} from '../../state/component';
import componentStatuses from '../../state/component/component-states';
import componentActions from '../../state/component/action-creators';
import requestStatuses from '../../state/state-utils/request-states';

export class Toolbar extends React.Component {
  constructor() {
    super();

    this.doStartComponent = this.doStartComponent.bind(this);
    this.doStopComponent = this.doStopComponent.bind(this);
    this.doRestartComponent = this.doRestartComponent.bind(this);
  }

  doStartComponent(ev) {
    ev.preventDefault();
    this.props.startComponent({
      appName: this.props.appName,
      envName: this.props.envName,
      componentName: this.props.component.name,
    });
  }

  doStopComponent(ev) {
    ev.preventDefault();
    this.props.stopComponent({
      appName: this.props.appName,
      envName: this.props.envName,
      componentName: this.props.component.name,
    });
  }

  doRestartComponent(ev) {
    ev.preventDefault();
    this.props.restartComponent({
      appName: this.props.appName,
      envName: this.props.envName,
      componentName: this.props.component.name,
    });
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
      component &&
      component.status === componentStatuses.STOPPED &&
      startRequestStatus !== requestStatuses.IN_PROGRESS;

    const isStopEnabled =
      component &&
      component.status === componentStatuses.CONSISTENT &&
      component.replicaList.length > 0 &&
      stopRequestStatus !== requestStatuses.IN_PROGRESS;

    const isRestartEnabled =
      component &&
      component.status === componentStatuses.CONSISTENT &&
      component.replicaList.length > 0 &&
      restartRequestStatus !== requestStatuses.IN_PROGRESS;

    const restartInProgress =
      restartRequestStatus === requestStatuses.IN_PROGRESS ||
      (component &&
        (component.status === componentStatuses.RECONCILING ||
          component.status === componentStatuses.RESTARTING));

    return (
      <ActionsPage>
        <Button onClick={this.doStartComponent} disabled={!isStartEnabled}>
          Start
        </Button>
        {startRequestMessage && <div>{startRequestMessage}</div>}
        <Button onClick={this.doStopComponent} disabled={!isStopEnabled}>
          Stop
        </Button>
        {stopRequestMessage && <div>{stopRequestMessage}</div>}
        <Button onClick={this.doRestartComponent} disabled={!isRestartEnabled}>
          Restart
        </Button>
        {restartInProgress && <Spinner />}
        {restartRequestMessage && <div>{restartRequestMessage}</div>}
      </ActionsPage>
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

const mapStateToProps = state => ({
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
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Toolbar);
