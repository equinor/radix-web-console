import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { ComponentIdentity } from '../component/component-identity';
import { ComponentPorts } from '../component/component-ports';
import { JobSchedulerDetails } from '../component/job-scheduler-details';
import { DockerImage } from '../docker-image';
import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/component';
import {
  DeploymentModel,
  DeploymentModelValidationMap,
} from '../../models/deployment';

export interface OverviewProps {
  component: ComponentModel;
  deployment: DeploymentModel;
}

export const Overview = ({ component, deployment }: OverviewProps) => (
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
        <ComponentPorts ports={component.ports} />
        <ComponentIdentity component={component} deployment={deployment} />
      </div>
      <section>
        <JobSchedulerDetails component={component} />
      </section>
    </div>
  </div>
);

Overview.propTypes = {
  component: PropTypes.shape(ComponentModelValidationMap).isRequired,
  deployment: PropTypes.shape(DeploymentModelValidationMap).isRequired,
} as PropTypes.ValidationMap<OverviewProps>;