import { Button, CircularProgress } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

import { OAuthAuxiliaryResourceModel } from '../../models/oauth-auxiliary-resource';
import componentStatuses from '../../state/component/component-states';
import { oauthAuxiliaryResourceRestartState } from '../../state/oauth-auxiliary-resource';
import { actions as oauthActions } from '../../state/oauth-auxiliary-resource/action-creators';
import { RequestState } from '../../state/state-utils/request-states';

class OAuthToolbar extends Component {
  constructor() {
    super();

    this.doRestartOAuthService = this.doRestartOAuthService.bind(this);
  }

  doRestartOAuthService(ev) {
    ev.preventDefault();
    this.props.restartOAuthService(
      this.props.appName,
      this.props.envName,
      this.props.componentName
    );
  }

  render() {
    const { oauth2, restartRequestStatus, restartRequestMessage } = this.props;

    const isRestartEnabled =
      oauth2?.deployment?.status === componentStatuses.CONSISTENT &&
      oauth2?.deployment?.replicaList?.length > 0 &&
      restartRequestStatus !== RequestState.IN_PROGRESS;

    const restartInProgress =
      restartRequestStatus === RequestState.IN_PROGRESS ||
      oauth2?.deployment?.status === componentStatuses.RECONCILING ||
      oauth2?.deployment?.status === componentStatuses.RESTARTING;

    return (
      <div className="component-actions">
        <Button
          onClick={this.doRestartOAuthService}
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

OAuthToolbar.propTypes = {
  restartRequestStatus: PropTypes.oneOf(Object.values(RequestState)),
  restartRequestMessage: PropTypes.string,
  oauth2: PropTypes.shape(OAuthAuxiliaryResourceModel),
};

const mapStateToProps = (state) => ({
  restartRequestStatus:
    oauthAuxiliaryResourceRestartState.getRestartRequestStatus(state),
  restartRequestMessage:
    oauthAuxiliaryResourceRestartState.getRestartRequestError(state),
});

const mapDispatchToProps = (dispatch) => ({
  restartOAuthService: (appName, envName, componentName) =>
    dispatch(
      oauthActions.restart.restartRequest(appName, envName, componentName)
    ),
});

export default connect(mapStateToProps, mapDispatchToProps)(OAuthToolbar);
