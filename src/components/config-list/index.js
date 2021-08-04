import { Table } from '@equinor/eds-core-react';
import React from 'react';

import configHandler from '../../utils/config';

const configSorter = (a, b) => a.key.localeCompare(b.key);

export const ConfigList = () => {
  const configKeys = configHandler
    .getConfigValues()
    .sort(configSorter)
    .map((c) => {
      return (
        <Table.Row key={c.key}>
          <Table.Cell>{c.key}</Table.Cell>
          <Table.Cell>
            <pre>{JSON.stringify(c.value, null, 2)}</pre>
          </Table.Cell>
          <Table.Cell>{c.source}</Table.Cell>
        </Table.Row>
      );
    });

  return (
    <Table className="o-table">
      <Table.Head>
        <Table.Cell>Key</Table.Cell>
        <Table.Cell>Value</Table.Cell>
        <Table.Cell>Source</Table.Cell>
      </Table.Head>
      <Table.Body>{configKeys}</Table.Body>
    </Table>
  );
};

export default ConfigList;
