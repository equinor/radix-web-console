import { List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import type { FunctionComponent } from 'react';

import type { Port } from '../../store/radix-api';

export const ComponentPorts: FunctionComponent<{ ports: Array<Port> }> = ({
  ports,
}) =>
  ports.length > 0 ? (
    <div>
      <Typography>Open ports:</Typography>
      <List className="o-indent-list">
        {ports.map(({ name, port }) => (
          <List.Item key={port}>
            {port} ({name})
          </List.Item>
        ))}
      </List>
    </div>
  ) : (
    <Typography>No open ports</Typography>
  );

ComponentPorts.propTypes = {
  ports: PropTypes.arrayOf(PropTypes.object as PropTypes.Validator<Port>)
    .isRequired,
};
