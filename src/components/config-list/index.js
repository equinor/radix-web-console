import { Table, Typography } from '@equinor/eds-core-react';
import React from 'react';

import configHandler from '../../utils/config';

export const ConfigList = () => {
  const configVariables = Object.keys(configHandler)
    .sort((a, b) => a.localeCompare(b))
    .map((c) => {
      const value = configHandler[c];
      return (
        <Table.Row key={c}>
          <Table.Cell>
            <Typography>{c}</Typography>
          </Table.Cell>
          <Table.Cell>
            <pre>
              <Typography variant="body_short">
                {c === 'RADIX_CLUSTER_EGRESS_IPS'
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
        <Table.Body>{configVariables}</Table.Body>
      </Table>
    </div>
  );
};

export default ConfigList;
