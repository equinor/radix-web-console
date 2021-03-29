import PropTypes from 'prop-types';
import React from 'react';
import ComponentItem from '../../models/component-summary';
import { Link } from 'react-router-dom';
import * as routing from '../../utils/routing';
import ActiveComponentStatus from './active-component-status';
import environmentModel from '../../models/environment';

export const ComponentListItem = ({ appName, environment, components }) => {
  return components.map((component) => (
    <p key={component.name}>
      <Link
        to={routing.getActiveComponentUrl(
          appName,
          environment.name,
          component.name
        )}
      >
        {component.name}{' '}
      </Link>
      <ActiveComponentStatus
        componentName={component.name}
        componentStatus={component.status}
        envSecrets={environment.secrets}
        replicas={component.replicaList}
      />
    </p>
  ));
};

ComponentListItem.propTypes = {
  appName: PropTypes.string.isRequired,
  environment: PropTypes.shape(environmentModel),
  components: PropTypes.arrayOf(PropTypes.shape(ComponentItem)).isRequired,
};

export default ComponentListItem;
