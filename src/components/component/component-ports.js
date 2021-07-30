import PropTypes from 'prop-types';
import React from 'react';
import PortModel from '../../models/port';
import { List, Typography } from '@equinor/eds-core-react';

const ComponentPorts = ({ ports }) => {
  return (
    <React.Fragment>
      {ports.length > 0 && (
        <React.Fragment>
          <div>
            <Typography variant="body_short">Open ports:</Typography>
            <List className="o-indent-list">
              {ports.map((port) => (
                <List.Item key={port.port}>
                  {port.port} ({port.name})
                </List.Item>
              ))}
            </List>
          </div>
        </React.Fragment>
      )}
      {ports.length === 0 && (
        <Typography variant="body_short">No open ports</Typography>
      )}
    </React.Fragment>
  );
};

ComponentPorts.propTypes = {
  ports: PropTypes.arrayOf(PropTypes.exact(PortModel)),
};

export default ComponentPorts;
