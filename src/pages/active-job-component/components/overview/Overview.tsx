import { Typography } from '@equinor/eds-core-react'
import { ComponentDeploymentGitHubAttributes } from '../../../../components/component/component-deployment-github-attributes'
import { ComponentIdentity } from '../../../../components/component/component-identity'
import { ComponentPorts } from '../../../../components/component/component-ports'
import { DeploymentRef } from '../../../../components/component/deployment-ref'
import { JobSchedulerDetails } from '../../../../components/component/scheduled-job/job-scheduler-details'
import { DockerImage } from '../../../../components/docker-image'
import { ResourceRequirements } from '../../../../components/resource-requirements'
import { Runtime } from '../../../../components/runtime'
import type { Component, Deployment } from '../../../../store/radix-api'
import { CronSchedule } from '../cron-schedule/CronSchedule'

import styles from './overview.module.css'

interface OverviewProps {
  readonly appName: string
  readonly component: Component
  readonly deployment?: Deployment
}

export const Overview = (props: OverviewProps) => {
  const { appName, component, deployment } = props

  return (
    <div className="grid grid--gap-medium">
      <Typography variant="h4">Overview</Typography>
      <div className="grid grid--gap-medium grid--overview-columns">
        <div className="grid grid--gap-medium">
          <div className="grid grid--gap-small grid--auto-columns grid--align-center">
            <Typography>
              Job <strong>{component.name}</strong>
            </Typography>
          </div>
          <Typography>
            Image <DockerImage path={component.image} />
          </Typography>
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
      <CronSchedule component={component} className={styles.cronSchedule} />
    </div>
  )
}
