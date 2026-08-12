import { Accordion, Table, Typography } from '@equinor/eds-core-react'
import { useMemo } from 'react'
import { slowPollingInterval } from '../../../../store/defaults'
import { type Component, useGetApplicationResourcesUtilizationQuery } from '../../../../store/radix-api'
import { hasComponentOAuth2Service } from './activeComponents.utils'
import '../../style.css'
import { ActiveComponentRow } from './ActiveComponentRow'

interface ActiveComponentsListProps {
  readonly appName: string
  readonly envName: string
  readonly components: Readonly<Array<Component>>
}

export const ActiveComponentsList = (props: ActiveComponentsListProps) => {
  const { appName, envName, components } = props

  const { data: utilization } = useGetApplicationResourcesUtilizationQuery(
    { appName },
    { pollingInterval: slowPollingInterval }
  )

  const showChevronColumn = useMemo(() => components.some(hasComponentOAuth2Service), [components])

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography variant="h4" as="span">
              Active Components
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--table-overflow">
            <Table className="component-list">
              <Table.Head>
                <Table.Row>
                  {showChevronColumn && <Table.Cell />}
                  <Table.Cell className="component-list-head__name">ID</Table.Cell>
                  <Table.Cell className="component-list-head__status">Status</Table.Cell>
                  <Table.Cell className="component-list-head__replicas">Replicas</Table.Cell>
                  <Table.Cell className="component-list-head__resources">Resources</Table.Cell>
                  <Table.Cell className="component-list-head__vulnerabilities">Vulnerabilities</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {components.map((component) => (
                  <ActiveComponentRow
                    key={component.name}
                    appName={appName}
                    envName={envName}
                    component={component}
                    utilization={utilization}
                    showChevronColumn={showChevronColumn}
                  />
                ))}
              </Table.Body>
            </Table>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
