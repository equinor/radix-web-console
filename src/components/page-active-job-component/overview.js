import { Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { ComponentPorts } from '../component/component-ports';
import { JobSchedulerDetails } from '../component/job-scheduler-details';
import DockerImage from '../docker-image';
import { ComponentModelValidationMap } from '../../models/component';

export const Overview = ({ component }) => (
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
      </div>
      <section>
        <JobSchedulerDetails component={component} />
      </section>
    </div>
  </div>
);

Overview.propTypes = {
  component: PropTypes.shape(ComponentModelValidationMap),
};

export default Overview;
