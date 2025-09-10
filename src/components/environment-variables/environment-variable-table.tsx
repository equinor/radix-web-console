import { Table, TextField, Typography } from '@equinor/eds-core-react'
import type { ChangeEvent, ReactNode } from 'react'
import type { EnvVar } from '../../store/radix-api'
import './style.css'

export interface FormattedEnvVar {
  value?: string
  original: EnvVar
}

type Props = {
  values: Array<FormattedEnvVar>
  valuePrefix?: ReactNode
  isTextfieldDisabled?: boolean
  inEditMode?: boolean
  showOriginal?: boolean
  onValueChange?: (value: string, name: string) => void
}
export const EnvironmentVariableTable = ({
  values,
  valuePrefix,
  isTextfieldDisabled,
  inEditMode,
  showOriginal,
  onValueChange = () => void 0,
}: Props) => (
  <Table className="env-vars-table">
    <Table.Head className="whitespace-nowrap">
      <Table.Row>
        <Table.Cell className="env-vars-table__header-name">Name</Table.Cell>
        <Table.Cell>Value</Table.Cell>
        {showOriginal && <Table.Cell>Original</Table.Cell>}
      </Table.Row>
    </Table.Head>

    <Table.Body>
      {values.map(({ value, original: { name, metadata } }) => (
        <Table.Row key={name}>
          <Table.Cell className="whitespace-nowrap">
            {valuePrefix} {name}
          </Table.Cell>

          <Table.Cell className="env-vars-table__item-value">
            {!inEditMode ? (
              <Typography>{value}</Typography>
            ) : (
              <TextField
                id={name}
                type="text"
                value={value}
                multiline
                disabled={isTextfieldDisabled}
                onChange={({ target }: ChangeEvent<HTMLInputElement>) => onValueChange(target.value, name)}
              />
            )}
          </Table.Cell>

          {showOriginal && (
            <Typography as={Table.Cell} className="env-vars-table__item-value">
              {metadata && (metadata.radixConfigValue || <code>empty</code>)}
            </Typography>
          )}
        </Table.Row>
      ))}
    </Table.Body>
  </Table>
)
