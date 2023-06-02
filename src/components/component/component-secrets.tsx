import { List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';

import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/radix-api/deployments/component';

export const ComponentSecrets = ({
  component,
}: {
  component: ComponentModel;
}): JSX.Element => (
  <>
    <Typography variant="h4">Secrets</Typography>
    {component && (
      <>
        {component.secrets?.length > 0 ? (
          <List className="o-indent-list secrets">
            {component.secrets.map((secret) => (
              <List.Item key={secret}>{secret}</List.Item>
            ))}
          </List>
        ) : (
          <Typography>This {component.type} uses no secrets</Typography>
        )}
      </>
    )}
  </>
);

ComponentSecrets.propTypes = {
  component: PropTypes.shape(ComponentModelValidationMap),
} as PropTypes.ValidationMap<{
  component: ComponentModel;
}>;
