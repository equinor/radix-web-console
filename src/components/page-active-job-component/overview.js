import DockerImage from '../docker-image';
import React from 'react';
import componentModel from '../../models/component';
import PropTypes from 'prop-types';

const Overview = ({ component }) => {
  return (
    <React.Fragment>
      <h2 className="o-heading-section">Overview</h2>
      <p>
        Job <strong>{component.name}</strong>
      </p>
      <p>
        Image <DockerImage path={component.image} />
      </p>
    </React.Fragment>
  );
};

Overview.propTypes = {
  component: PropTypes.shape(componentModel),
};

export default Overview;
