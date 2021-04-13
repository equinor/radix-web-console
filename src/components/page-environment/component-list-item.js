import PropTypes from 'prop-types';
import React from 'react';
import ComponentItem from '../../models/component-summary';
import { Link } from 'react-router-dom';
import * as routing from '../../utils/routing';
import ActiveComponentStatus from './active-component-status';
import environmentModel from '../../models/environment';
import { componentType } from '../../models/component-type';

export const ComponentListItem = ({ appName, environment, components }) => {
  return components.map((component) => {
    let activeComponentUrl = getActiveComponentUrl(
      appName,
      environment,
      component
    );
    return (
      <p key={component.name}>
        <Link to={activeComponentUrl}>{component.name} </Link>
        <ActiveComponentStatus
          componentName={component.name}
          componentStatus={component.status}
          envSecrets={environment.secrets}
          replicas={component.replicaList}
        />
      </p>
    );
  });
};

function getActiveComponentUrl(appName, environment, component) {
  if (component.type === componentType.job)
    return routing.getActiveJobComponentUrl(
      appName,
      environment.name,
      component.name
    );
  return routing.getActiveComponentUrl(
    appName,
    environment.name,
    component.name
  );
}

ComponentListItem.propTypes = {
  appName: PropTypes.string.isRequired,
  environment: PropTypes.shape(environmentModel),
  components: PropTypes.arrayOf(PropTypes.shape(ComponentItem)).isRequired,
};

export default ComponentListItem;
