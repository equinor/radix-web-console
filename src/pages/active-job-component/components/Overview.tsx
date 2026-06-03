import { Typography } from '@equinor/eds-core-react'
import { ComponentDeploymentGitHubAttributes } from '../../../components/component/component-deployment-github-attributes'
import { ComponentIdentity } from '../../../components/component/component-identity'
import { ComponentPorts } from '../../../components/component/component-ports'
import { DeploymentRef } from '../../../components/component/deployment-ref'
import { JobSchedulerDetails } from '../../../components/component/scheduled-job/job-scheduler-details'
import { DockerImage } from '../../../components/docker-image'
import { ResourceRequirements } from '../../../components/resource-requirements'
import { Runtime } from '../../../components/runtime'
import type { Component, Deployment } from '../../../store/radix-api'

type Props = {
  appName: string
  component: Component
  deployment?: Deployment
}
export const Overview = ({ appName, component, deployment }: Props) => (
  <div className="grid grid--gap-medium">
    <Typography variant="h4">Overview</Typography>
    <div className="grid grid--gap-medium grid--overview-columns">
      <div className="grid grid--gap-medium">
        <Typography>
          Job <strong>{component.name}</strong>
        </Typography>
        <Typography>
          Image <DockerImage path={component.image} />
        </Typography>
        <DeploymentRef appName={appName} deploymentName={deployment?.name ?? ''} />
        <ComponentDeploymentGitHubAttributes deployComponent={component} deployment={deployment} />
        {component && deployment && <ComponentIdentity component={component} deployment={deployment} />}
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
