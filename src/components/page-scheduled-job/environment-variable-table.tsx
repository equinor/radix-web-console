import { Accordion, Table, Typography } from '@equinor/eds-core-react'
import { useMsalAccountLocalStorage } from '../../hooks/use-local-storage'

import './style.css'

type Props = {
  values: {
    [key: string]: string
  }
}
export const EnvironmentVariableTable = ({ values }: Props) => {
  const [isEnvVarsListExpanded, setIsEnvVarsListExpanded] = useMsalAccountLocalStorage(
    'batchJobEnvVarsListExpanded',
    true
  )

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded={isEnvVarsListExpanded} onExpandedChange={setIsEnvVarsListExpanded}>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography className="whitespace-nowrap" variant="h4" as="span">
              Job environment variables
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <Table className="env-vars-table">
            <Table.Head className="whitespace-nowrap">
              <Table.Row>
                <Table.Cell className="env-vars-table__header-name">Name</Table.Cell>
                <Table.Cell>Value</Table.Cell>
              </Table.Row>
            </Table.Head>

            <Table.Body>
              {Object.entries(values).map(([name, value]) => (
                <Table.Row key={name}>
                  <Table.Cell className="whitespace-nowrap">{name}</Table.Cell>
                  <Table.Cell className="env-vars-table__item-value">
                    <Typography>{value}</Typography>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
