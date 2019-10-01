import React from 'react';

import Button from '../button';

import './style.css';

const ActiveComponent = ({ app, env, name }) => {
  function restartComponent(app, env, component) {
    console.log('Restart ' + component + ' for ' + app + ' in ' + env);
    deSelectButton();
  }

  function deSelectButton() {
    const el = document.createElement('textarea');
    el.setAttribute('readonly', '');
    el.style = { position: 'absolute', left: '-9999px' };
    document.body.appendChild(el);
    el.select();
  }

  return (
    <span className="active-component">
      <span className="active-component__name">{name}</span>{' '}
      <Button
        onClick={() => restartComponent(app, env, name)}
        btnType={['default', 'tiny']}
      >
        Restart
      </Button>
    </span>
  );
};

export default ActiveComponent;
