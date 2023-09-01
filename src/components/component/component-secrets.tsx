import { List, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { FunctionComponent } from 'react';

import {
  ComponentModel,
  ComponentModelValidationMap,
} from '../../models/radix-api/deployments/component';

export const ComponentSecrets: FunctionComponent<{
  component: ComponentModel;
}> = ({ component }) => (
  <>
    <Typography variant="h4">Secrets</Typography>
    {component &&
      (component.secrets?.length > 0 ? (
        <List className="o-indent-list secrets">
          {component.secrets.map((secret) => (
            <List.Item key={secret}>{secret}</List.Item>
          ))}
        </List>
      ) : (
        <Typography>This {component.type} uses no secrets</Typography>
      ))}
  </>
);

ComponentSecrets.propTypes = {
  component: PropTypes.shape(ComponentModelValidationMap)
    .isRequired as PropTypes.Validator<ComponentModel>,
};
