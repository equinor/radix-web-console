import { List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  PortModel,
  PortModelValidationMap,
} from '../../models/radix-api/deployments/port';

export const ComponentPorts: FunctionComponent<{ ports: Array<PortModel> }> = ({
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
  ports: PropTypes.arrayOf(
    PropTypes.shape(PortModelValidationMap) as PropTypes.Validator<PortModel>
  ).isRequired,
};
