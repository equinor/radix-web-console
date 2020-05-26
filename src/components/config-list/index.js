import React from 'react';

import configHandler from '../../utils/config';

const configSorter = (a, b) => a.key.localeCompare(b.key);

export const ConfigList = () => {
  const configKeys = configHandler
    .getConfigValues()
    .sort(configSorter)
    .map((c) => {
      return (
        <tr key={c.key}>
          <td>{c.key}</td>
          <td>
            <pre>{JSON.stringify(c.value, null, 2)}</pre>
          </td>
          <td>{c.source}</td>
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
