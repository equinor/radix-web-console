import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';

import { isLoggedIn } from '../../state/auth';
import { loginRequest, logout } from '../../state/auth/action-creators';
import PageAbout from '../page-about';
import PageCounters from '../page-counters';
import routes from '../../routes';

// TODO: this should be in /state
import { handleCallback } from '../../api/auth';

import './style.css';

const App = ({ isLoggedIn, goLogIn, goLogOut, location }) => {
  if (!isLoggedIn) {
    if (location.pathname === routes.authCallback) {
      handleCallback(location);
    } else {
      goLogIn();
    }

    return <p>Logging in…</p>;
  }

  return (
    <div>
      <h1 className="o-heading-page">Radix Web Console</h1>
      <div>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/counters">Counters</Link>
          </li>
          <li>
            <Link to={routes.authLogout}>Log out</Link>
          </li>
        </ul>

        <hr />

        <Route path="/about" component={PageAbout} />
        <Route path="/counters" component={PageCounters} />
        <Route path={routes.authLogout} render={goLogOut} />
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  goLogIn: () => dispatch(loginRequest()),
  goLogOut: () => dispatch(logout()),
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
