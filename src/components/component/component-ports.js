import { List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import PortModel from '../../models/port';

export const ComponentPorts = ({ ports }) =>
  ports.length > 0 ? (
    <>
      <div>
        <Typography>Open ports:</Typography>
        <List className="o-indent-list">
          {ports.map((port) => (
            <List.Item key={port.port}>
              {port.port} ({port.name})
            </List.Item>
          ))}
        </List>
      </div>
    </>
  ) : (
    <Typography>No open ports</Typography>
  );

ComponentPorts.propTypes = {
  ports: PropTypes.arrayOf(PropTypes.exact(PortModel)),
};
