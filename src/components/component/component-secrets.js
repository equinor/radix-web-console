import { List, Typography } from '@equinor/eds-core-react';
import { connect } from 'react-redux';
import * as PropTypes from 'prop-types';

import Component from '../../models/component';
import { getEnvironment } from '../../state/environment';

const mapStateToProps = (state) => ({
  environment: getEnvironment(state),
});

const ComponentSecrets = ({ component }) => (
  <>
    <Typography variant="h4">Secrets</Typography>
    {component && component.secrets.length === 0 && (
      <Typography variant="body_short">
        This {component.type} uses no secrets
      </Typography>
    )}
    {component && component.secrets.length > 0 && (
      <List className="o-indent-list secrets">
        {component.secrets.map((secret) => (
          <List.Item key={secret}>{secret}</List.Item>
        ))}
      </List>
    )}
  </>
);

ComponentSecrets.propTypes = {
  component: PropTypes.shape(Component),
};

export default connect(mapStateToProps)(ComponentSecrets);
