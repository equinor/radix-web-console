import PropTypes from 'prop-types';
import React from 'react';
import PortModel from '../../models/port';

const ComponentPorts = ({ ports }) => {
  return (
    <React.Fragment>
      {ports.length > 0 && (
        <React.Fragment>
          <p>Open ports:</p>
          <ul className="o-indent-list">
            {ports.map((port) => (
              <li key={port.port}>
                {port.port} ({port.name})
              </li>
            ))}
          </ul>
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
