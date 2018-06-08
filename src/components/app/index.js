import React from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { Route, Link } from 'react-router-dom';

import { isLoggedIn } from '../../state/auth';
import { loginRequest } from '../../state/auth/action-creators';
import PageAbout from '../page-about';
import PageCounters from '../page-counters';

// TODO: this should be in /state
import { handleCallback } from '../../api/auth';

import './style.css';

const App = ({ isLoggedIn, goLogIn }) => {
  return (
    <div>
      <h1 className="o-heading-page">Radix Web Console</h1>
      {!isLoggedIn && <button onClick={goLogIn}>Log in</button>}
      {isLoggedIn && (
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
          </ul>

          <hr />

          <Route path="/about" component={PageAbout} />
          <Route path="/counters" component={PageCounters} />
        </div>
      )}

      <Route path="/auth-callback" render={handleCallback} />
    </div>
  );
};

const mapStateToProps = state => ({
  isLoggedIn: isLoggedIn(state),
});

const mapDispatchToProps = dispatch => ({
  goLogIn: () => dispatch(loginRequest()),
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(App));
