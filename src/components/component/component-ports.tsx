import { List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import { PortModel, PortModelValidationMap } from '../../models/port';

export const ComponentPorts = ({
  ports,
}: {
  ports: Array<PortModel>;
}): JSX.Element =>
  ports.length > 0 ? (
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
  ) : (
    <Typography>No open ports</Typography>
  );

ComponentPorts.propTypes = {
  ports: PropTypes.arrayOf(PropTypes.shape(PortModelValidationMap)).isRequired,
} as PropTypes.ValidationMap<{
  ports: Array<PortModel>;
}>;
