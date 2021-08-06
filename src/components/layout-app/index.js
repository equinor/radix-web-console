import React from 'react';
import AppNavbar from '../app-navbar';

import './style.css';

export class LayoutApp extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className="grid layout-app">
        <div className="layout-app__sidebar">
          <AppNavbar appName={this.props.sidebar.props.appName} />
        </div>
        <div className="layout-app__content">{this.props.children}</div>
      </div>
    );
  }
}

export default LayoutApp;
