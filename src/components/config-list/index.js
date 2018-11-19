import React from 'react';
import configHandler from '../../utils/config';

import './../../style/objects.table.css';

const configSorter = (a, b) => a.key.localeCompare(b.key);

export const ConfigList = () => {
  const configKeys = configHandler
    .getConfigValues()
    .sort(configSorter)
    .map(c => {
      return (
        <tr key={c.key}>
          <td>{c.key}</td>
          <td>{c.value}</td>
          <td className="small">{c.source}</td>
        </tr>
      );
    });

  return (
    <table className="o-table">
      <thead>
        <tr>
          <th>Key</th>
          <th>Value</th>
          <th>Source</th>
        </tr>
      </thead>
      <tbody>{configKeys}</tbody>
    </table>
  );
};

export default ConfigList;
