import React from 'react';
import { Route, Link } from 'react-router-dom';

import PageAbout from '../page-about';

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
        <Link to="/topics">Topics</Link>
      </li>
    </ul>

    <hr />

    <Route path="/about" component={PageAbout} />
  </div>
);

export default App;
