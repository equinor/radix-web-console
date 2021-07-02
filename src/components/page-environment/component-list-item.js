import PropTypes from 'prop-types';
import React from 'react';
import ComponentItem from '../../models/component-summary';
import { Link } from 'react-router-dom';
import * as routing from '../../utils/routing';
import ActiveComponentStatus from './active-component-status';
import environmentModel from '../../models/environment';
import { componentType } from '../../models/component-type';
import { Table } from '@equinor/eds-core-react';
import Replicas from './replicas';

export const ComponentListItem = ({ appName, environment, components }) => {
  return components.map((component) => {
    let activeComponentUrl = getActiveComponentUrl(
      appName,
      environment,
      component
    );
    return (
      <Table.Row key={component.name}>
        <Table.Cell>
          <Link to={activeComponentUrl}>{component.name} </Link>
        </Table.Cell>
        <Table.Cell>
          <ActiveComponentStatus
            componentName={component.name}
            componentStatus={component.status}
            envSecrets={environment.secrets}
            replicas={component.replicaList}
          />
        </Table.Cell>
        <Table.Cell>
          <Replicas replicaList={component.replicaList} />
        </Table.Cell>
      </Table.Row>
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
