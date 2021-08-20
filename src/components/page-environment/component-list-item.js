import { Table, Typography } from '@equinor/eds-core-react';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import ActiveComponentStatus from './active-component-status';
import Replicas from './replicas';
import ComponentItem from '../../models/component-summary';
import { componentType } from '../../models/component-type';
import environmentModel from '../../models/environment';
import * as routing from '../../utils/routing';

export const ComponentListItem = ({ appName, environment, components }) =>
  components.map((component) => (
    <Table.Row key={component.name}>
      <Table.Cell>
        <Link to={getActiveComponentUrl(appName, environment, component)}>
          <Typography link as="span">
            {component.name}
          </Typography>
        </Link>
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
        <Replicas
          appName={appName}
          envName={environment.name}
          componentName={component.name}
          replicaList={component.replicaList}
        />
      </Table.Cell>
    </Table.Row>
  ));

function getActiveComponentUrl(appName, environment, component) {
  return component.type === componentType.job
    ? routing.getActiveJobComponentUrl(
        appName,
        environment.name,
        component.name
      )
    : routing.getActiveComponentUrl(appName, environment.name, component.name);
}

ComponentListItem.propTypes = {
  appName: PropTypes.string.isRequired,
  environment: PropTypes.shape(environmentModel),
  components: PropTypes.arrayOf(PropTypes.shape(ComponentItem)).isRequired,
};

export default ComponentListItem;
