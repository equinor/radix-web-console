import { Table, Typography } from '@equinor/eds-core-react';
import React from 'react';

import { configVariables } from '../../utils/config';
import { keys } from '../../utils/config/keys';

export const ConfigList = () => {
  const configValues = Object.keys(configVariables)
    .sort((a, b) => a.localeCompare(b))
    .map((c) => {
      const value = configVariables[c];
      return (
        <Table.Row key={c}>
          <Table.Cell>
            <Typography>{c}</Typography>
          </Table.Cell>
          <Table.Cell>
            <pre>
              <Typography variant="body_short">
                {c === keys.CLUSTER_EGRESS_IPS
                  ? value.split(',').join('\n')
                  : JSON.stringify(value, null, 2)}
              </Typography>
            </pre>
          </Table.Cell>
        </Table.Row>
      );
    });

  return (
    <div className="grid grid--table-overflow">
      <Table className="o-table">
        <Table.Head>
          <Table.Row>
            <Table.Cell>Key</Table.Cell>
            <Table.Cell>Value</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>{configValues}</Table.Body>
      </Table>
    </div>
  );
};

export default ConfigList;
