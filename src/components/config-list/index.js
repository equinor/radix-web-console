import React from 'react';
import configHandler from '../../utils/config';

import './style.css';

const configSorter = (a, b) => a.key.localeCompare(b.key);

export const ConfigList = () => {
  const configKeys = configHandler
    .getConfigValues()
    .sort(configSorter)
    .map(c => {
      return (
        <div className="config-list__row" key={c.key}>
          <div className="config-list__row__cell">{c.key}</div>
          <div className="config-list__row__cell">{c.value}</div>
          <div className="config-list__row__cell">{c.source}</div>
        </div>
      );
    });

  return (
    <div className="config-list">
      <div className="config-list__header">
        <div>Key</div>
        <div>Value</div>
        <div>Source</div>
      </div>
      {configKeys}
    </div>
  );
};

export default ConfigList;
