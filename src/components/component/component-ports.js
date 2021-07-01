import PropTypes from 'prop-types';
import React from 'react';
import PortModel from '../../models/port';
import { List } from '@equinor/eds-core-react';

const ComponentPorts = ({ ports }) => {
  return (
    <React.Fragment>
      {ports.length > 0 && (
        <React.Fragment>
          <>
            <p className="body_short">Open ports:</p>
            <List className="o-indent-list">
              {ports.map((port) => (
                <List.Item key={port.port}>
                  {port.port} ({port.name})
                </List.Item>
              ))}
            </List>
          </>
        </React.Fragment>
      )}
      {ports.length === 0 && <p>No open ports</p>}
    </React.Fragment>
  );
};

ComponentPorts.propTypes = {
  ports: PropTypes.arrayOf(PropTypes.exact(PortModel)),
};

export default ComponentPorts;
