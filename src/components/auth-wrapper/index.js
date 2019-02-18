import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Link } from 'react-router-dom';

import DocumentTitle from '../document-title';
import { isLoggedIn, getAuthStatus } from '../../state/auth';
import authStatuses from '../../state/auth/status-types';
import { loginRequest, logoutSuccess } from '../../state/auth/action-creators';
import routes from '../../routes';

// TODO: this should be in /state
import { handleCallback } from '../../api/auth';

import './style.css';

export class AuthWrapper extends React.Component {
  constructor(props) {
    super(props);
    this.authenticate(props);
  }

  authenticate() {
    const location = this.props.location;

    if (this.props.isLoggedIn && location.pathname === routes.authLogout) {
      this.props.goLogOut();
    } else if (location.pathname === routes.authCallback) {
      handleCallback(location);
    } else if (
      !this.props.isLoggedIn &&
      location.pathname !== routes.authLogout
    ) {
      this.props.goLogIn();
    }
  }

  componentDidUpdate(prevProps) {
    this.authenticate(prevProps);
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
