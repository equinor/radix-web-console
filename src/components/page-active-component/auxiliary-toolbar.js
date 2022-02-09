import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import React from 'react';

import { auxResourceRestartState } from '../../state/auxiliary-resource';
import componentStatuses from '../../state/component/component-states';
import auxResourceActions from '../../state/auxiliary-resource/action-creators';
import requestStatuses from '../../state/state-utils/request-states';

import { Button, CircularProgress } from '@equinor/eds-core-react';

class AuxiliaryToolbar extends React.Component {
  constructor() {
    super();

    this.doRestartAuxResource = this.doRestartAuxResource.bind(this);
  }

  doRestartAuxResource(ev) {
    ev.preventDefault();
    this.props.restartAuxiliaryResource(
      this.props.appName,
      this.props.envName,
      this.props.componentName,
      this.props.auxResource.type
    );
  }

  render() {
    const { auxResource, restartRequestStatus, restartRequestMessage } =
      this.props;

    const isRestartEnabled =
      auxResource &&
      auxResource.deployment &&
      auxResource.deployment.status === componentStatuses.CONSISTENT &&
      auxResource.deployment.replicaList != null &&
      auxResource.deployment.replicaList.length > 0 &&
      restartRequestStatus !== requestStatuses.IN_PROGRESS;

    const restartInProgress =
      restartRequestStatus === requestStatuses.IN_PROGRESS ||
      (auxResource &&
        auxResource.deployment &&
        (auxResource.deployment.status === componentStatuses.RECONCILING ||
          auxResource.deployment.status === componentStatuses.RESTARTING));

    return (
      <div className="component-actions">
        <Button
          onClick={this.doRestartAuxResource}
          disabled={!isRestartEnabled}
          variant="outlined"
        >
          Restart
        </Button>
        {restartInProgress && <CircularProgress size="32" />}
        {restartRequestMessage && <div>{restartRequestMessage}</div>}
      </div>
    );
  }
}

AuxiliaryToolbar.propTypes = {
  restartRequestStatus: PropTypes.oneOf(Object.values(requestStatuses)),
  restartRequestMessage: PropTypes.string,
};

const mapStateToProps = (state) => ({
  restartRequestStatus: auxResourceRestartState.getRestartRequestStatus(state),
  restartRequestMessage: auxResourceRestartState.getRestartRequestError(state),
});

const mapDispatchToProps = (dispatch) => ({
  restartAuxiliaryResource: (appName, envName, componentName, auxType) =>
    dispatch(
      auxResourceActions.restartRequest(
        appName,
        envName,
        componentName,
        auxType
      )
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AuxiliaryToolbar);
