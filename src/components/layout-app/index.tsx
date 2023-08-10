import { Component, ReactNode } from 'react';

import AppNavbar from '../app-navbar';

import './style.css';

export class LayoutApp extends Component<{
  appName: string;
  children: ReactNode;
}> {
  override render() {
    return (
      <div className="grid layout-app">
        <div className="layout-app__sidebar">
          <AppNavbar appName={this.props.appName} />
        </div>
        <div className="layout-app__content">{this.props.children}</div>
      </div>
    );
  }
}
