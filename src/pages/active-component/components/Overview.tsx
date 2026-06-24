import { Typography } from '@equinor/eds-core-react'
import { ComponentDeploymentGitHubAttributes } from '../../../components/component/component-deployment-github-attributes'
import { ComponentIdentity } from '../../../components/component/component-identity'
import { ComponentPorts } from '../../../components/component/component-ports'
import { DeploymentRef } from '../../../components/component/deployment-ref'
import { DockerImage } from '../../../components/docker-image'
import { ExternalLink } from '../../../components/link/external-link'
import { ResourceRequirements } from '../../../components/resource-requirements'
import { Runtime } from '../../../components/runtime'
import { ComponentStatusBadge } from '../../../components/status-badges'
import { UtilizationPopover } from '../../../components/utilization-popover/utilization-popover'
import { slowPollingInterval } from '../../../store/defaults'
import {
  type ApplicationAlias,
  type Component,
  type Deployment,
  type DnsAlias as DnsAliasModel,
  type ExternalDns,
  useGetApplicationResourcesUtilizationQuery,
} from '../../../store/radix-api'
import { DefaultAlias } from './DefaultAlias'
import { DNSAliases } from './DnsAliases'

import '../style.css'

const URL_VAR_NAME = 'RADIX_PUBLIC_DOMAIN_NAME'

type Props = {
  appName: string
  appAlias?: ApplicationAlias
  dnsAliases?: DnsAliasModel[]
  dnsExternalAliases?: ExternalDns[]
  envName: string
  component: Component
  deployment?: Deployment
}
export const Overview = ({
  appName,
  appAlias,
  dnsAliases,
  dnsExternalAliases,
  envName,
  component,
  deployment,
}: Props) => {
  const dnsAliasUrls = dnsAliases ? dnsAliases.map((alias) => alias.url) : []
  const dnsExternalAliasUrls = dnsExternalAliases ? dnsExternalAliases.map((alias) => alias.fqdn) : []

  const { data: utilization } = useGetApplicationResourcesUtilizationQuery(
    { appName },
    { pollingInterval: slowPollingInterval }
  )

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h4">Overview</Typography>
      <div className="grid grid--gap-medium grid--overview-columns">
        <div className="grid grid--gap-medium">
          <Typography>
            Component <strong>{component.name}</strong>
          </Typography>
          <Typography>
            Image <DockerImage path={component.image} />
          </Typography>
          <DeploymentRef appName={appName} deploymentName={deployment?.name ?? ''} />
          <ComponentDeploymentGitHubAttributes deployComponent={component} deployment={deployment} />
          {component && deployment && <ComponentIdentity component={component} />}
        </div>

        <div className="grid grid--gap-medium">
          <div className="grid grid--gap-small grid--auto-columns">
            <Typography>Status</Typography>
            <ComponentStatusBadge status={component.status ?? 'Reconciling'} />
          </div>
          <div className="grid grid--gap-small grid--auto-columns">
            <Typography>Utilization</Typography>
            <UtilizationPopover showLabel utilization={utilization} path={`${envName}.${component.name}.`} />
          </div>
          {component.variables?.[URL_VAR_NAME] && (
            <Typography>
              Publicly available <ExternalLink href={`https://${component.variables[URL_VAR_NAME]}`}>link</ExternalLink>
            </Typography>
          )}
          {appAlias && <DefaultAlias appAlias={appAlias} componentName={component.name} envName={envName} />}
          {dnsAliasUrls && dnsAliasUrls.length > 0 && <DNSAliases urls={dnsAliasUrls} title={'DNS aliases'} />}
          {dnsExternalAliasUrls && dnsExternalAliasUrls.length > 0 && (
            <DNSAliases urls={dnsExternalAliasUrls} title={'DNS external aliases'} />
          )}
          <ComponentPorts ports={component.ports ?? []} />
          {component.runtime && (
            <div className="grid grid--gap-medium">
              <Runtime runtime={component.runtime!} />
            </div>
          )}
          {component.resources && (
            <div className="grid grid--gap-medium">
              <ResourceRequirements resources={component.resources} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
