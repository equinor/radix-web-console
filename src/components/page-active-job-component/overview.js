import DockerImage from '../docker-image';
import React from 'react';
import componentModel from '../../models/component';
import PropTypes from 'prop-types';
import { Typography } from '@equinor/eds-core-react';
import JobSchedulerDetails from '../component/job-scheduler-details';

const Overview = ({ component }) => {
  return (
    <div className="component__overview">
      <Typography variant="h4">Overview</Typography>
      <div>
        <div>
          <Typography variant="body_short">
            Job <strong>{component.name}</strong>
          </Typography>
          <Typography variant="body_short">
            Image <DockerImage path={component.image} />
          </Typography>
        </div>
        <section>
          <JobSchedulerDetails component={component} />
        </section>
      </div>
    </div>
  );
};

Overview.propTypes = {
  component: PropTypes.shape(componentModel),
};

export default Overview;
