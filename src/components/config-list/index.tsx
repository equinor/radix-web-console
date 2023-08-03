import { Table, Typography } from '@equinor/eds-core-react';

import { configVariables } from '../../utils/config';

const ConfigVariableTableCell = ({
  value,
}: {
  value: unknown;
}): React.JSX.Element => (
  <Table.Cell>
    <pre>
      <Typography>
        {Array.isArray(value)
          ? value.join('\n')
          : JSON.stringify(value, null, 2)}
      </Typography>
    </pre>
  </Table.Cell>
);

export const ConfigList = (): React.JSX.Element => (
  <div className="grid grid--table-overflow">
    <Table className="o-table">
      <Table.Head>
        <Table.Row>
          <Table.Cell>Key</Table.Cell>
          <Table.Cell>Value</Table.Cell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {Object.keys(configVariables)
          .sort((a, b) => a.localeCompare(b))
          .map((key) => (
            <Table.Row key={key}>
              <Table.Cell>
                <Typography>{key}</Typography>
              </Table.Cell>
              <ConfigVariableTableCell value={configVariables[key]} />
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  </div>
);
