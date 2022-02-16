import { Table, Typography } from '@equinor/eds-core-react';
import * as PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import { ActiveComponentStatus } from './active-component-status';
import { Replicas } from './replicas';
import componentModel from '../../models/component';
import { ComponentType } from '../../models/component-type';
import environmentModel from '../../models/environment';
import * as routing from '../../utils/routing';

const getActiveComponentUrl = (appName, environment, component) =>
  component.type === ComponentType.job
    ? routing.getActiveJobComponentUrl(
        appName,
        environment.name,
        component.name
      )
    : routing.getActiveComponentUrl(appName, environment.name, component.name);

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

ComponentListItem.propTypes = {
  appName: PropTypes.string.isRequired,
  environment: PropTypes.shape(environmentModel).isRequired,
  components: PropTypes.arrayOf(PropTypes.shape(componentModel)).isRequired,
};

export default ComponentListItem;
