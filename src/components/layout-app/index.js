import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classnames from 'classnames';
import FocusLock from 'react-focus-lock';
import Locky from 'react-locky';
import React from 'react';

import './style.css';

export class LayoutApp extends React.Component {
  constructor(props) {
    super(props);

    this.getSideBar = this.getSideBar.bind(this);
    this.handleSidebarMQTrigger = this.handleSidebarMQTrigger.bind(this);
    this.toggleSidebar = this.toggleSidebar.bind(this);

    this.sidebarMQ = matchMedia('(max-width: 50rem)');
    this.sidebarMQ.addEventListener('change', this.handleSidebarMQTrigger);

    this.sidebarRef = React.createRef();

    this.state = {
      sidebarOpen: false,
      sidebarLocksFocus: this.sidebarMQ.matches,
    };

    // TODO: On router navigation, close sidebar
  }

  componentWillUnmount() {
    this.sidebarMQ.removeEventListener('change', this.handleSidebarMQTrigger);
  }

  getSideBar() {
    if (!this.state.sidebarLocksFocus) {
      return this.props.sidebar;
    }

    return (
      <FocusLock>
        <Locky enabled={this.state.sidebarOpen} onEscape={this.toggleSidebar}>
          <div className="layout-app__sidebar-toggler">
            <button onClick={this.toggleSidebar} title="Toggle sidebar">
              <FontAwesomeIcon icon={faEllipsisV} />
            </button>
          </div>
          {this.props.sidebar}
        </Locky>
      </FocusLock>
    );
  }

  toggleSidebar() {
    this.setState({ sidebarOpen: !this.state.sidebarOpen });
  }

  handleSidebarMQTrigger(ev) {
    this.setState({ sidebarLocksFocus: ev.matches });
  }

  render() {
    return (
      <div
        className={classnames({
          'layout-app': true,
          'layout-app--open': this.state.sidebarOpen,
        })}
      >
        <div className="layout-app__sidebar">{this.getSideBar()}</div>
        <div className="layout-app__content">{this.props.children}</div>
      </div>
    );
  }
}

export default LayoutApp;
