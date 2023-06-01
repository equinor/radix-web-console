import { Button, CircularProgress, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Component, MouseEvent } from 'react';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

import { RootState } from '../../init/store';
import { ComponentStatus } from '../../models/radix-api/deployments/component-status';
import {
  OAuthAuxiliaryResourceModel,
  OAuthAuxiliaryResourceModelValidationMap,
} from '../../models/radix-api/deployments/oauth-auxiliary-resource';
import { oauthAuxiliaryResourceRestartState } from '../../state/oauth-auxiliary-resource';
import { actions as oauthActions } from '../../state/oauth-auxiliary-resource/action-creators';
import { RequestState } from '../../state/state-utils/request-states';

interface OAuthToolbarState {
  restartRequestStatus: RequestState;
  restartRequestMessage?: string;
}

interface OAuthToolbarDispatch {
  restartOAuthService: (
    appName: string,
    envName: string,
    componentName: string
  ) => void;
}

export interface OAuthToolbarProps
  extends OAuthToolbarState,
    OAuthToolbarDispatch {
  appName: string;
  envName: string;
  componentName: string;
  oauth2?: OAuthAuxiliaryResourceModel;
}

export class OAuthToolbar extends Component<OAuthToolbarProps> {
  static readonly propTypes: PropTypes.ValidationMap<OAuthToolbarProps> = {
    appName: PropTypes.string.isRequired,
    envName: PropTypes.string.isRequired,
    componentName: PropTypes.string.isRequired,
    oauth2: PropTypes.shape(
      OAuthAuxiliaryResourceModelValidationMap
    ) as PropTypes.Validator<OAuthAuxiliaryResourceModel>,
    restartRequestStatus: PropTypes.oneOf(Object.values(RequestState)),
    restartRequestMessage: PropTypes.string,
    restartOAuthService: PropTypes.func.isRequired,
  };

  constructor(props: OAuthToolbarProps) {
    super(props);

    this.doRestartOAuthService = this.doRestartOAuthService.bind(this);
  }

  doRestartOAuthService(ev: MouseEvent<HTMLButtonElement>): void {
    ev.preventDefault();

    const { appName, envName, componentName } = this.props;
    this.props.restartOAuthService(appName, envName, componentName);
  }

  override render() {
    const { oauth2, restartRequestStatus, restartRequestMessage } = this.props;

    const isRestartEnabled =
      oauth2?.deployment?.status === ComponentStatus.ConsistentComponent &&
      oauth2?.deployment?.replicaList?.length > 0 &&
      restartRequestStatus !== RequestState.IN_PROGRESS;

    const restartInProgress =
      restartRequestStatus === RequestState.IN_PROGRESS ||
      oauth2?.deployment?.status === ComponentStatus.ComponentReconciling ||
      oauth2?.deployment?.status === ComponentStatus.ComponentRestarting;

    return (
      <div className="grid grid--gap-small">
        <div className="grid grid--gap-small grid--auto-columns">
          {restartInProgress && <CircularProgress size={32} />}
          <Button
            onClick={this.doRestartOAuthService}
            disabled={!isRestartEnabled}
            variant="outlined"
          >
            Restart
          </Button>
        </div>
        {restartRequestMessage && (
          <Typography>{restartRequestMessage}</Typography>
        )}
      </div>
    );
  }
}

function mapStateToProps(state: RootState): OAuthToolbarState {
  return {
    restartRequestStatus:
      oauthAuxiliaryResourceRestartState.getRestartRequestStatus(state),
    restartRequestMessage:
      oauthAuxiliaryResourceRestartState.getRestartRequestError(state),
  };
}

function mapDispatchToProps(dispatch: Dispatch): OAuthToolbarDispatch {
  return {
    restartOAuthService: (appName, envName, componentName) =>
      dispatch(
        oauthActions.restart.restartRequest(appName, envName, componentName)
      ),
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(OAuthToolbar);
