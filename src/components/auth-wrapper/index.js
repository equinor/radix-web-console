import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { withRouter } from 'react-router';
import React from 'react';

import AuthError from './error';

import { isLoggedIn, getAuthStatus } from '../../state/auth';
import { loginRequest, logoutSuccess } from '../../state/auth/action-creators';
import authStatuses from '../../state/auth/status-types';
import DocumentTitle from '../document-title';
import routes from '../../routes';

// TODO: this should be in /state
import { handleCallback } from '../../api/auth';

import './style.css';

export class AuthWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.state = { callbackMessage: null };
    if (
      !this.props.isLoggedIn &&
      this.props.location.pathname !== routes.authLogout
    ) {
      this.authenticate(true);
    }
  }

  authenticate(isConstructor = false) {
    this.authenticating = true;

    const location = this.props.location;
    let callbackMessage = null;

    if (location.pathname === routes.authLogout) {
      this.props.goLogOut();
    } else if (location.pathname === routes.authCallback) {
      callbackMessage = handleCallback(location);
    } else if (
      !this.props.isLoggedIn &&
      location.pathname !== routes.authLogout
    ) {
      this.props.goLogIn();
    }

    if (isConstructor) {
      // eslint-disable-next-line react/no-direct-mutation-state
      this.state.callbackMessage = callbackMessage;
      this.authenticating = false;
    } else {
      this.setState({ callbackMessage }, () => (this.authenticating = false));
    }
  }

  componentDidUpdate(_, prevState) {
    if (!this.authenticating && !prevState.authenticating) {
      this.authenticate();
    }
  }

  render() {
    if (window.frameElement && window.frameElement.id.startsWith('adal')) {
      return 'Adal.js iframe';
    }

    if (this.props.isLoggedIn) {
      return this.props.children;
    }

    if (this.props.authStatus === authStatuses.AUTHENTICATING) {
      return (
        <React.Fragment>
          <DocumentTitle title="Logging in…" />
          <p className="auth-wrapper">Logging in…</p>
        </React.Fragment>
      );
    }

    if (this.state.callbackMessage) {
      return <AuthError callbackMessage={this.state.callbackMessage} />;
    }

    return (
      <p className="auth-wrapper">
        <DocumentTitle title="Logged out" />
        Logged out. <Link to="/">Log in again</Link>
      </p>
    );
  }
}

const mapStateToProps = state => ({
  authStatus: getAuthStatus(state),
  isLoggedIn: isLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  goLogIn: () => dispatch(loginRequest()),
  goLogOut: () => dispatch(logoutSuccess()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(AuthWrapper)
);
