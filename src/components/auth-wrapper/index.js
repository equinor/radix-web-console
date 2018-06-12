import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';

import { isLoggedIn } from '../../state/auth';
import { loginRequest, logoutSuccess } from '../../state/auth/action-creators';
import routes from '../../routes';

// TODO: this should be in /state
import { handleCallback } from '../../api/auth';

const AuthWrapper = ({ isLoggedIn, goLogIn, goLogOut, location, children }) => {
  if (!isLoggedIn) {
    if (location.pathname === routes.authCallback) {
      handleCallback(location);
      return <p>Processing login…</p>;
    } else {
      goLogIn();
      return <p>Logging in…</p>;
    }
  }

  if (location.pathname === routes.authLogout) {
    goLogOut();
    return <p>Logging out…</p>;
  }

  return children;
};

const mapStateToProps = state => ({
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
