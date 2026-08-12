import { Accordion, Table, Typography } from '@equinor/eds-core-react'
import { Link } from 'react-router'
import { ComponentStatusBadge } from '../../../components/status-badges'
import type { Component, ReplicaSummary } from '../../../store/radix-api'
import { getActiveJobComponentUrl, getReplicaUrl } from '../../../utils/routing'
import { ReplicaLinks } from './ReplicaLinks'
import { VulnerabilitySummaryCell } from './vulnerability-summary-cell/VulnerabilitySummaryCell'

import '../style.css'

interface ActiveJobsListProps {
  readonly appName: string
  readonly envName: string
  readonly jobs: Readonly<Array<Component>>
}

export const ActiveJobsList = (props: ActiveJobsListProps) => {
  const { appName, envName, jobs } = props

  return (
    <Accordion className="accordion elevated" chevronPosition="right">
      <Accordion.Item isExpanded>
        <Accordion.Header>
          <Accordion.HeaderTitle>
            <Typography variant="h4" as="span">
              Active Jobs
            </Typography>
          </Accordion.HeaderTitle>
        </Accordion.Header>
        <Accordion.Panel>
          <div className="grid grid--table-overflow">
            <Table className="component-list">
              <Table.Head>
                <Table.Row>
                  <Table.Cell className="component-list-head__name">ID</Table.Cell>
                  <Table.Cell className="component-list-head__status">Status</Table.Cell>
                  <Table.Cell className="component-list-head__replicas">Replicas</Table.Cell>
                  <Table.Cell className="component-list-head__vulnerabilities">Vulnerabilities</Table.Cell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {jobs.map((job) => (
                  <Table.Row key={job.name}>
                    <Table.Cell>
                      <Typography as={Link} to={getActiveJobComponentUrl(appName, envName, job.name)} link>
                        {job.name}
                      </Typography>
                    </Table.Cell>
                    <Table.Cell>
                      <ComponentStatusBadge status={job.status ?? 'Reconciling'} />
                    </Table.Cell>
                    <Table.Cell>
                      <ReplicaLinks
                        replicaList={job.replicaList}
                        urlFunc={(replica: ReplicaSummary) => getReplicaUrl(appName, envName, job.name, replica.name)}
                      />
                    </Table.Cell>
                    <VulnerabilitySummaryCell
                      appName={appName}
                      envName={envName}
                      componentName={job.name}
                      componentType={job.type}
                    />
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        </Accordion.Panel>
      </Accordion.Item>
    </Accordion>
  )
}
