import React from 'react';
import { Route, Link } from 'react-router-dom';

import PageAbout from '../page-about';
import PageCounters from '../page-counters';

import './style.css';

const App = () => (
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
);

export default App;
