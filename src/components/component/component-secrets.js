import PropTypes from 'prop-types';
import React from 'react';
import { getEnvironment } from '../../state/environment';
import { connect } from 'react-redux';
import { buildComponentTypeLabelMap } from '../../models/component-type';
import Component from '../../models/component';
import { List, Typography } from '@equinor/eds-core-react';

const ComponentSecrets = ({ component }) => {
  let componentTypeTitle = component
    ? buildComponentTypeLabelMap(component.type)
    : '';
  return (
    <React.Fragment>
      <div>
        <Typography variant="h4">Secrets</Typography>
        {component && component.secrets.length === 0 && (
          <p>This {componentTypeTitle.toLowerCase()} uses no secrets</p>
        )}
        {component && component.secrets.length > 0 && (
          <List className="o-indent-list secrets">
            {component.secrets.map((secret) => (
              <List.Item key={secret}>{secret}</List.Item>
            ))}
          </List>
        )}
      </div>
    </React.Fragment>
  );
};

ComponentSecrets.propTypes = {
  component: PropTypes.shape(Component),
};

const mapStateToProps = (state) => ({
  environment: getEnvironment(state),
});

export default connect(mapStateToProps)(ComponentSecrets);
