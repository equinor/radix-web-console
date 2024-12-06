import { Typography } from '@equinor/eds-core-react';
import type { Component, Deployment } from '../../store/radix-api';
import { ComponentIdentity } from '../component/component-identity';
import { ComponentPorts } from '../component/component-ports';
import { JobSchedulerDetails } from '../component/scheduled-job/job-scheduler-details';
import { DockerImage } from '../docker-image';
import { ResourceRequirements } from '../resource-requirements';
import { Runtime } from '../runtime';

type Props = {
  component: Component;
  deployment?: Deployment;
};
export const Overview = ({ component, deployment }: Props) => (
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
        {component.identity && deployment && (
          <ComponentIdentity
            identity={component.identity}
            deployment={deployment}
          />
        )}
      </div>
      <div className="grid grid--gap-medium">
        <ComponentPorts ports={component.ports ?? []} />
        {component.runtime && <Runtime runtime={component.runtime!} />}
        {component.resources && (
          <ResourceRequirements resources={component.resources} />
        )}
      </div>
      <section className="grid grid--gap-medium">
        <JobSchedulerDetails component={component} />
      </section>
    </div>
  </div>
);
