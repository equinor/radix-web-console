import React from 'react';
import configHandler from '../../utils/config';

import './style.css';

export const ConfigStatus = () => {
  // check if we have no config overrides via url, if we do, return 'nothing'.
  if (!configHandler.hasDomainConfigViaUrl()) {
    return null;
  }

  const configKeys = configHandler.getDomainConfigValuesViaUrl().map(c => {
    return (
      <span key={c.key}>
        {c.key} = {c.value}
      </span>
    );
  });

  return (
    <div
      className="config-status"
      title="To remove the config override, simply reload the browser window without the URL parameters and this will be cleared."
    >
      <div className="o-layout-container">Config via URL: {configKeys}</div>
    </div>
  );
};

export default ConfigStatus;
