import { Icon, Typography } from '@equinor/eds-core-react'
import { update } from '@equinor/eds-icons'
import { ComponentDeploymentGitHubAttributes } from '../../../components/component/component-deployment-github-attributes'
import { ComponentIdentity } from '../../../components/component/component-identity'
import { ComponentPorts } from '../../../components/component/component-ports'
import { DeploymentRef } from '../../../components/component/deployment-ref'
import { JobSchedulerDetails } from '../../../components/component/scheduled-job/job-scheduler-details'
import { DockerImage } from '../../../components/docker-image'
import { ResourceRequirements } from '../../../components/resource-requirements'
import { Runtime } from '../../../components/runtime'
import { StatusBadgeTemplate } from '../../../components/status-badges/status-badge-template'
import { RelativeToNow } from '../../../components/time/relative-to-now'
import type { Component, Deployment } from '../../../store/radix-api'

interface OverviewProps {
  appName: string
  component: Component
  deployment?: Deployment
}

export const Overview = (props: OverviewProps) => {
  const { appName, component, deployment } = props

  const isScheduledJob = !!component.nextRun

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h4">Overview</Typography>
      <div className="grid grid--gap-medium grid--overview-columns">
        <div className="grid grid--gap-medium">
          <div className="grid grid--gap-small grid--auto-columns grid--align-center">
            <Typography>
              Job <strong>{component.name}</strong>
            </Typography>
            {isScheduledJob && (
              <StatusBadgeTemplate icon={<Icon data={update} />} type="default">
                Cron job
              </StatusBadgeTemplate>
            )}
          </div>
          <Typography>
            Image <DockerImage path={component.image} />
          </Typography>
          {isScheduledJob && (
            <Typography>
              Scheduled to run{' '}
              <strong>
                <RelativeToNow time={component.nextRun} titlePrefix="Scheduled for" />
              </strong>
            </Typography>
          )}
          <DeploymentRef appName={appName} deploymentName={deployment?.name ?? ''} />
          <ComponentDeploymentGitHubAttributes deployComponent={component} deployment={deployment} />
          {component && deployment && <ComponentIdentity component={component} />}
        </div>
        <div className="grid grid--gap-medium">
          <ComponentPorts ports={component.ports ?? []} />
          {component.runtime && <Runtime runtime={component.runtime!} />}
          {component.resources && <ResourceRequirements resources={component.resources} />}
        </div>
        <section className="grid grid--gap-medium">
          <JobSchedulerDetails component={component} />
        </section>
      </div>
    </div>
  )
}
