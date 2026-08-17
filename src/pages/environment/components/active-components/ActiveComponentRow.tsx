import { Icon, Table, Typography } from '@equinor/eds-core-react'
import { chevron_down, chevron_up } from '@equinor/eds-icons'
import clsx from 'clsx'
import { Fragment, useState } from 'react'
import { Link } from 'react-router'
import { ComponentStatusBadge } from '../../../../components/status-badges'
import { UtilizationPopover } from '../../../../components/utilization-popover/utilization-popover'
import type { Component, ReplicaResourcesUtilizationResponse, ReplicaSummary } from '../../../../store/radix-api'
import { getActiveComponentUrl, getReplicaUrl } from '../../../../utils/routing'
import { OAuth2DeploymentRows } from '../OAuth2DeploymentRows'
import { ReplicaLinks } from '../ReplicaLinks'
import { VulnerabilitySummaryCell } from '../vulnerability-summary-cell/VulnerabilitySummaryCell'
import { hasComponentOAuth2Service } from './activeComponents.utils'

interface ActiveComponentRowProps {
  readonly appName: string
  readonly envName: string
  readonly component: Readonly<Component>
  readonly utilization?: Readonly<ReplicaResourcesUtilizationResponse>
  readonly showChevronColumn: boolean
}

export const ActiveComponentRow = (props: ActiveComponentRowProps) => {
  const { appName, envName, component, utilization, showChevronColumn } = props

  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Fragment>
      <Table.Row className={clsx({ 'border-bottom-transparent': isExpanded })}>
        {showChevronColumn && (
          <Table.Cell className={'fitwidth padding-right-0'}>
            {hasComponentOAuth2Service(component) && (
              <Typography link as="span">
                <Icon
                  title="Toggle more information"
                  data={isExpanded ? chevron_up : chevron_down}
                  size={24}
                  role="button"
                  onClick={() => {
                    setIsExpanded((prev) => !prev)
                  }}
                />
              </Typography>
            )}
          </Table.Cell>
        )}
        <Table.Cell>
          <Typography as={Link} to={getActiveComponentUrl(appName, envName, component.name)} link>
            {component.name}
          </Typography>
        </Table.Cell>
        <Table.Cell>
          <ComponentStatusBadge status={component.status ?? 'Reconciling'} />
        </Table.Cell>
        <Table.Cell>
          <ReplicaLinks
            replicaList={component.replicaList}
            urlFunc={(replica: ReplicaSummary) => getReplicaUrl(appName, envName, component.name, replica.name)}
          />
        </Table.Cell>
        <Table.Cell>
          <UtilizationPopover showLabel utilization={utilization} path={`${envName}.${component.name}.`} />
        </Table.Cell>
        <VulnerabilitySummaryCell
          appName={appName}
          envName={envName}
          componentName={component.name}
          componentType={component.type}
        />
      </Table.Row>

      {isExpanded && hasComponentOAuth2Service(component) && (
        <OAuth2DeploymentRows
          appName={appName}
          envName={envName}
          componentName={component.name}
          oauth2={component.oauth2}
        />
      )}
    </Fragment>
  )
}
