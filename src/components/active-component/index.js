import { connect } from 'react-redux';
import React from 'react';

import Button from '../button';

import './style.css';
import componentActions from '../../state/component-restart/action-creators';

class ActiveComponent extends React.Component {
  constructor(props) {
    super(props);
    this.restart = this.restart.bind(this);
  }

  restart() {
    console.log(
      'Restart ' +
        this.props.componentName +
        ' for ' +
        this.props.appName +
        ' in ' +
        this.props.envName
    );

    this.props.restartComponent(
      this.props.appName,
      this.props.envName,
      this.props.componentName
    );
    this.deSelectButton();
  }

  deSelectButton() {
    const el = document.createElement('textarea');
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
  }

  render() {
    return (
      <span className="active-component">
        <span className="active-component__name">{this.props.component}</span>{' '}
        <Button onClick={this.restart} btnType={['default', 'tiny']}>
          Restart
        </Button>
      </span>
    );
  }
}

export default ActiveComponent;

// eslint-disable-next-line no-empty-pattern
const mapDispatchToProps = (dispatch, {}) => ({
  restartComponent: (appName, envName, componentName) =>
    dispatch(
      componentActions.restartComponent(appName, envName, componentName)
    ),
});

connect(mapDispatchToProps)(ActiveComponent);
