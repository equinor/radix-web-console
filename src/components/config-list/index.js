import { Table, Typography } from '@equinor/eds-core-react';
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
          <Table.Cell>
            <Typography variant="body_short">{c.key}</Typography>
          </Table.Cell>
          <Table.Cell>
            <pre>
              <Typography variant="body_short">
                {JSON.stringify(c.value, null, 2)}
              </Typography>
            </pre>
          </Table.Cell>
          <Table.Cell variant="body_short">
            <Typography>{c.source}</Typography>
          </Table.Cell>
        </Table.Row>
      );
    });

  const clusterIps = (
    <Table.Row>
      <Table.Cell>
        <Typography variant="body_short">RADIX_CLUSTER_EGRESS_IPS</Typography>
      </Table.Cell>
      <Table.Cell>
        <pre>
          <Typography variant="body_short">
            {process.env.REACT_APP_RADIX_CLUSTER_EGRESS_IPS?.split(',').join(
              '\n'
            )}
          </Typography>
        </pre>
      </Table.Cell>
      <Table.Cell>
        <Typography>CLUSTER_SECRET</Typography>
      </Table.Cell>
    </Table.Row>
  );

  return (
    <div className="grid grid--table-overflow">
      <Table className="o-table">
        <Table.Head>
          <Table.Row>
            <Table.Cell>Key</Table.Cell>
            <Table.Cell>Value</Table.Cell>
            <Table.Cell>Source</Table.Cell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {configKeys}
          {clusterIps}
        </Table.Body>
      </Table>
    </div>
  );
};

export default ConfigList;
