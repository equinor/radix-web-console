import { Table, Typography } from '@equinor/eds-core-react'
import type { FunctionComponent } from 'react'

import { configVariables } from '../../utils/config'

const ConfigVariableTableCell: FunctionComponent<{
  value: string[] | unknown
}> = ({ value }) => (
  <Table.Cell>
    <pre>
      <Typography>{Array.isArray(value) ? value.join('\n') : JSON.stringify(value, null, 2)}</Typography>
    </pre>
  </Table.Cell>
)

export const ConfigList: FunctionComponent = () => (
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
              <ConfigVariableTableCell
                // @ts-expect-error key is mapped to string, even if its always keyof configVariable
                value={configVariables[key]}
              />
            </Table.Row>
          ))}
      </Table.Body>
    </Table>
  </div>
)
